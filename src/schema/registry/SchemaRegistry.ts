import { MorphioSchema } from '../types/MorphioSchema';
import { SchemaOps } from '../operations/SchemaOps';
import { isInterfaceType, TypeIdentifier } from '../types/PropertyMetadata';

/**
 * A registry that maintains the mapping between types (classes/interfaces) and their schemas.
 */
export class SchemaRegistry {
  /**
   * Map of type constructors or interface names to their schemas
   * @private
   */
  private static schemas: Map<TypeIdentifier, MorphioSchema> = new Map();

  /**
   * Registers a schema for a type
   *
   * @param target - The class constructor or interface name
   * @param schema - The schema to register
   */
  static registerSchema(target: TypeIdentifier, schema: MorphioSchema): void {
    this.schemas.set(this.getTypeKey(target), schema);
  }

  /**
   * Gets or creates a schema for a type
   *
   * @param target - The class constructor or interface name
   * @returns The schema for the type
   */
  static getOrCreate(target: TypeIdentifier): MorphioSchema {
    let schema = this.schemas.get(this.getTypeKey(target));
    if (!schema) {
      if (isInterfaceType(target)) {
        schema = SchemaOps.create(target.interface);
        this.registerSchema(target, schema);
      } else {
        const name = typeof target === 'string' ? target : target.name;
        schema = SchemaOps.create(name);
        this.registerSchema(target, schema);
      }
    }
    return schema;
  }

  /**
   * Gets a schema for a type if it exists
   *
   * @param target - The class constructor or interface name
   * @returns The schema for the type or undefined if not found
   */
  static getSchema(target: TypeIdentifier): MorphioSchema | undefined {
    return this.schemas.get(this.getTypeKey(target));
  }

  /**
   * Converts a TypeIdentifier into a string key for the schema registry.
   *
   * This conversion is necessary because when using objects as Map keys, JavaScript compares them by reference.
   * For example:
   * ```typescript
   * const map = new Map();
   * map.set({ interface: 'Animal' }, schema);
   *
   * // This will return undefined because it's a different object reference
   * map.get({ interface: 'Animal' });
   *
   * // Using string keys solves this:
   * map.set('Interface:Animal', schema);
   * map.get('Interface:Animal'); // Works correctly
   * ```
   *
   * For class constructors we can use them directly as keys since they are already unique references.
   *
   * @param target - The type identifier to convert to a map key
   * @returns A string key for interface types, or the constructor reference for class types
   * @private
   */
  private static getTypeKey(target: TypeIdentifier): TypeIdentifier {
    if (isInterfaceType(target)) {
      return `Interface:${target.interface}`;
    }
    return target;
  }
}
