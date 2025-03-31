import { ValueProcessor } from './ValueProcessor';
import { ObjectType, PropertyType } from '../../schema';

/**
 * Interface for providing context to value processors during serialization/deserialization.
 * This context allows processors to handle nested objects and complex types by delegating
 * to other appropriate processors.
 *
 * The context acts as a bridge between different processors, enabling them to:
 * - Find the right processor for any property type
 * - Handle nested serialization/deserialization
 * - Share common functionality across processors
 *
 * @example
 * ```ts
 * class SerializationContext implements ProcessorContext {
 *   findProcessor(propertyType: PropertyType): ValueProcessor {
 *     // Return appropriate processor based on type
 *   }
 *
 *   deserialize(value: any, objectType: ObjectType): any {
 *     const processor = this.findProcessor(objectType);
 *     return processor.deserialize(value, objectType);
 *   }
 *
 *   serialize(value: any, objectType?: ObjectType): any {
 *     const processor = this.findProcessor(objectType);
 *     return processor.serialize(value, objectType);
 *   }
 * }
 * ```
 */
export interface ProcessorContext {
  /**
   * Finds the appropriate processor for a given property type.
   * This is the core function that enables the processor system to handle different types.
   *
   * @param propertyType - The type of property to find a processor for
   * @returns A processor capable of handling the given property type
   */
  findProcessor(propertyType: PropertyType): ValueProcessor;

  /**
   * Deserializes a value using the appropriate processor for its type.
   * This is a convenience method that combines finding the right processor and deserializing.
   *
   * @param value - The value to deserialize
   * @param objectType - The target type to deserialize to
   * @returns The deserialized value
   */
  deserialize(value: any, objectType: ObjectType): any;

  /**
   * Serializes a value using the appropriate processor for its type.
   * This is a convenience method that combines finding the right processor and serializing.
   *
   * @param value - The value to serialize
   * @param objectType - Optional type information for the value being serialized
   * @returns The serialized value
   */
  serialize(value: any, objectType?: ObjectType): any;
}
