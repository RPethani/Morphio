import {SchemaRegistry} from "../SchemaRegistry";

/**
 * A decorator function that adds metadata to a class property.
 *
 * This decorator is used to define the schema for a property in a class that will be
 * serialized or deserialized using the Morphio library. It allows the user to specify
 * the type, whether the property is required, and other options such as the property's
 * description, container type, and value type for collections like arrays and maps.
 *
 * Example usage:
 * ```ts
 * @JsonProp({ type: 'string', required: true })
 * name: string;
 * ```
 *
 * @param options - The options for configuring the property metadata.
 * @returns A decorator function that applies the metadata to the target property.
 */
export function JsonProp(options: JsonPropOptions) {
  return function (target: any, propertyKey: string): void {
    const schema = SchemaRegistry.getOrCreate(target.constructor);

    // Add property metadata to the schema
    schema.addProperty(propertyKey, {
      type: options.type,
      required: options.required !== false,  // Defaults to true if not specified
      description: options.description,
      container: options.container,
      valueType: options.valueType
    });
  };
}

/**
 * Options for configuring a property in the `@JsonProp` decorator.
 *
 * This interface defines the metadata that can be applied to a class property
 * for use in serialization and deserialization. The options include the type
 * of the property, whether it is required, its description, container type (e.g.,
 * array or map), and the type of the values inside collections.
 */
export interface JsonPropOptions {
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
