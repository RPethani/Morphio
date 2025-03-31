import { ValueProcessor } from './ValueProcessor';
import { ObjectType, PropertyType } from '../../schema';

/**
 * Interface for providing context to value processors during serialization/deserialization.
 * This context allows processors to handle nested objects and complex types by delegating
 * to other appropriate processors.
 */
export interface ProcessorContext {
  /**
   * Finds the appropriate processor for a given property type.
   *
   * @param propertyType - The type of property to find a processor for
   * @returns A processor capable of handling the given property type
   */
  findProcessor(propertyType: PropertyType): ValueProcessor;

  /**
   * Deserializes a value using the appropriate processor for its type.
   *
   * @param value - The value to deserialize
   * @param objectType - The target type to deserialize to
   * @returns The deserialized value
   */
  deserialize(value: any, objectType: ObjectType): any;

  /**
   * Serializes a value using the appropriate processor for its type.
   *
   * @param value - The value to serialize
   * @param objectType
   * @returns The serialized value
   */
  serialize(value: any, objectType?: ObjectType): any;
}
