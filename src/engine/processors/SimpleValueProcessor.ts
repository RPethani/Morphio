import { PropertyType, PrimitiveType } from '../../schema';
import { BaseProcessor } from './BaseProcessor';
import { ProcessorContext } from './ProcessorContext';

/**
 * Processor for handling primitive value types.
 * Converts values between their serialized and deserialized forms while maintaining type safety.
 */
export class SimpleValueProcessor extends BaseProcessor {
  constructor(context: ProcessorContext) {
    super(context);
  }

  /**
   * Deserializes a primitive value to its target type.
   * Handles string, number, boolean, bigint, and Date types.
   *
   * @param value - The value to deserialize
   * @param propertyType - The target type to deserialize to
   * @returns The deserialized value converted to its target type
   */
  deserialize(value: any, propertyType: PropertyType): any {
    if (value === null || value === undefined) return value;

    const type = propertyType as PrimitiveType;
    switch (type) {
      case 'string':
        return String(value);
      case 'number':
        return Number(value);
      case 'boolean':
        return Boolean(value);
      case 'bigint':
        return typeof value === 'bigint' ? value : BigInt(value);
      case 'date':
        return value instanceof Date ? value : new Date(value);
      default:
        return value;
    }
  }

  /**
   * Serializes a primitive value for JSON stringification.
   * Handles special cases like BigInt (to string) and Date (to ISO string).
   *
   * @param value - The value to serialize
   * @param propertyType - The type of the value being serialized
   * @returns The serialized value
   */
  serialize(value: any, propertyType: PropertyType): any {
    if (value === null || value === undefined) return value;

    const type = propertyType as PrimitiveType;
    switch (type) {
      case 'bigint':
        return value.toString();
      case 'date':
        return value instanceof Date ? value.toISOString() : value.toString();
      default:
        return value;
    }
  }
}
