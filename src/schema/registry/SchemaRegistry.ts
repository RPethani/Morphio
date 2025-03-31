import { MorphioSchema } from '../types/MorphioSchema';
import { SchemaOps } from '../operations/SchemaOps';
import { TypeIdentifier } from '../types/PropertyMetadata';

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
    this.schemas.set(target, schema);
  }

  /**
   * Gets or creates a schema for a type
   *
   * @param target - The class constructor or interface name
   * @returns The schema for the type
   */
  static getOrCreate(target: TypeIdentifier): MorphioSchema {
    let schema = this.schemas.get(target);
    if (!schema) {
      if (typeof target === 'object' && 'interface' in target) {
        schema = SchemaOps.create(target.interface);
        this.schemas.set(target, schema);
      } else {
        const name = typeof target === 'string' ? target : target.name;
        schema = SchemaOps.create(name);
        this.schemas.set(target, schema);
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
    return this.schemas.get(target);
  }
}
