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
   * The type of the property. Can be a string representing a primitive type
   * or a class constructor representing a complex type.
   *
   * @type {string | (new () => any)}
   */
  type: string | (new () => any);

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

  /**
   * The container type for the property, used for collections such as arrays and maps.
   * Can be either 'array' or 'map'.
   *
   * @type {'array' | 'map'}
   */
  container?: 'array' | 'map';

  /**
   * The type of the values inside a container, such as an array or map.
   * For example, if the property is a `Map<string, Value>`, this would be `Value`.
   *
   * @type {string | (new () => any)}
   */
  valueType?: string | (new () => any);
}
