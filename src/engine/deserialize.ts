import { SerializationEngine } from './SerializationEngine';
import { Constructor, InterfaceType } from '../schema';

/**
 * Deserializes a JSON string or object into an instance of the given type.
 *
 * @param input The input data to deserialize. It can be a JSON string or an object.
 * @param type The class constructor or interface name to deserialize the input into.
 * @returns {T} The deserialized instance of the specified type.
 */
export function deserialize<T>(
  input: string | object,
  type: Constructor<T> | InterfaceType
): T {
  const obj = typeof input === 'string' ? JSON.parse(input) : input;
  return SerializationEngine.getInstance().deserialize<T>(obj, type);
}
