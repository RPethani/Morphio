import { PropertyMetadata, PropertyType } from '../../schema';
import { ProcessorContext } from './ProcessorContext';
import { ValueProcessor } from './ValueProcessor';

/**
 * Abstract base class for value processors that implements the ValueProcessor interface.
 * Provides common functionality and context management for all processor implementations.
 */
export abstract class BaseProcessor implements ValueProcessor {
  /**
   * Creates a new processor instance.
   *
   * @param context - The context that provides access to other processors and serialization services
   */
  constructor(protected context: ProcessorContext) {}

  /**
   * Abstract method to deserialize a value. Must be implemented by concrete processors.
   *
   * @param value - The value to deserialize
   * @param propertyType - The target type to deserialize to
   * @param meta - Optional metadata about the property being deserialized
   * @returns The deserialized value
   */
  abstract deserialize(
    value: any,
    propertyType: PropertyType,
    meta?: PropertyMetadata
  ): any;

  /**
   * Abstract method to serialize a value. Must be implemented by concrete processors.
   *
   * @param value - The value to serialize
   * @param propertyType - The type of the value being serialized
   * @param meta - Optional metadata about the property being serialized
   * @returns The serialized value
   */
  abstract serialize(
    value: any,
    propertyType: PropertyType,
    meta?: PropertyMetadata
  ): any;
}
