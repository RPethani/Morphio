import {MorphioSchema} from "./MorphioSchema";

export class SchemaRegistry {

  private static schemas: Map<Function, MorphioSchema> = new Map();

  static registerSchema(target: Function, schema: MorphioSchema): void {
    this.schemas.set(target, schema);
  }

  static getSchema(target: Function): MorphioSchema | undefined {
    return this.schemas.get(target);
  }

  static getOrCreate(target: Function, name?: string): MorphioSchema {
    let schema = this.getSchema(target);
    if (!schema) {
      schema = MorphioSchema.create(name ?? target.name);
      this.registerSchema(target, schema);
    }
    return schema;
  }
}
