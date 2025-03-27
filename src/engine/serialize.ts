import { SerializationEngine } from './SerializationEngine';

/**
 * Serializes an instance of a class into a plain object.
 *
 * The `serialize` function is responsible for converting an instance of a class into a plain
 * JavaScript object, based on the schema associated with that class. It respects the metadata
 * defined by the `@JsonProp` decorator and handles nested objects, arrays, and maps.
 *
 * This function supports forgiving serialization, meaning that properties without explicit
 * metadata will be included in the serialized output.
 *
 * @param input The instance to serialize. It must be an instance of a class.
 * @returns The serialized object.
 *
 * @example
 * ```ts
 * const user = new User("John", "john@example.com");
 * const serialized = serialize(user);
 * console.log(serialized); // { name: "John", email: "john@example.com" }
 * ```
 */
export function serialize(input: any): object {
  return SerializationEngine.getInstance().serialize(input);
}

/**
 * Serializes an instance of a class into a JSON string.
 *
 * This method converts an instance of a class into a JSON string, based on the schema
 * associated with that class. It calls the `serialize` function to first generate the plain object
 * and then converts that object into a JSON string using `JSON.stringify`.
 *
 * @param input The instance to serialize. It must be an instance of a class.
 * @returns The serialized JSON string.
 *
 * @example
 * ```ts
 * const user = new User("John", "john@example.com");
 * const serializedString = serializeToString(user);
 * console.log(serializedString); // '{"name":"John","email":"john@example.com"}'
 * ```
 */
export function serializeToString(input: any): string {
  return JSON.stringify(serialize(input));
}
