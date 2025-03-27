import { PropertyMetadata, PropertyType } from '../../schema';
import { BaseProcessor } from './BaseProcessor';
import { ProcessorContext } from './ProcessorContext';

/**
 * Processor for handling class instances.
 * Manages serialization and deserialization of class instances by delegating
 * to the context's serialization methods.
 */
export class ClassProcessor extends BaseProcessor {
  constructor(context: ProcessorContext) {
    super(context);
  }

  /**
   * Deserializes a plain object into a class instance.
   *
   * @param value - The object to deserialize
   * @param _propertyType - The target class type
   * @param _meta - Metadata about the class property (unused)
   * @returns An instance of the target class with deserialized properties
   */
  deserialize(
    value: any,
    _propertyType: PropertyType,
    _meta: PropertyMetadata
  ): any {
    if (!value || typeof value !== 'object') return {};
    return this.context.deserialize(value, _propertyType as new () => any);
  }

  /**
   * Serializes a class instance into a plain object.
   *
   * @param value - The class instance to serialize
   * @param _propertyType - The class type
   * @param _meta - Metadata about the class property (unused)
   * @returns A plain object with serialized properties
   */
  serialize(
    value: any,
    _propertyType: PropertyType,
    _meta: PropertyMetadata
  ): any {
    if (!value || typeof value !== 'object') return {};
    return this.context.serialize(value, _propertyType);
  }
}
