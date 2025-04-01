import { BaseProcessor } from './BaseProcessor';
import { PropertyType, isEnumType } from '../../schema';
import { ProcessorContext } from './ProcessorContext';

/**
 * Processor for handling enum values.
 * Supports different serialization strategies and fallback values.
 */
export class EnumProcessor extends BaseProcessor {
  constructor(context: ProcessorContext) {
    super(context);
  }

  /**
   * Deserializes a value into an enum value.
   * If the value is invalid, returns the default value if specified.
   *
   * @param value - The value to deserialize
   * @param propertyType - The target enum type
   * @returns The enum value or default if value is invalid
   */
  deserialize(value: any, propertyType: PropertyType): any {
    if (!isEnumType(propertyType)) return value;

    if (value === null || value === undefined) {
      return propertyType.default !== undefined ? propertyType.default : value;
    }

    const enumObj = propertyType.enum;
    const strategy = propertyType.serializeAs || 'value';

    switch (strategy) {
      case 'key': {
        if (typeof value === 'string' && value in enumObj) {
          return enumObj[value];
        }
        return propertyType.default;
      }
      case 'value':
      default: {
        if (Object.values(enumObj).includes(value)) {
          return value;
        }
        return propertyType.default;
      }
    }
  }

  /**
   * Serializes an enum value based on the specified strategy.
   *
   * @param value - The enum value to serialize
   * @param propertyType - The property type configuration
   * @returns The serialized enum value
   */
  serialize(value: any, propertyType: PropertyType): any {
    if (!isEnumType(propertyType)) return value;

    // Use default value if value is undefined
    if (value === undefined && propertyType.default !== undefined) {
      value = propertyType.default;
    }

    // Return null/undefined as is if no default value
    if (value === null || value === undefined) {
      return value;
    }

    const enumObj = propertyType.enum;
    const strategy = propertyType.serializeAs || 'value';

    switch (strategy) {
      case 'key': {
        // Find the key for this value
        const key = Object.keys(enumObj).find((k) => enumObj[k] === value);
        return key || value;
      }
      case 'value':
      default:
        return value;
    }
  }
}
