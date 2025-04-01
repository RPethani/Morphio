import { PropertyMetadata, SchemaOps, SchemaRegistry } from '../schema';
import 'reflect-metadata';

// Constants for metadata keys
const MORPHIO_PROPERTIES_KEY = 'morphio:properties';
const MORPHIO_SCHEMA_OPTIONS_KEY = 'morphio:schema-options';

/**
 * Interface for MorphSchema options
 */
export interface MorphSchemaOptions {
  name?: string;
}

/**
 * Creates a MorphProp decorator that works with both experimental and stage 3 decorators
 */
export function createMorphProp() {
  return function morphPropDecorator(options: PropertyMetadata) {
    // This function will be called in one of two ways:
    // 1. With experimental decorators: (target, propertyKey, descriptor)
    // 2. With stage 3 decorators: (_, context)
    return function (...args: any[]) {
      const propertyMetadata: PropertyMetadata = {
        type: options.type || 'string',
        required: options?.required ?? true,
        description: options?.description,
      };

      // Check if we're in a stage 3 environment (context object with metadata)
      if (
        args.length === 2 &&
        args[1] &&
        typeof args[1] === 'object' &&
        'name' in args[1]
      ) {
        // Stage 3 decorator
        const [_, context] = args as [undefined, ClassFieldDecoratorContext];
        const propertyKey = context.name;

        if (context.metadata) {
          context.metadata.properties ??= new Map<string, PropertyMetadata>();
          (context.metadata.properties as Map<string, PropertyMetadata>).set(
            propertyKey as string,
            propertyMetadata
          );
        }
      } else {
        // Experimental decorator
        const [target, propertyKey] = args as [any, string | symbol];

        // Get or create the properties map from metadata
        const properties: Map<string | symbol, PropertyMetadata> =
          Reflect.getMetadata(MORPHIO_PROPERTIES_KEY, target.constructor) ||
          new Map();

        // Add this property's metadata
        properties.set(propertyKey, propertyMetadata);

        // Store the updated map
        Reflect.defineMetadata(
          MORPHIO_PROPERTIES_KEY,
          properties,
          target.constructor
        );
      }
    };
  };
}

/**
 * Creates a MorphSchema decorator that works with both experimental and stage 3 decorators
 */
export function createMorphSchema() {
  return function morphSchemaDecorator(options?: MorphSchemaOptions) {
    // This function will be called in one of two ways:
    // 1. With experimental decorators: (constructor)
    // 2. With stage 3 decorators: (target, context)
    return function (...args: any[]) {
      // Check if we're in a stage 3 environment (context object)
      if (
        args.length === 2 &&
        args[1] &&
        typeof args[1] === 'object' &&
        'kind' in args[1]
      ) {
        // Stage 3 decorator
        const [target, context] = args as [
          new () => any,
          ClassDecoratorContext,
        ];
        const schema = SchemaRegistry.getOrCreate(target);
        SchemaOps.setName(schema, options?.name || target.name);

        if (context.metadata && context.metadata.properties instanceof Map) {
          context.metadata.properties.forEach((metadata, key) => {
            SchemaOps.addProperty(schema, key, metadata);
          });
        }
      } else {
        // Experimental decorator
        const [constructor] = args as [new () => any];
        const schema = SchemaRegistry.getOrCreate(constructor);
        SchemaOps.setName(schema, options?.name || constructor.name);

        // Get properties map from metadata
        const properties: Map<string | symbol, PropertyMetadata> =
          Reflect.getMetadata(MORPHIO_PROPERTIES_KEY, constructor) || new Map();

        // Add all properties to the schema
        properties.forEach((metadata, key) => {
          SchemaOps.addProperty(schema, key.toString(), metadata);
        });

        // Store schema options in metadata if needed
        if (options) {
          Reflect.defineMetadata(
            MORPHIO_SCHEMA_OPTIONS_KEY,
            options,
            constructor
          );
        }
      }
    };
  };
}
