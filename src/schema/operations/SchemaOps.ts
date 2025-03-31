import { MorphioSchema } from '../types/MorphioSchema';
import {
  isConstructorType,
  isInterfaceType,
  ObjectType,
  PropertyMetadata,
  TypeIdentifier,
} from '../types/PropertyMetadata';
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
   * Gets all properties for a schema, including inherited ones.
   * Properties from parent schemas are included first, then overridden by own properties.
   *
   * @param schema - The schema to get properties for
   * @returns Map of all property names to their metadata
   */
  getProperties(schema: MorphioSchema): Map<string, PropertyMetadata> {
    const allProperties = new Map<string, PropertyMetadata>();

    // Add properties from parent schemas first (if any)
    if (schema.extends) {
      for (const parentType of schema.extends) {
        const parentSchema = SchemaRegistry.getSchema(parentType);
        if (parentSchema) {
          const parentProps = this.getProperties(parentSchema);
          for (const [key, meta] of parentProps) {
            allProperties.set(key, meta);
          }
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
 * Creates and registers a schema for an interface or class.
 *
 * @example
 * ```typescript
 * interface Person {
 *   name: string;
 *   age: number;
 * }
 *
 * // Using interface name
 * morphioSchema({ interface: 'Person' }, {
 *   name: { type: 'string', required: true },
 *   age: { type: 'number', required: true }
 * });
 *
 * // Using class constructor with inheritance
 * morphioSchema(Employee, {
 *   salary: { type: 'number', required: true }
 * }, [Person]);
 *
 * // Using interface with inheritance
 * morphioSchema({ interface: 'Admin' }, {
 *   permissions: { type: 'string', required: true }
 * }, [{ interface: 'Employee' }]);
 * ```
 *
 * @param type - The class constructor or interface type
 * @param properties - Map of property names to their metadata
 * @param parentTypes - Optional array of types this schema extends from
 * @returns The created and registered schema
 */
export function morphioSchema(
  type: ObjectType,
  properties: Record<string, PropertyMetadata>,
  parentTypes?: TypeIdentifier[]
): MorphioSchema {
  // Get the name from the type
  const name = isConstructorType(type) ? type.name : type.interface;

  // Create the schema
  const schema = SchemaOps.create(name, { isInterface: isInterfaceType(type) });

  // Set extends if provided
  if (parentTypes && parentTypes.length > 0) {
    schema.extends = parentTypes;
  }

  // Add all properties
  for (const [key, meta] of Object.entries(properties)) {
    SchemaOps.addProperty(schema, key, meta);
  }

  // Register the schema
  SchemaRegistry.registerSchema(type, schema);

  return schema;
}
