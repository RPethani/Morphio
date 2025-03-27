import { ValueProcessor } from './ValueProcessor';
import {
  PropertyMetadata,
  PropertyType,
} from '../../decorators/PropertyMetadata';

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
   * @param propertyType - The target type to deserialize to
   * @param meta - Optional metadata about the property being deserialized
   * @returns The deserialized value
   */
  deserialize(
    value: any,
    propertyType: PropertyType,
    meta?: PropertyMetadata
  ): any;

  /**
   * Serializes a value using the appropriate processor for its type.
   *
   * @param value - The value to serialize
   * @param propertyType - The type of the value being serialized
   * @param meta - Optional metadata about the property being serialized
   * @returns The serialized value
   */
  serialize(
    value: any,
    propertyType: PropertyType,
    meta?: PropertyMetadata
  ): any;
}
