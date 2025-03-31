import { isContainerType, PropertyType } from '../../schema';
import { BaseProcessor } from './BaseProcessor';
import { ProcessorContext } from './ProcessorContext';

/**
 * Processor for handling array types.
 * Manages serialization and deserialization of arrays while preserving the type of their elements.
 */
export class ArrayProcessor extends BaseProcessor {
  constructor(context: ProcessorContext) {
    super(context);
  }

  /**
   * Deserializes an array by processing each element with the appropriate processor.
   *
   * @param value - The array to deserialize
   * @param propertyType - Container type information including the item type
   * @returns An array with deserialized elements
   */
  deserialize(value: any, propertyType: PropertyType): any[] {
    if (!Array.isArray(value)) return value;
    if (!isContainerType(propertyType)) return value;

    const processor = this.context.findProcessor(propertyType.itemType);
    return value.map((item) =>
      processor.deserialize(item, propertyType.itemType)
    );
  }

  /**
   * Serializes an array by processing each element with the appropriate processor.
   *
   * @param value - The array to serialize
   * @param propertyType - Container type information including the item type
   * @returns An array with serialized elements
   */
  serialize(value: any, propertyType: PropertyType): any[] {
    if (!Array.isArray(value)) return value;
    if (!isContainerType(propertyType)) return value;

    const processor = this.context.findProcessor(propertyType.itemType);
    return value.map((item) =>
      processor.serialize(item, propertyType.itemType)
    );
  }
}
