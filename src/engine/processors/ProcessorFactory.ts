import {
  isContainerType,
  isEnumType,
  isInlineObjectType,
  isObjectType,
  isPrimitiveType,
  PropertyType,
} from '../../schema';
import { ArrayProcessor } from './ArrayProcessor';
import { EnumProcessor } from './EnumProcessor';
import { MapProcessor } from './MapProcessor';
import { ObjectProcessor } from './ObjectProcessor';
import { ProcessorContext } from './ProcessorContext';
import { SimpleValueProcessor } from './SimpleValueProcessor';
import { ValueProcessor } from './ValueProcessor';
import { InlineObjectProcessor } from './InlineObjectProcessor';

/**
 * Enumeration of supported processor types.
 * Each type corresponds to a specific value processor implementation.
 */
enum ProcessorType {
  /** For processing primitive types and dates */
  SIMPLE = 'simple',
  /** For processing arrays and array-like objects */
  ARRAY = 'array',
  /** For processing Map objects */
  MAP = 'map',
  /** For processing class instances and interfaces */
  OBJECT = 'object',
  /** For processing inline objects */
  INLINE_OBJECT = 'inlineObject',
  /** For processing enum types */
  ENUM = 'enum',
}

/**
 * Factory class for creating and managing value processors.
 * Uses the singleton pattern to ensure only one instance exists.
 * Each processor type is created once and reused for all subsequent requests.
 *
 * @example
 * ```ts
 * const factory = ProcessorFactory.getInstance(context);
 * const processor = factory.findProcessor('string'); // Returns SimpleValueProcessor
 * const arrayProcessor = factory.findProcessor({ container: 'array', itemType: 'string' }); // Returns ArrayProcessor
 * ```
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
      ProcessorType.OBJECT,
      new ObjectProcessor(this.context)
    );
    this.processorMap.set(
      ProcessorType.INLINE_OBJECT,
      new InlineObjectProcessor(this.context)
    );
    this.processorMap.set(ProcessorType.ENUM, new EnumProcessor(this.context));
  }

  /**
   * Gets or creates the singleton instance of ProcessorFactory.
   *
   * @param context - The context to pass to created processors if creating a new instance
   * @returns The singleton ProcessorFactory instance
   */
  public static getInstance(context: ProcessorContext): ProcessorFactory {
    if (!ProcessorFactory.instance) {
      ProcessorFactory.instance = new ProcessorFactory(context);
    }
    return ProcessorFactory.instance;
  }

  /**
   * Finds the appropriate processor for a given property type.
   * The processor selection is based on the type structure:
   * - Primitive types and dates use SimpleValueProcessor
   * - Arrays use ArrayProcessor
   * - Maps use MapProcessor
   * - Classes and interfaces use ObjectProcessor
   * - Inline objects use InlineObjectProcessor
   * - Enum types use EnumProcessor
   *
   * @param type - The property type to find a processor for
   * @returns The appropriate value processor for the type
   */
  public findProcessor(type: PropertyType): ValueProcessor {
    if (isPrimitiveType(type)) {
      return this.processorMap.get(ProcessorType.SIMPLE)!;
    }

    if (isContainerType(type)) {
      return type.container === 'array'
        ? this.processorMap.get(ProcessorType.ARRAY)!
        : this.processorMap.get(ProcessorType.MAP)!;
    }

    if (isInlineObjectType(type)) {
      return this.processorMap.get(ProcessorType.INLINE_OBJECT)!;
    }

    if (isEnumType(type)) {
      return this.processorMap.get(ProcessorType.ENUM)!;
    }

    if (isObjectType(type)) {
      return this.processorMap.get(ProcessorType.OBJECT)!;
    }

    throw new Error(`No processor found for type: ${JSON.stringify(type)}`);
  }
}
