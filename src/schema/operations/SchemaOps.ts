import { MorphioSchema } from '../types/MorphioSchema';
import { Constructor, PropertyMetadata } from '../types/PropertyMetadata';
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
      discriminator?: string;
      discriminatorValue?: string;
      implementation?: Constructor;
      extends?: MorphioSchema[];
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

  /**
   * Makes a schema extend from one or more parent schemas
   *
   * @param schema - The schema to modify
   * @param parents - Parent schemas to extend from
   */
  extendFrom(schema: MorphioSchema, ...parents: MorphioSchema[]): void {
    if (!schema.extends) {
      schema.extends = [];
    }
    schema.extends.push(...parents);
  },

  /**
   * Sets up interface type discrimination for a schema
   *
   * @param schema - The schema to modify
   * @param discriminator - The property name that acts as type discriminator
   */
  setDiscriminator(schema: MorphioSchema, discriminator: string): void {
    schema.discriminator = discriminator;
    // Ensure the discriminator property exists
    if (!schema.properties.has(discriminator)) {
      this.addProperty(schema, discriminator, {
        type: 'string',
        required: true,
      });
    }
  },

  /**
   * Sets the discriminator value for an interface implementation
   *
   * @param schema - The schema to modify
   * @param value - The discriminator value that identifies this implementation
   */
  setDiscriminatorValue(schema: MorphioSchema, value: string): void {
    schema.discriminatorValue = value;
  },

  /**
   * Sets a default implementation class for an interface schema
   *
   * @param schema - The schema to modify
   * @param implementation - The class to use as default implementation
   */
  setImplementation(schema: MorphioSchema, implementation: Constructor): void {
    schema.implementation = implementation;
  },

  /**
   * Gets all inherited properties from parent schemas
   *
   * @param schema - The schema to get inherited properties from
   * @returns Map of inherited property names to their metadata
   */
  getInheritedProperties(schema: MorphioSchema): Map<string, PropertyMetadata> {
    const inherited = new Map<string, PropertyMetadata>();

    if (schema.extends) {
      for (const parentSchema of schema.extends) {
        const parentProps = this.getProperties(parentSchema);
        for (const [key, meta] of parentProps) {
          inherited.set(key, meta);
        }
      }
    }

    return inherited;
  },

  /**
   * Checks if a schema is or extends from a given interface schema
   *
   * @param schema - The schema to check
   * @param interfaceSchema - The interface schema to check against
   * @returns true if schema implements or extends from interfaceSchema
   */
  implementsInterface(
    schema: MorphioSchema,
    interfaceSchema: MorphioSchema
  ): boolean {
    if (schema === interfaceSchema) return true;
    if (!schema.extends) return false;

    return schema.extends.some(
      (parent) =>
        parent === interfaceSchema ||
        this.implementsInterface(parent, interfaceSchema)
    );
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
 * @param options - Optional schema configuration
 * @returns The created and registered schema
 */
export function morphioSchema(
  name: string,
  properties: Record<string, PropertyMetadata>,
  options?: {
    discriminator?: string;
    discriminatorValue?: string;
    implementation?: Constructor;
    extends?: MorphioSchema[];
  }
): MorphioSchema {
  // Create the schema
  const schema = SchemaOps.create(name, { isInterface: true, ...options });

  // Add all properties
  for (const [key, meta] of Object.entries(properties)) {
    SchemaOps.addProperty(schema, key, meta);
  }

  // Register the schema
  SchemaRegistry.registerSchema(name, schema);

  return schema;
}
