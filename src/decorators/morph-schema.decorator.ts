import 'reflect-metadata';
import { createMorphSchema } from './compatibility';

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
export const MorphSchema = createMorphSchema();

/**
 * Options for configuring the `MorphSchema` decorator.
 *
 * The `MorphSchemaOptions` interface allows you to customize the name of the schema for
 * a class that is marked as transformable. If the `name` is not provided, the class's
 * constructor name will be used as the default name.
 */
export { MorphSchemaOptions } from './compatibility';
