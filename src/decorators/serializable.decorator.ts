import 'reflect-metadata';
import {SchemaRegistry} from "../SchemaRegistry";

/**
 * A decorator to mark a class as serializable, enabling it to be serialized and deserialized.
 *
 * This decorator registers a schema for the class, allowing the Morphio library to
 * understand how to serialize and deserialize instances of this class. It also allows
 * for customization of the schema name via the `options` parameter.
 *
 * The decorator uses the `SchemaRegistry` to create or fetch a schema and assign it a name.
 *
 * Example usage:
 * ```ts
 * @Serializable({ name: 'CustomUser' })
 * class User {
 *   @JsonProp({ type: 'string' }) name: string;
 *   @JsonProp({ type: 'string' }) email: string;
 * }
 * ```
 * In this example, the `User` class is marked as serializable and given the custom name `CustomUser`.
 *
 * @param options Optional configuration options for the `Serializable` decorator.
 * @returns A decorator function that can be applied to a class constructor.
 */


export function Serializable(options?: SerializableOptions) {
  return function (constructor: Function) {
    const schema = SchemaRegistry.getOrCreate(constructor);
    schema.setName(options?.name || constructor.name);
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
