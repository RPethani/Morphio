import { MorphioSchema } from '../types/MorphioSchema';
import { PropertyMetadata } from '../types/PropertyMetadata';

/**
 * Operations for managing MorphioSchema instances.
 * These operations replace the previous class-based methods with pure functions.
 */
export const SchemaOps = {
  /**
   * Creates a new MorphioSchema instance
   *
   * @param name - The name of the schema (usually the class or interface name)
   * @returns A new MorphioSchema instance
   */
  create(name: string): MorphioSchema {
    return {
      name,
      properties: new Map(),
    };
  },

  /**
   * Sets the name of a schema
   *
   * @param schema - The schema to modify
   * @param name - The new name to set
   */
  setName(schema: MorphioSchema, name: string): void {
    schema.name = name;
  },

  /**
   * Adds a property to the schema
   *
   * @param schema - The schema to modify
   * @param key - The property key
   * @param meta - The property metadata
   */
  addProperty(
    schema: MorphioSchema,
    key: string,
    meta: PropertyMetadata
  ): void {
    schema.properties.set(key, meta);
  },

  /**
   * Gets all properties of a schema
   *
   * @param schema - The schema to get properties from
   * @returns Map of property names to their metadata
   */
  getProperties(schema: MorphioSchema): Map<string, PropertyMetadata> {
    return schema.properties;
  },
};
