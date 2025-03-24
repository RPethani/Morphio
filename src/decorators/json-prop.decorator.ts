import {SchemaRegistry} from "../SchemaRegistry";

export function JsonProp(options: JsonPropOptions) {
  return function (target: any, propertyKey: string) {
    const schema = SchemaRegistry.getOrCreate(target);
    schema.addProperty(propertyKey, {
      type: options.type,
      required: options.required !== false, // Default to true if not specified
      description: options.description
    });
  };
}

interface JsonPropOptions {
  type: string;
  required?: boolean;
  description?: string;
}
