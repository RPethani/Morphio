import {PropertyMetadata} from "./decorators/PropertyMetadata";

/**
 * Represents the schema for an object in Morphio.
 * The schema contains metadata about the properties of the object and helps with serialization/deserialization.
 * It provides methods to add and retrieve property metadata for a given class.
 *
 * A `MorphioSchema` is typically created for a class that is decorated with `@Serializable()`, and it tracks
 * the properties of that class, including their types, whether they are required, and any other metadata
 * that guides serialization.
 *
 * Example usage:
 * ```ts
 * const schema = MorphioSchema.create('User');
 * schema.addProperty('name', { type: 'string', required: true });
 * const properties = schema.getProperties();
 * ```
 */
export class MorphioSchema {

  /**
   * The name of the schema, typically the name of the class it represents.
   *
   * @type {string}
   */
  private name: string;

  /**
   * A map holding the metadata of properties defined in this schema.
   * The map's keys are property names, and the values are the metadata describing each property.
   *
   * @type {Map<string, PropertyMetadata>}
   */
  private properties: Map<string, PropertyMetadata> = new Map();

  /**
   * Private constructor for creating a `MorphioSchema` instance.
   * This constructor is called via the `create` static method.
   *
   * @param name - The name of the schema (usually the class name).
   */
  private constructor(name: string) {
    this.name = name;
  }

  /**
   * Gets the name of the schema.
   *
   * @returns {string} - The name of the schema.
   */
  getName(): string {
    return this.name;
  }

  /**
   * Sets the name of the schema.
   *
   * @param name - The name to set for the schema.
   */
  setName(name: string): void {
    this.name = name;
  }

  /**
   * Adds a property to the schema.
   *
   * This method associates a property (like a class field) with metadata that describes its type,
   * whether it is required, and other relevant information.
   *
   * @param propertyKey - The name of the property to add.
   * @param metadata - Metadata describing the property (type, required, description, etc.).
   */
  addProperty(propertyKey: string, metadata: PropertyMetadata): void {
    this.properties.set(propertyKey, metadata);
  }

  /**
   * Gets all the properties associated with this schema.
   *
   * @returns {Map<string, PropertyMetadata>} - A map of property names to metadata for each property.
   */
  getProperties(): Map<string, PropertyMetadata> {
    return this.properties;
  }

  /**
   * Creates and returns a new `MorphioSchema` instance.
   *
   * This is a factory method that creates a schema for a given class name. It initializes an empty set of
   * properties that can be added to later.
   *
   * @param name - The name of the schema (usually the class name).
   * @returns {MorphioSchema} - A new `MorphioSchema` instance.
   */
  static create(name: string): MorphioSchema {
    return new MorphioSchema(name);
  }

  // Add more methods as needed for managing schema metadata
}
