import {SchemaRegistry} from '../SchemaRegistry';
import {MorphioSchema} from '../MorphioSchema';
import {ContainerType, PropertyMetadata} from "../decorators/PropertyMetadata";

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
function handleMetaProperty(value: any, meta: PropertyMetadata): any {
  if (isContainerType(meta.type)) {
    return handleContainerDeserialization(value, meta.type as ContainerType);
  }

  if (meta.type instanceof Function) {
    return deserialize(value, meta.type);  // Recursively deserialize nested objects
  }

  return value;
}

/**
 * Type guard to check if the type is a ContainerType (Array or Map).
 *
 * @param type The type to check.
 * @returns True if the type is a ContainerType, otherwise false.
 */
function isContainerType(type: any): type is ContainerType {
  return type && typeof type === 'object' && 'container' in type;
}

/**
 * Handles deserialization of container types such as arrays and maps.
 *
 * @param value The container value (array or map).
 * @param container The container type metadata.
 * @returns The deserialized container.
 */
function handleContainerDeserialization(value: any, container: ContainerType): any {
  if (container.container === 'array' && Array.isArray(value)) {
    return handleArrayDeserialization(value, container);
  } else if (container.container === 'map' && value && typeof value === 'object') {
    return handleMapDeserialization(value, container);
  }

  return value; // Return as-is if not a container type
}

/**
 * Handles deserialization of array properties.
 *
 * @param value The array value to process.
 * @param container The container metadata for the array property.
 * @returns The deserialized array.
 */
function handleArrayDeserialization(value: any[], container: ContainerType): any[] {
  return value.map((item: any) => {
    // If itemType is a simple type (string, number, etc.)
    if (typeof container.itemType === 'string') {
      return item;
    }

    // If itemType is a class (custom object), deserialize it recursively
    if (container.itemType instanceof Function) {
      return deserialize(item, container.itemType);
    }

    // If itemType is another container (array or map), handle it recursively
    if (isContainerType(container.itemType)) {
      return handleContainerDeserialization(item, container.itemType);
    }

    return item; // Fallback if no matching condition
  });
}

/**
 * Handles deserialization of map properties.
 *
 * @param value The map value to process.
 * @param container The container metadata for the map property.
 * @returns The deserialized map.
 */
function handleMapDeserialization(value: Record<string, any>, container: ContainerType): Map<any, any> {
  const map = new Map();
  for (const [key, val] of Object.entries(value)) {
    // If itemType is a simple type (string, number, etc.)
    if (typeof container.itemType === 'string') {
      map.set(key, val);
    }

    // If itemType is a class (custom object), deserialize it recursively
    else if (container.itemType instanceof Function) {
      map.set(key, deserialize(val, container.itemType));
    }

    // If itemType is another container (array or map), handle it recursively
    else if (isContainerType(container.itemType)) {
      map.set(key, handleContainerDeserialization(val, container.itemType));
    } else {
      map.set(key, val); // Fallback if no matching condition
    }
  }
  return map;
}
