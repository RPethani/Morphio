/**
 * Represents a constructor type that can create instances of a class.
 */
export type Constructor<T = any> = new () => T;

/**
 * Represents a type identifier that can be either a constructor or an interface name.
 */
export type TypeIdentifier = Constructor | string;

/**
 * Represents a type that can be used in property metadata.
 * This can be:
 * - A primitive type name ('string', 'number', etc.)
 * - A class constructor
 * - An interface name (string)
 * - A container type (array or map)
 */
export type PropertyType = TypeIdentifier | ContainerType;

/**
 * Metadata for a property used in serialization and deserialization.
 */
export interface PropertyMetadata {
  /**
   * The type of the property. It can either be:
   * - A primitive type like 'string', 'number', etc.
   * - A class constructor function (for custom classes)
   * - An interface name (for interface types)
   * - A complex type representing a collection like Array<T> or Map<K,V>
   */
  type: PropertyType;

  /**
   * Whether the property is required in the schema.
   * @default true
   */
  required?: boolean;

  /**
   * A description of the property, providing additional context or explanation.
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
  itemType: PropertyType; // Recursively handle nested containers
}
