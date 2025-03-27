import { MorphioSchema } from './MorphioSchema';
import { PropertyMetadata } from './decorators/PropertyMetadata';

/**
 * The `SchemaRegistry` class is responsible for managing and providing access to schemas
 * for various classes in the Morphio library. It maintains a registry of schemas and allows
 * for retrieving, registering, or creating schemas for classes that are marked with the
 * `@Serializable()` decorator.
 *
 * This class serves as the central point for managing the schema metadata for serialization
 * and deserialization processes. It helps in ensuring that the right schema is applied to
 * classes when performing these operations, and it supports lazy loading (creating schemas
 * only when needed).
 *
 * Example usage:
 * ```ts
 * // Registering a schema
 * SchemaRegistry.registerSchema(User, userSchema);
 *
 * // Retrieving an existing schema
 * const schema = SchemaRegistry.getSchema(User);
 *
 * // Creating or getting a schema
 * const schema = SchemaRegistry.getOrCreate(User);
 * ```
 */
export class SchemaRegistry {
  /**
   * A static map that holds the registered schemas, keyed by their class constructors.
   * Each schema is associated with a class to provide metadata for serialization and
   * deserialization.
   *
   * @type {Map<new () => any, MorphioSchema>}
   * @private
   */
  private static schemas: Map<new () => any, MorphioSchema> = new Map();

  /**
   * A static map that holds the registered property metadata, keyed by their class constructors.
   * Each property metadata is associated with a class to provide additional information for serialization and
   * deserialization.
   *
   * @type {Map<new () => any, Map<string, PropertyMetadata>>}
   * @private
   */
  private static propertyMetadata: Map<
    new () => any,
    Map<string, PropertyMetadata>
  > = new Map();

  /**
   * Registers a schema for a specific class.
   * This method associates a `MorphioSchema` with a class constructor, allowing
   * the schema to be retrieved and used for serialization and deserialization operations.
   *
   * @param target The constructor function of the class.
   * @param schema The `MorphioSchema` to register for the class.
   */
  static registerSchema(target: new () => any, schema: MorphioSchema): void {
    this.schemas.set(target, schema);
  }

  /**
   * Retrieves a schema for a given class.
   * If no schema has been registered for the class, `undefined` is returned.
   *
   * @param target The constructor function of the class.
   * @returns {MorphioSchema | undefined} The schema associated with the class, or `undefined` if not found.
   */
  static getSchema(target: new () => any): MorphioSchema | undefined {
    return this.schemas.get(target);
  }

  /**
   * Retrieves an existing schema for a class or creates a new one if it does not exist.
   * This method will create a new schema if none has been registered for the class,
   * and it will register that schema in the registry.
   *
   * @param target The constructor function of the class.
   * @param name Optional custom name for the schema. If not provided, the class name is used.
   * @returns {MorphioSchema} The schema for the class.
   */
  static getOrCreate(target: new () => any, name?: string): MorphioSchema {
    let schema = this.getSchema(target);
    if (!schema) {
      schema = MorphioSchema.create(name ?? target.name);
      this.registerSchema(target, schema);
    }
    return schema;
  }

  /**
   * Registers property metadata for a specific class.
   * This method associates property metadata with a class constructor, allowing
   * the metadata to be retrieved and used for serialization and deserialization operations.
   *
   * @param target The constructor function of the class.
   * @param propertyKey The key of the property.
   * @param metadata The property metadata to register for the class.
   */
  static registerPropertyMetadata(
    target: new () => any,
    propertyKey: string,
    metadata: PropertyMetadata
  ): void {
    let properties = this.propertyMetadata.get(target);
    if (!properties) {
      properties = new Map();
      this.propertyMetadata.set(target, properties);
    }
    properties.set(propertyKey, metadata);
  }

  /**
   * Retrieves property metadata for a given class.
   * If no property metadata has been registered for the class, `undefined` is returned.
   *
   * @param target The constructor function of the class.
   * @returns {Map<string, PropertyMetadata> | undefined} The property metadata associated with the class, or `undefined` if not found.
   */
  static getPropertyMetadata(
    target: new () => any
  ): Map<string, PropertyMetadata> | undefined {
    return this.propertyMetadata.get(target);
  }
}
