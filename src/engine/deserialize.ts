// src/engine/deserialize.ts
import { SchemaRegistry } from '../SchemaRegistry';
import { MorphioSchema } from '../MorphioSchema';

export function deserialize<T>(input: string | object, classType: new () => T): T {
  const json = typeof input === 'string' ? JSON.parse(input) : input;
  const instance = Object.create(classType.prototype) as Record<string, any>;
  const schema: MorphioSchema | undefined = SchemaRegistry.getSchema(classType);

  for (const key of Object.keys(json)) {
    const value = (json as Record<string, any>)[key];

    // Check if the property has schema metadata
    const meta = schema?.getProperties().get(key);

    if (meta) {
      // Explicitly defined via @JsonProp
      if (value === undefined || value === null) {
        if (meta.required) throw new Error(`Missing required property: ${key}`);
        continue;
      }

      const nestedSchema = typeof meta.type === 'function' ? SchemaRegistry.getSchema(meta.type) : undefined;

      if (meta.container === 'array' && Array.isArray(value)) {
        instance[key] = meta.valueType
          ? value.map(item => {
              const itemSchema = typeof meta.valueType === 'function' ? SchemaRegistry.getSchema(meta.valueType) : undefined;
              if (itemSchema) {
                return deserialize(item, meta.valueType as new () => any);
              }
              return coerceType(item, meta.valueType!);
            })
          : value;
      } else if (meta.container === 'map' && value && typeof value === 'object') {
        const map = new Map();
        for (const [k, v] of Object.entries(value)) {
          const valueSchema = typeof meta.valueType === 'function' ? SchemaRegistry.getSchema(meta.valueType) : undefined;
          const item = meta.valueType
            ? valueSchema
              ? deserialize(v as string | object, meta.valueType as new () => any)
              : coerceType(v, meta.valueType)
            : v;
          map.set(k, item);
        }
        instance[key] = map;
      } else if (nestedSchema && typeof meta.type === 'function') {
        instance[key] = deserialize(value as string | object, meta.type as new () => any);
      } else {
        instance[key] = coerceType(value, meta.type);
      }
    } else {
      // Forgiving fallback: no @JsonProp, just assign inferred type
      instance[key] = value;
    }
  }

  return instance as T;
}

function coerceType(value: any, type: string | Function): any {
  const targetType = typeof type === 'string' ? type : typeof type();
  switch (targetType) {
    case 'number': return Number(value);
    case 'string': return String(value);
    case 'boolean': return Boolean(value);
    default: return value;
  }
}
