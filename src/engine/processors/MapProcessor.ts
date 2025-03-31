import { ContainerType, PropertyType } from '../../schema';
import { BaseProcessor } from './BaseProcessor';
import { ProcessorContext } from './ProcessorContext';

/**
 * Processor for handling Map objects.
 * Manages serialization and deserialization of Maps while preserving the type of their values.
 * Keys are always treated as strings in the serialized form.
 */
export class MapProcessor extends BaseProcessor {
  constructor(context: ProcessorContext) {
    super(context);
  }

  /**
   * Deserializes a plain object into a Map by processing each value with the appropriate processor.
   *
   * @param value - The object to deserialize into a Map
   * @param propertyType - Container type information including the value type
   * @returns A Map with deserialized values
   */
  deserialize(value: any, propertyType: PropertyType): Map<any, any> {
    if (!value || typeof value !== 'object') return new Map();

    const container = propertyType as ContainerType;
    const processor = this.context.findProcessor(container.itemType);
    const map = new Map();

    for (const [key, val] of Object.entries(value)) {
      map.set(key, processor.deserialize(val, container.itemType));
    }

    return map;
  }

  /**
   * Serializes a Map into a plain object by processing each value with the appropriate processor.
   *
   * @param value - The Map to serialize
   * @param propertyType - Container type information including the value type
   * @returns A plain object with serialized values
   */
  serialize(value: any, propertyType: PropertyType): Record<string, any> {
    if (!(value instanceof Map)) return {};

    const container = propertyType as ContainerType;
    const processor = this.context.findProcessor(container.itemType);
    const obj: Record<string, any> = {};

    for (const [key, val] of value.entries()) {
      obj[String(key)] = processor.serialize(val, container.itemType);
    }

    return obj;
  }
}
