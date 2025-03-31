import { PropertyType } from '../../schema';

/**
 * Interface for processing values during serialization and deserialization.
 * Each processor implementation handles a specific type of value (e.g., simple types, arrays, maps, classes).
 */
export interface ValueProcessor {
  /**
   * Deserializes a value from its serialized form to its target type.
   *
   * @param value - The value to deserialize
   * @param objectType - The target type to deserialize to
   * @returns The deserialized value
   */
  deserialize(value: any, objectType: PropertyType): any;

  /**
   * Serializes a value to a format suitable for JSON stringification.
   *
   * @param value - The value to serialize
   * @param propertyType - The type of the value being serialized
   * @returns The serialized value
   */
  serialize(value: any, propertyType: PropertyType): any;
}
