import { ProcessorContext } from './processors/ProcessorContext';
import { ValueProcessor } from './processors/ValueProcessor';
import { ProcessorFactory } from './processors/ProcessorFactory';
import { MorphioSchema, PropertyType, SchemaRegistry } from '../schema';

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
   *
   * @param input - The object to serialize
   * @returns A plain object with serialized properties
   */
  serialize(input: any): object {
    if (input === null || input === undefined) return {};

    const schema: MorphioSchema | undefined = SchemaRegistry.getSchema(
      input.constructor
    );

    if (!schema) {
      return input;
    }

    const serializedObject: Record<string, any> = {};
    const properties = schema.properties;

    for (const key of Object.keys(input)) {
      const value = input[key];
      const meta = properties.get(key);

      if (meta) {
        const processor = this.findProcessor(meta.type);
        serializedObject[key] = processor.serialize(value, meta.type, meta);
      } else {
        serializedObject[key] = value;
      }
    }

    return serializedObject;
  }

  /**
   * Deserializes a plain object into an instance of the specified type.
   * Uses schema information to properly deserialize each property.
   *
   * @param input - The plain object to deserialize
   * @param type - The constructor function for the target type
   * @returns An instance of the target type with deserialized properties
   */
  deserialize<T>(input: Record<string, any>, type: new () => T): T {
    if (!input) return new type();

    const schema: MorphioSchema | undefined = SchemaRegistry.getSchema(type);

    if (!schema) {
      throw new Error(`No schema found for type ${type.name}`);
    }

    const instance = new type() as Record<string, any>;
    const properties = schema.properties;

    for (const [key, value] of Object.entries(input)) {
      const meta = properties.get(key);

      if (meta) {
        const processor = this.findProcessor(meta.type);
        instance[key] = processor.deserialize(value, meta.type, meta);
      } else {
        instance[key] = value;
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
