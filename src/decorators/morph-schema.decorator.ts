import 'reflect-metadata';
import { SchemaOps, SchemaRegistry } from '../schema';

/**
 * A decorator to mark a class as transformable and process its property metadata.
 *
 * This decorator performs two main functions:
 * 1. Registers a schema for the class in the SchemaRegistry
 * 2. Processes all property metadata collected by @MorphProp decorators
 *
 * The decorator looks for a Map of property metadata in context.metadata.properties,
 * which is populated by the @MorphProp decorators. It then registers each property
 * with the class schema.
 *
 * Example usage:
 * ```ts
 * @MorphSchema({ name: 'CustomUser' })
 * class User {
 *   @MorphProp({ type: 'string', required: true })
 *   name: string;
 *
 *   @MorphProp({ type: 'number', description: 'User age' })
 *   age?: number;
 * }
 * ```
 *
 * @param options - Configuration options
 * @returns A decorator function that processes class and property metadata
 */
export function MorphSchema(options?: MorphSchemaOptions) {
  return function (target: new () => any, context: ClassDecoratorContext) {
    const schema = SchemaRegistry.getOrCreate(target);
    SchemaOps.setName(schema, options?.name || target.name);
    if (context.metadata && context.metadata?.properties instanceof Map) {
      context.metadata.properties.forEach((metadata, key) => {
        SchemaOps.addProperty(schema, key, metadata);
      });
    }
  };
}

/**
 * Options for configuring the `MorphSchema` decorator.
 *
 * The `MorphSchemaOptions` interface allows you to customize the name of the schema for
 * a class that is marked as transformable. If the `name` is not provided, the class's
 * constructor name will be used as the default name.
 */
export interface MorphSchemaOptions {
  name?: string;
}
