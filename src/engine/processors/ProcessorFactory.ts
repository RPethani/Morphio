import { PropertyType } from '../../decorators/PropertyMetadata';
import { ArrayProcessor } from './ArrayProcessor';
import { ClassProcessor } from './ClassProcessor';
import { MapProcessor } from './MapProcessor';
import { ProcessorContext } from './ProcessorContext';
import { SimpleValueProcessor } from './SimpleValueProcessor';
import { ValueProcessor } from './ValueProcessor';

/**
 * Enumeration of supported processor types.
 * Each type corresponds to a specific value processor implementation.
 */
export enum ProcessorType {
  /** For processing primitive types and dates */
  SIMPLE = 'simple',
  /** For processing arrays and array-like objects */
  ARRAY = 'array',
  /** For processing Map objects */
  MAP = 'map',
  /** For processing class instances */
  CLASS = 'class',
}

/**
 * Factory class for creating and managing value processors.
 * Uses the singleton pattern to ensure only one instance exists.
 */
export class ProcessorFactory {
  private static instance: ProcessorFactory;
  private processorMap: Map<ProcessorType, ValueProcessor>;

  /**
   * Creates a new ProcessorFactory instance.
   * Private to enforce singleton pattern.
   *
   * @param context - The context to pass to created processors
   */
  private constructor(private context: ProcessorContext) {
    this.processorMap = new Map();
    this.processorMap.set(
      ProcessorType.SIMPLE,
      new SimpleValueProcessor(this.context)
    );
    this.processorMap.set(
      ProcessorType.ARRAY,
      new ArrayProcessor(this.context)
    );
    this.processorMap.set(ProcessorType.MAP, new MapProcessor(this.context));
    this.processorMap.set(
      ProcessorType.CLASS,
      new ClassProcessor(this.context)
    );
  }

  /**
   * Gets the singleton instance of ProcessorFactory.
   * Creates a new instance if one doesn't exist.
   *
   * @param context - The context to pass to the factory
   * @returns The singleton ProcessorFactory instance
   */
  static getInstance(context: ProcessorContext): ProcessorFactory {
    if (!ProcessorFactory.instance) {
      ProcessorFactory.instance = new ProcessorFactory(context);
    }
    return ProcessorFactory.instance;
  }

  /**
   * Gets a processor by its type.
   *
   * @param type - The type of processor to get
   * @returns The processor instance or undefined if not found
   */
  getProcessor(type: ProcessorType): ValueProcessor | undefined {
    return this.processorMap.get(type);
  }

  /**
   * Finds the appropriate processor for a given property type.
   * Always returns a processor, falling back to SimpleValueProcessor if no specific processor is found.
   *
   * @param propertyType - The type of property to find a processor for
   * @returns A processor capable of handling the given property type
   */
  findProcessor(propertyType: PropertyType | undefined): ValueProcessor {
    // For undefined or null propertyType, return simple processor
    if (!propertyType) {
      return (
        this.processorMap.get(ProcessorType.SIMPLE) ||
        new SimpleValueProcessor(this.context)
      );
    }

    // Check for container types (array, map)
    if (typeof propertyType === 'object' && 'container' in propertyType) {
      const containerType = propertyType.container;
      if (containerType === 'array') {
        return (
          this.processorMap.get(ProcessorType.ARRAY) ||
          new ArrayProcessor(this.context)
        );
      }
      if (containerType === 'map') {
        return (
          this.processorMap.get(ProcessorType.MAP) ||
          new MapProcessor(this.context)
        );
      }
    }

    // Check for class types
    if (propertyType instanceof Function) {
      return (
        this.processorMap.get(ProcessorType.CLASS) ||
        new ClassProcessor(this.context)
      );
    }

    // Default to simple processor for primitive types
    return (
      this.processorMap.get(ProcessorType.SIMPLE) ||
      new SimpleValueProcessor(this.context)
    );
  }
}
