import { ProcessorContext } from './processors/ProcessorContext';
import { ValueProcessor } from './processors/ValueProcessor';
import { ProcessorFactory } from './processors/ProcessorFactory';
import {
  PropertyType,
  SchemaOps,
  SchemaRegistry,
  TypeIdentifier,
} from '../schema';

/**
 * The main engine responsible for serialization and deserialization of objects.
 * Implements the ProcessorContext interface to provide context for value processors.
 * Uses the singleton pattern to ensure only one instance exists.
 */
export class SerializationEngine implements ProcessorContext {
  private static instance: SerializationEngine;
  private readonly processorFactory: ProcessorFactory;

  /**
   * Private constructor to enforce singleton pattern.
   * Initializes the processor factory with this instance as context.
   */
  private constructor() {
    this.processorFactory = ProcessorFactory.getInstance(this);
  }

  /**
   * Gets the singleton instance of SerializationEngine.
   * Creates a new instance if one doesn't exist.
   *
   * @returns The singleton SerializationEngine instance
   */
  static getInstance(): SerializationEngine {
    if (!SerializationEngine.instance) {
      SerializationEngine.instance = new SerializationEngine();
    }
    return SerializationEngine.instance;
  }

  /**
   * Serializes an object into a plain JavaScript object.
   * Uses schema information to properly serialize each property.
   * For interface implementations, includes discriminator field.
   *
   * @param input - The object to serialize
   * @returns A plain object with serialized properties
   */
  serialize(input: any): Record<string, any> {
    if (input === null || input === undefined) return {};

    const schema = SchemaRegistry.getOrCreate(input.constructor);
    if (!schema) {
      return Object.assign({}, input);
    }

    const serializedObject: Record<string, any> = {};
    const allProperties = SchemaOps.getProperties(schema);

    // Add discriminator value if this is an interface implementation
    if (
      schema.discriminatorValue &&
      schema.extends?.some((s) => s.discriminator)
    ) {
      const parentWithDiscriminator = schema.extends.find(
        (s) => s.discriminator
      );
      if (parentWithDiscriminator?.discriminator) {
        serializedObject[parentWithDiscriminator.discriminator] =
          schema.discriminatorValue;
      }
    }

    // Copy all properties from input
    for (const [key, value] of Object.entries(input)) {
      if (value === undefined) continue;

      // If property has metadata, use processor to serialize
      const meta = allProperties.get(key);
      if (meta) {
        const processor = this.findProcessor(meta.type);
        serializedObject[key] = processor.serialize(value, meta.type, meta);
      } else {
        // No metadata, copy value directly
        serializedObject[key] = value;
      }
    }

    return serializedObject;
  }

  /**
   * Deserializes a plain object into an instance of the specified type.
   * Uses schema information to properly deserialize each property.
   * For interfaces, uses discriminator to determine concrete implementation.
   *
   * @param input - The plain object to deserialize
   * @param type - The constructor function or interface name
   * @returns The deserialized object
   */
  deserialize<T>(input: Record<string, any>, type: TypeIdentifier): T {
    if (!input) {
      if (typeof type === 'function') {
        return new type() as T;
      }
      return {} as T;
    }

    const schema = SchemaRegistry.getOrCreate(type);
    if (!schema) {
      // If no schema, just copy all properties directly
      if (typeof type === 'function') {
        const instance = new type();
        return Object.assign(instance as object, input) as T;
      }
      return Object.assign({}, input) as T;
    }

    // For interface types, we don't need to create an instance
    if (typeof type === 'string') {
      return input as T;
    }

    const instance = new type();

    // Handle interface implementations
    if (schema.isInterface) {
      // If there's a default implementation, use it
      if (schema.implementation) {
        return this.deserialize(input, schema.implementation);
      }

      // If there's no discriminator, we can't determine the implementation
      if (!schema.discriminator) {
        throw new Error(
          `No discriminator or default implementation found for interface ${schema.name}`
        );
      }

      // Get discriminator value from input
      const discriminatorValue = input[schema.discriminator];
      if (!discriminatorValue) {
        throw new Error(
          `Missing discriminator value for interface ${schema.name}`
        );
      }

      // Find implementation schema with matching discriminator value
      const implementationSchema = SchemaRegistry.findImplementation(
        schema.name,
        discriminatorValue
      );
      if (!implementationSchema) {
        throw new Error(
          `No implementation found for interface ${schema.name} with discriminator value ${discriminatorValue}`
        );
      }

      return this.deserialize(input, implementationSchema.implementation!);
    }

    // Get registered properties from schema
    const allProperties = SchemaOps.getProperties(schema);

    // Copy all input properties to instance
    for (const [key, value] of Object.entries(input)) {
      if (value === undefined) continue;

      // If property has metadata, use processor to deserialize
      const meta = allProperties.get(key);
      if (meta) {
        const processor = this.findProcessor(meta.type);
        (instance as Record<string, any>)[key] = processor.deserialize(
          value,
          meta.type,
          meta
        );
      } else {
        // No metadata, assign value directly
        (instance as Record<string, any>)[key] = value;
      }
    }

    return instance as T;
  }

  /**
   * Finds the appropriate processor for a given property type.
   * Delegates to the processor factory.
   *
   * @param propertyType - The type of property to find a processor for
   * @returns A processor capable of handling the given property type
   */
  findProcessor(propertyType: PropertyType | undefined): ValueProcessor {
    return this.processorFactory.findProcessor(propertyType);
  }
}
