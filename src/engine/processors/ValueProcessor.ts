import { PropertyMetadata, PropertyType } from '../../schema';

/**
 * Interface for processing values during serialization and deserialization.
 * Each processor implementation handles a specific type of value (e.g., simple types, arrays, maps, classes).
 */
export interface ValueProcessor {
  /**
   * Deserializes a value from its serialized form to its target type.
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
   * Serializes a value to a format suitable for JSON stringification.
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
