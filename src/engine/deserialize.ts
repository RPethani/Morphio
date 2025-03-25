// src/engine/deserialize.ts
import { SchemaRegistry } from '../SchemaRegistry';
import { MorphioSchema } from '../MorphioSchema';

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
 * const json = '{"name": "John", "age": 30}';
 * const user = deserialize(json, User);
 * console.log(user.name);  // John
 * console.log(user.age);   // 30
 * ```
 */
export function deserialize<T>(input: string | object, classType: new () => T): T {
  const json = typeof input === 'string' ? JSON.parse(input) : input;
  const instance = Object.create(classType.prototype) as Record<string, any>;
  const schema: MorphioSchema | undefined = SchemaRegistry.getSchema(classType);

  for (const key of Object.keys(json)) {
    const value = (json as Record<string, any>)[key];
    const meta = schema?.getProperties().get(key);

    if (meta) {
      instance[key] = handleMetaProperty(value, meta);
    } else {
      // Fallback for properties without schema metadata
      instance[key] = value;
    }
  }

  return instance as T;
}

/**
 * Handles a property that has schema metadata, including arrays, maps, and nested objects.
 *
 * @param value The value of the property to process.
 * @param meta The schema metadata for the property.
 * @returns The processed value.
 */
function handleMetaProperty(value: any, meta: any): any {
  if (value === undefined || value === null) {
    if (meta.required) throw new Error(`Missing required property: ${meta.name}`);
    return value;
  }

  if (meta.container === 'array') {
    return handleArray(value, meta);
  } else if (meta.container === 'map') {
    return handleMap(value, meta);
  } else if (typeof meta.type === 'function') {
    return deserialize(value, meta.type);
  } else {
    return coerceType(value, meta.type);
  }
}

/**
 * Handles deserialization of array properties.
 *
 * @param value The array value to process.
 * @param meta The schema metadata for the array property.
 * @returns The deserialized array.
 */
function handleArray(value: any[], meta: any): any[] {
  return meta.valueType
    ? value.map(item => {
      const itemSchema = typeof meta.valueType === 'function' ? SchemaRegistry.getSchema(meta.valueType) : undefined;
      return itemSchema ? deserialize(item, meta.valueType) : coerceType(item, meta.valueType);
    })
    : value;
}

/**
 * Handles deserialization of map properties.
 *
 * @param value The map value to process.
 * @param meta The schema metadata for the map property.
 * @returns The deserialized map.
 */
function handleMap(value: Record<string, any>, meta: any): Map<any, any> {
  const map = new Map();
  for (const [key, val] of Object.entries(value)) {
    const item = meta.valueType
      ? deserialize(val, meta.valueType)
      : val;
    map.set(key, item);
  }
  return map;
}

/**
 * Coerces the type of the given value to match the specified target type.
 *
 * This helper function attempts to convert a given value to the target type (e.g.
 * number, string, boolean) based on the provided `type` argument.
 *
 * @param value The value to be coerced into the target type.
 * @param type The target type to coerce the value into (can be a string like 'number' or a function type).
 * @returns The coerced value in the desired type.
 */
function coerceType(value: any, type: string | Function): any {
  const targetType = typeof type === 'string' ? type : typeof type();
  switch (targetType) {
    case 'number': return Number(value);
    case 'string': return String(value);
    case 'boolean': return Boolean(value);
    default: return value;
  }
}
