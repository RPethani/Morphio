import {SchemaRegistry} from "../SchemaRegistry";
import {MorphioSchema} from "../MorphioSchema";
import {ContainerType, PropertyType} from "../decorators/PropertyMetadata";

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
      serializedObject[key] = handlePropertySerialization(value, meta.type);
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
 * @param propertyType The schema metadata for the property.
 * @returns The serialized value.
 */
function handlePropertySerialization(value: any, propertyType: PropertyType): any {
  if (isContainerType(propertyType)) {
    return handleContainerSerialization(value, propertyType as ContainerType);
  }

  if (propertyType instanceof Function) {
    return serialize(value);  // Recursively serialize nested objects
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
 * Handles serialization of container types such as arrays and maps.
 *
 * @param value The container value (array or map).
 * @param container The container type metadata.
 * @returns The serialized container.
 */
function handleContainerSerialization(value: any, container: ContainerType): any {
  if (container.container === 'array' && Array.isArray(value)) {
    return handleContainerItemSerialization(value, container);
  } else if (container.container === 'map' && value && typeof value === 'object') {
    return handleContainerItemSerialization(value, container);
  }

  return value; // Return as-is if not a container type
}

/**
 * A helper method to handle item serialization for both arrays and maps.
 *
 * @param value The container value (array or map).
 * @param container The container metadata.
 * @returns The serialized container items.
 */
function handleContainerItemSerialization(value: any, container: ContainerType): any {
  if (Array.isArray(value)) {
    return value.map((item: any) => serializeContainerItem(item, container.itemType));
  }

  if (value instanceof Map) {
    const serializedMap: Record<string, any> = {};
    for (const [key, val] of value.entries()) {
      serializedMap[key] = serializeContainerItem(val, container.itemType);
    }
    return serializedMap;
  }

  return value; // Fallback if the value is neither an array nor a map
}

/**
 * Serialize a single container item based on its type.
 *
 * @param item The item to serialize.
 * @param itemType The type of the item (could be a simple type, class, or another container).
 * @returns The serialized item.
 */
function serializeContainerItem(item: any, itemType: PropertyType): any {
  // If itemType is a simple type (string, number, etc.), return the item as-is
  if (typeof itemType === 'string') {
    return item;
  }

  // If itemType is a class (custom object), serialize it recursively
  if (itemType instanceof Function) {
    return serialize(item);
  }

  // If itemType is another container (array or map), handle it recursively
  if (isContainerType(itemType)) {
    return handleContainerSerialization(item, itemType);
  }

  return item; // Fallback if no matching condition
}
