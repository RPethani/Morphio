import {
  PropertyMetadata,
  PropertyType,
} from '../../decorators/PropertyMetadata';
import { BaseProcessor } from './BaseProcessor';
import { ProcessorContext } from './ProcessorContext';

/**
 * Processor for handling simple value types (primitives and Date objects).
 * Converts values between their serialized and deserialized forms while maintaining type safety.
 */
export class SimpleValueProcessor extends BaseProcessor {
  constructor(context: ProcessorContext) {
    super(context);
  }

  /**
   * Deserializes a simple value to its target type.
   * Handles string, number, boolean, and Date types.
   *
   * @param value - The value to deserialize
   * @param propertyType - The target type to deserialize to (as a string)
   * @param _meta - Optional metadata (unused in simple value processing)
   * @returns The deserialized value converted to its target type
   */
  deserialize(
    value: any,
    propertyType: PropertyType,
    _meta?: PropertyMetadata
  ): any {
    if (value === null || value === undefined) return value;

    const type = propertyType as string;
    switch (type.toLowerCase()) {
      case 'string':
        return String(value);
      case 'number':
        return Number(value);
      case 'boolean':
        return Boolean(value);
      case 'date':
        return value instanceof Date ? value : new Date(value);
      default:
        return value;
    }
  }

  /**
   * Serializes a simple value for JSON stringification.
   * Handles special cases like Date objects by converting them to ISO strings.
   *
   * @param value - The value to serialize
   * @param _propertyType - The type of the value (unused in simple value serialization)
   * @param _meta - Optional metadata (unused in simple value processing)
   * @returns The serialized value
   */
  serialize(
    value: any,
    _propertyType: PropertyType,
    _meta?: PropertyMetadata
  ): any {
    if (value === null || value === undefined) return value;

    if (value instanceof Date) {
      return value.toISOString();
    }

    return value;
  }
}
