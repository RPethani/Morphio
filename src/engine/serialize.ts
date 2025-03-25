import {SchemaRegistry} from "../SchemaRegistry";
import {MorphioSchema} from "../MorphioSchema";

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
  const serializedObject: Record<string, any> = {};  // Plain object to store serialized values
  const schema: MorphioSchema | undefined = SchemaRegistry.getSchema(input.constructor);

  for (const key of Object.keys(input)) {
    const value = input[key];
    const meta = schema?.getProperties().get(key);

    if (meta) {
      serializedObject[key] = handleMetaPropertySerialization(value, meta);
    } else {
      // Fallback: serialize properties without metadata
      serializedObject[key] = value;
    }
  }

  return serializedObject;
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
  const serializedObject = serialize(input); // Get the serialized object
  return JSON.stringify(serializedObject);   // Convert the object to a JSON string
}

/**
 * Handles serialization of a property that has schema metadata, including arrays, maps, and nested objects.
 *
 * @param value The value of the property to serialize.
 * @param meta The schema metadata for the property.
 * @returns The serialized value.
 */
function handleMetaPropertySerialization(value: any, meta: any): any {
  if (meta.container === 'array' && Array.isArray(value)) {
    return handleArraySerialization(value, meta);
  } else if (meta.container === 'map' && value && typeof value === 'object') {
    return handleMapSerialization(value, meta);
  } else if (typeof meta.type === 'function') {
    return serialize(value);  // Recursively serialize nested objects
  } else {
    return value;
  }
}

/**
 * Handles serialization of array properties.
 *
 * @param value The array value to serialize.
 * @param meta The schema metadata for the array property.
 * @returns The serialized array.
 */
function handleArraySerialization(value: any[], meta: any): any[] {
  return meta.valueType
    ? value.map(item => {
      const itemSchema = typeof meta.valueType === 'function' ? SchemaRegistry.getSchema(meta.valueType) : undefined;
      return itemSchema ? serialize(item) : item;
    })
    : value;
}

/**
 * Handles serialization of map properties.
 *
 * @param value The map value to serialize.
 * @param meta The schema metadata for the map property.
 * @returns The serialized map.
 */
function handleMapSerialization(value: Map<any, any>, meta: any): Record<string, any> {
  const serializedMap: Record<string, any> = {};
  for (const [key, val] of value.entries()) {
    serializedMap[key] = meta.valueType
      ? serialize(val)
      : val;
  }
  return serializedMap;
}
