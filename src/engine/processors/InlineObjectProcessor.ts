import { BaseProcessor } from './BaseProcessor';
import { isInlineObjectType, PropertyType } from '../../schema';
import { ProcessorContext } from './ProcessorContext';

/**
 * Processor for handling inline object types.
 * Manages serialization and deserialization of objects that are defined inline within a schema,
 * rather than as separate classes or interfaces.
 *
 * @example
 * ```ts
 * class User {
 *   @MorphProp({
 *     type: {
 *       properties: {
 *         street: { type: 'string', required: true },
 *         city: { type: 'string', required: true }
 *       }
 *     }
 *   })
 *   address!: { street: string; city: string };
 * }
 * ```
 */
export class InlineObjectProcessor extends BaseProcessor {
  /**
   * Initializes a new instance of the InlineObjectProcessor class.
   * @param context - The processor context
   */
  constructor(context: ProcessorContext) {
    super(context);
  }

  /**
   * Deserializes a plain object into its inline object form by processing each property
   * with the appropriate processor based on the schema definition.
   *
   * @param value - The object to deserialize
   * @param propertyType - Type information including property definitions
   * @returns The deserialized inline object
   * @throws {Error} If the property type is not an inline object type
   */
  deserialize(value: any, propertyType: PropertyType): any {
    if (!isInlineObjectType(propertyType)) {
      throw new Error('Invalid property type for InlineObjectProcessor');
    }

    const result: Record<string, any> = {};
    for (const [key, metadata] of Object.entries(propertyType.properties)) {
      const propertyValue = value[key];
      if (propertyValue !== undefined || metadata.required) {
        result[key] = this.context
          .findProcessor(metadata.type)
          .deserialize(propertyValue, metadata.type);
      }
    }
    return result;
  }

  /**
   * Serializes an inline object into a plain object by processing each property
   * with the appropriate processor based on the schema definition.
   *
   * @param value - The inline object to serialize
   * @param propertyType - Type information including property definitions
   * @returns The serialized plain object
   * @throws {Error} If the property type is not an inline object type
   */
  serialize(value: any, propertyType: PropertyType): any {
    if (!isInlineObjectType(propertyType)) {
      throw new Error('Invalid property type for InlineObjectProcessor');
    }

    const result: Record<string, any> = {};
    for (const [key, metadata] of Object.entries(propertyType.properties)) {
      const propertyValue = value[key];
      if (propertyValue !== undefined) {
        result[key] = this.context
          .findProcessor(metadata.type)
          .serialize(propertyValue, metadata.type);
      }
    }
    return result;
  }
}
