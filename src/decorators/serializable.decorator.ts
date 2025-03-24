import 'reflect-metadata';
import {SchemaRegistry} from "../SchemaRegistry";


export function Serializable(options?: SerializableOptions) {
  return function (constructor: Function) {
    const schema = SchemaRegistry.getOrCreate(constructor);
    schema.setName(options?.name || constructor.name);
  };
}

export interface SerializableOptions {
  name?: string;
}
