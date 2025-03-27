import {
  ContainerType,
  PropertyMetadata,
  PropertyType,
} from '../../decorators/PropertyMetadata';
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
   * @param _meta - Optional metadata about the array property
   * @returns An array with deserialized elements
   */
  deserialize(
    value: any,
    propertyType: PropertyType,
    _meta?: PropertyMetadata
  ): any[] {
    if (!Array.isArray(value)) return [];

    const container = propertyType as ContainerType;
    const processor = this.context.findProcessor(container.itemType);
    return value.map((item) =>
      processor.deserialize(item, container.itemType, _meta)
    );
  }

  /**
   * Serializes an array by processing each element with the appropriate processor.
   *
   * @param value - The array to serialize
   * @param propertyType - Container type information including the item type
   * @param _meta - Optional metadata about the array property
   * @returns An array with serialized elements
   */
  serialize(
    value: any,
    propertyType: PropertyType,
    _meta?: PropertyMetadata
  ): any[] {
    if (!Array.isArray(value)) return [];
    const container = propertyType as ContainerType;
    const processor = this.context.findProcessor(container.itemType);
    return value.map((item) =>
      processor.serialize(item, container.itemType, _meta)
    );
  }
}
