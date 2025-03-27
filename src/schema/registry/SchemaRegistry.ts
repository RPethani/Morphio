import { MorphioSchema } from '../types/MorphioSchema';
import { SchemaOps } from '../operations/SchemaOps';

/**
 * A registry that maintains the mapping between types (classes/interfaces) and their schemas.
 */
export class SchemaRegistry {
  /**
   * Map of type constructors or interface names to their schemas
   * @private
   */
  private static schemas: Map<new () => any | string, MorphioSchema> =
    new Map();

  /**
   * Registers a schema for a type
   *
   * @param target - The class constructor or interface name
   * @param schema - The schema to register
   */
  static registerSchema(
    target: new () => any | string,
    schema: MorphioSchema
  ): void {
    this.schemas.set(target, schema);
  }

  /**
   * Gets the schema for a type
   *
   * @param target - The class constructor or interface name
   * @returns The schema if found, undefined otherwise
   */
  static getSchema(target: new () => any | string): MorphioSchema | undefined {
    return this.schemas.get(target);
  }

  /**
   * Gets an existing schema or creates a new one
   *
   * @param target - The class constructor or interface name
   * @param name - Optional name for the schema
   * @returns The existing or newly created schema
   */
  static getOrCreate(
    target: new () => any | string,
    name?: string
  ): MorphioSchema {
    let schema = this.getSchema(target);
    if (!schema) {
      schema = SchemaOps.create(
        name ?? (typeof target === 'string' ? target : target.name)
      );
      this.registerSchema(target, schema);
    }
    return schema;
  }
}
