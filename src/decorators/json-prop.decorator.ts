import { PropertyMetadata, SchemaRegistry, SchemaOps } from '../schema';

/**
 * A decorator function that adds metadata to a class property.
 *
 * This decorator is used to define the schema for a property in a class that will be
 * serialized or deserialized using the Morphio library. It allows the user to specify
 * the type, whether the property is required, and other options such as the property's
 * description, container type, and value type for collections like arrays and maps.
 *
 * Example usage:
 * ```ts
 * @JsonProp({ type: 'string', required: true })
 * name: string;
 * ```
 *
 * @param options - The options for configuring the property metadata.
 * @returns A decorator function that applies the metadata to the target property.
 */
export function JsonProp(options: PropertyMetadata) {
  return function (target: any, propertyKey: string): void {
    const schema = SchemaRegistry.getOrCreate(target.constructor);

    // Add property metadata to the schema
    SchemaOps.addProperty(schema, propertyKey.toString(), {
      type: options?.type || Reflect.getMetadata('design:type', target, propertyKey),
      required: options?.required ?? true,
      description: options?.description
    });
  };
}
