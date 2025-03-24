// src/engine/serialize.ts
import { SchemaRegistry } from '../SchemaRegistry';

export function serialize(input: any): any {
  if (input === null || typeof input !== 'object') return input;

  const schema = SchemaRegistry.getSchema(input.constructor);
  const result: Record<string, any> = {};

  if (schema && schema.getProperties().size > 0) {
    for (const [key, meta] of schema.getProperties()) {
      const value = input[key];
      if (value === undefined || value === null) continue;

      const isTypeFunction = typeof meta.type === 'function';
      const nestedSchema = isTypeFunction && meta.type ? SchemaRegistry.getSchema(meta.type as unknown as Function) : undefined;

      // Handle array serialization
      if (meta.container === 'array' && Array.isArray(value)) {
        result[key] = meta.valueType
          ? value.map((item) => {
            const itemSchema = typeof meta.valueType === 'function' ? SchemaRegistry.getSchema(meta.valueType) : undefined;
            return itemSchema ? serialize(item) : item;
          })
          : value;
      }
      // Handle map serialization (convert to plain object)
      else if (meta.container === 'map' && value instanceof Map) {
        const serializedMap: Record<string, any> = {};
        // Iterate over map entries and convert them to a plain object
        for (const [mapKey, mapValue] of value.entries()) {
          const itemSchema = typeof meta.valueType === 'function' ? SchemaRegistry.getSchema(meta.valueType) : undefined;
          // Convert Map entry to plain object
          serializedMap[String(mapKey)] = itemSchema ? serialize(mapValue) : mapValue;
        }
        result[key] = serializedMap;  // Convert Map to plain object here
      }
      // Handle nested objects
      else if (nestedSchema && isTypeFunction) {
        result[key] = serialize(value);
      } else {
        result[key] = value;
      }
    }
  } else {
    // Forgiving fallback: copy all own properties
    for (const key of Object.keys(input)) {
      const value = input[key];
      if (value === undefined || value === null) continue;
      result[key] = value;
    }
  }

  return result;
}
