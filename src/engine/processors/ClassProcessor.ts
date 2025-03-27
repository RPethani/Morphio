import { PropertyMetadata, PropertyType, SchemaRegistry } from '../../schema';
import { BaseProcessor } from './BaseProcessor';
import { ProcessorContext } from './ProcessorContext';

/**
 * Processor for handling class instances and interfaces.
 * Manages serialization and deserialization of class instances and interface implementations
 * by delegating to the context's serialization methods.
 */
export class ClassProcessor extends BaseProcessor {
  constructor(context: ProcessorContext) {
    super(context);
  }

  /**
   * Deserializes a plain object into a class instance or interface implementation.
   *
   * @param value - The object to deserialize
   * @param propertyType - The target class type or interface name
   * @param _meta - Metadata about the property
   * @returns An instance of the target class with deserialized properties
   */
  deserialize(
    value: any,
    propertyType: PropertyType,
    _meta: PropertyMetadata
  ): any {
    if (!value || typeof value !== 'object') return {};

    // For interface types, we'll let the SerializationEngine handle finding the implementation
    if (typeof propertyType === 'string') {
      const schema = SchemaRegistry.getSchema(propertyType);
      if (schema?.isInterface) {
        return this.context.deserialize(value, propertyType as any);
      }
    }

    // For class types, deserialize directly
    return this.context.deserialize(value, propertyType as new () => any);
  }

  /**
   * Serializes a class instance or interface implementation into a plain object.
   *
   * @param value - The instance to serialize
   * @param propertyType - The class type or interface name
   * @param _meta
   * @returns A plain object with serialized properties
   */
  serialize(
    value: any,
    propertyType: PropertyType,
    _meta: PropertyMetadata
  ): any {
    if (!value || typeof value !== 'object') return {};

    // Let SerializationEngine handle both class instances and interface implementations
    return this.context.serialize(value, propertyType);
  }
}
