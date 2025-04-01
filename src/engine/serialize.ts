import { SerializationEngine } from './SerializationEngine';
import { ObjectType } from '../schema';

/**
 * Serializes a class instance to a plain JavaScript object.
 *
 * This function recursively processes each property of the class instance based on
 * the metadata defined by the `@MorphProp` decorator and handles nested objects, arrays, and maps.
 *
 * @param value - The class instance to serialize
 * @returns A plain JavaScript object representation of the class instance
 */
export function serialize(input: any, objectType?: ObjectType): object {
  return SerializationEngine.getInstance().serialize(input, objectType);
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
