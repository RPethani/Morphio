import { MorphioSchema } from '../types/MorphioSchema';
import { PropertyMetadata } from '../types/PropertyMetadata';
import { SchemaRegistry } from '../registry/SchemaRegistry';

/**
 * Operations for managing MorphioSchema instances.
 * These operations replace the previous class-based methods with pure functions.
 */
export const SchemaOps = {
  /**
   * Creates a new MorphioSchema instance
   *
   * @param name - The name of the schema (usually the class or interface name)
   * @param options - Optional schema configuration
   * @returns A new MorphioSchema instance
   */
  create(
    name: string,
    options?: {
      isInterface?: boolean;
    }
  ): MorphioSchema {
    return {
      name,
      properties: new Map(),
      ...options,
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
   * Gets all properties of a schema, including inherited ones
   *
   * @param schema - The schema to get properties from
   * @returns Map of property names to their metadata
   */
  getProperties(schema: MorphioSchema): Map<string, PropertyMetadata> {
    const allProperties = new Map<string, PropertyMetadata>();

    // Add properties from parent schemas first (if any)
    if (schema.extends) {
      for (const parentSchema of schema.extends) {
        const parentProps = this.getProperties(parentSchema);
        for (const [key, meta] of parentProps) {
          allProperties.set(key, meta);
        }
      }
    }

    // Add/override with own properties
    for (const [key, meta] of schema.properties) {
      allProperties.set(key, meta);
    }

    return allProperties;
  },
};

/**
 * Creates and registers a schema for an interface type.
 * This is a convenience function that combines schema creation, property registration,
 * and schema registration into a single call.
 *
 * @example
 * ```typescript
 * interface Person {
 *   name: string;
 *   age: number;
 * }
 *
 * morphioSchema('Person', {
 *   name: { type: 'string', required: true },
 *   age: { type: 'number', required: true }
 * });
 * ```
 *
 * @param name - The name of the interface
 * @param properties - Map of property names to their metadata
 * @returns The created and registered schema
 */
export function morphioSchema(
  name: string,
  properties: Record<string, PropertyMetadata>
): MorphioSchema {
  // Create the schema
  const schema = SchemaOps.create(name, { isInterface: true });

  // Add all properties
  for (const [key, meta] of Object.entries(properties)) {
    SchemaOps.addProperty(schema, key, meta);
  }

  // Register the schema
  SchemaRegistry.registerSchema(name, schema);

  return schema;
}
