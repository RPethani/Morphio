export type PropertyType = string | (new () => any) | ContainerType;



/**
 * Metadata for a property used in serialization and deserialization.
 *
 * This interface defines the metadata that can be applied to a class property
 * for use in serialization and deserialization. It includes the type of the property,
 * whether it is required, its description, container type (e.g., array or map), and
 * the type of the values inside collections.
 */
export interface PropertyMetadata {
  /**
   * The type of the property. It can either be:
   * - A primitive type like `string`, `number`, etc.
   * - A class constructor function (for custom classes).
   * - A complex type representing a collection like `Array<Type>` or `Map<KeyType, ValueType>`.
   *
   * @type {string | (new () => any) | ContainerType}
   */
  type: PropertyType;

  /**
   * Whether the property is required in the schema.
   *
   * @default true
   */
  required?: boolean;

  /**
   * A description of the property, providing additional context or explanation.
   *
   * @type {string}
   */
  description?: string;
}

/**
 * A type that represents a container structure (Array, Map, etc.) with its elements' types.
 *
 * `Array` or `Map` will include nested types in a recursive fashion.
 */
export interface ContainerType {
  /**
   * The container type, can be 'array' or 'map'.
   */
  container: 'array' | 'map';

  /**
   * The inner type of the container. For arrays, it represents the type of items inside the array.
   * For maps, it represents the type of the values inside the map.
   */
  itemType: PropertyType;  // Recursively handle nested containers
}
