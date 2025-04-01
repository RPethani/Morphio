import { ProcessorContext } from './processors/ProcessorContext';
import { ValueProcessor } from './processors/ValueProcessor';
import { ProcessorFactory } from './processors/ProcessorFactory';
import {
  MorphioSchema,
  ObjectType,
  PropertyMetadata,
  PropertyType,
  SchemaOps,
  SchemaRegistry,
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
   * @param objectType - The type of the value being serialized
   * @param _meta - Optional metadata about the property being serialized
   * @returns A plain object with serialized properties
   */
  serialize(
    input: any,
    objectType?: ObjectType,
    _meta?: PropertyMetadata
  ): Record<string, any> {
    if (input === null || input === undefined) return {};

    const schema = SchemaRegistry.getOrCreate(objectType ?? input.constructor);
    if (!schema) {
      return Object.assign({}, input);
    }

    return this.serializeWithSchema(schema, input);
  }

  private serializeWithSchema(schema: MorphioSchema, input: any) {
    const serializedObject: Record<string, any> = {};
    const allProperties = SchemaOps.getProperties(schema);

    // Copy all properties from input
    for (const [key, value] of Object.entries(input)) {
      if (value === undefined) continue;

      // If property has metadata, use processor to serialize
      const meta = allProperties.get(key);
      if (meta) {
        const processor = this.findProcessor(meta.type);
        serializedObject[key] = processor.serialize(value, meta.type);
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
  deserialize<T>(input: Record<string, any>, type: ObjectType): T {
    if (!input) {
      if (typeof type === 'function') {
        return new type() as T;
      }
      return {} as T;
    }

    const schema = SchemaRegistry.getOrCreate(type);
    // Handle no schema
    if (!schema) {
      return this.deserializeWithoutSchema<T>(input, type);
    }

    // Handle schema
    return this.deserializeForSchema<T>(schema, input, type);
  }

  private deserializeWithoutSchema<T>(
    input: Record<string, any>,
    type: ObjectType
  ): T {
    // If no schema, just copy all properties directly

    // If type is a function, create an instance
    if (typeof type === 'function') {
      const instance = new type();
      return Object.assign(instance as object, input) as T;
    }

    // If type is an interface, just return the input
    return Object.assign({}, input) as T;
  }

  private deserializeForSchema<T>(
    schema: MorphioSchema,
    input: Record<string, any>,
    type: ObjectType
  ): T {
    let instance;
    if (typeof type === 'function') {
      // class
      instance = new type();
    } else {
      // interface
      instance = {};
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
          meta.type
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
    return this.processorFactory.findProcessor(propertyType || 'string');
  }
}
