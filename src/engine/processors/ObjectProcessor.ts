import { isObjectType, ObjectType, PropertyType } from '../../schema';
import { BaseProcessor } from './BaseProcessor';
import { ProcessorContext } from './ProcessorContext';

/**
 * Processor for handling objects and interfaces.
 * Manages serialization and deserialization of objects and interface implementations
 * by delegating to the context's serialization methods.
 */
export class ObjectProcessor extends BaseProcessor {
  constructor(context: ProcessorContext) {
    super(context);
  }

  /**
   * Deserializes a plain object into a class instance or interface implementation.
   *
   * @param value - The object to deserialize
   * @param propertyType - The target class type or interface name
   * @returns An instance of the target class with deserialized properties
   */
  deserialize(value: any, propertyType: PropertyType): any {
    // Only process if property is an object (class or interface)
    if (isObjectType(propertyType)) {
      return this.context.deserialize(value, propertyType as ObjectType);
    }
    return value;
  }

  /**
   * Serializes a class instance or interface implementation into a plain object.
   *
   * @param value - The instance to serialize
   * @param propertyType - The class type or interface name
   * @returns A plain object with serialized properties
   */
  serialize(value: any, propertyType: PropertyType): any {
    // Only process if value is an object (class or interface)
    if (isObjectType(propertyType)) {
      return this.context.serialize(value, propertyType);
    }
    return value;
  }
}
