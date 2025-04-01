import { PropertyMetadata } from '../schema';

/**
 * A decorator function that adds metadata to a class property for transformation.
 *
 * This decorator collects property metadata in the class's context.metadata.properties Map,
 * which is later processed by the @MorphSchema decorator to build the complete class schema.
 *
 * The property type defaults to 'string' if not explicitly specified in the options.
 *
 * Example usage:
 * ```ts
 * @MorphSchema()
 * class User {
 *   @MorphProp({ type: 'string', required: true })
 *   name: string;
 *
 *   @MorphProp({ type: 'number', description: 'User age in years' })
 *   age?: number;
 * }
 * ```
 *
 * @param options - Property metadata configuration. See {@link PropertyMetadata} for details.
 * @returns A decorator function that collects property metadata
 */
export function MorphProp(options: PropertyMetadata) {
  return function (_: undefined, context: ClassFieldDecoratorContext) {
    const propertyKey = context.name as string;
    const propertyMetadata: PropertyMetadata = {
      type: options?.type || 'string',
      required: options?.required ?? true,
      description: options?.description,
    };

    if (context.metadata) {
      context.metadata.properties ??= new Map<string, PropertyMetadata>();
      (context.metadata.properties as Map<string, PropertyMetadata>).set(
        propertyKey,
        propertyMetadata
      );
    }
  };
}
