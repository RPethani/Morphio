import 'reflect-metadata';
import { SchemaOps, SchemaRegistry } from '../schema';

/**
 * A decorator to mark a class as serializable and process its property metadata.
 *
 * This decorator performs two main functions:
 * 1. Registers a schema for the class in the SchemaRegistry
 * 2. Processes all property metadata collected by @JsonProp decorators
 *
 * The decorator looks for a Map of property metadata in context.metadata.properties,
 * which is populated by the @JsonProp decorators. It then registers each property
 * with the class schema.
 *
 * Example usage:
 * ```ts
 * @Serializable({ name: 'CustomUser' })
 * class User {
 *   @JsonProp({ type: 'string', required: true })
 *   name: string;
 *
 *   @JsonProp({ type: 'number', description: 'User age' })
 *   age?: number;
 * }
 * ```
 *
 * @param options - Configuration options
 * @returns A decorator function that processes class and property metadata
 */
export function Serializable(options?: SerializableOptions) {
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
 * Options for configuring the `Serializable` decorator.
 *
 * The `SerializableOptions` interface allows you to customize the name of the schema for
 * a class that is marked as serializable. If the `name` is not provided, the class's
 * constructor name will be used as the default name.
 */
export interface SerializableOptions {
  name?: string;
}
