import { SerializationEngine } from './SerializationEngine';

/**
 * Deserializes a JSON string or object into an instance of the given class type.
 *
 * The `deserialize` function is responsible for converting JSON data into a class instance,
 * taking into account any schema metadata for handling complex objects, nested classes,
 * and collections like arrays and maps. It uses the `@JsonProp` decorator to determine how
 * to handle each property and ensures that required fields are populated correctly.
 *
 * It supports forgiving deserialization, meaning if no metadata is found, it will fall back
 * to type inference and assign the value as-is.
 *
 * @param input The input data to deserialize. It can be a JSON string or an object.
 * @param classType The class type to deserialize the input into.
 * @returns {T} The deserialized instance of the specified class.
 * @throws {Error} If a required property is missing or the type is incorrect.
 *
 * @example
 * ```ts
 * const json = '{"name": "John", "email": "john@example.com"}';
 * const user = deserialize(json, User);
 * console.log(user.name); // "John"
 * ```
 */
export function deserialize<T>(
  input: string | object,
  classType: new () => T
): T {
  const obj = typeof input === 'string' ? JSON.parse(input) : input;
  return SerializationEngine.getInstance().deserialize(obj, classType);
}
