import { PropertyMetadata, TypeIdentifier } from './PropertyMetadata';

/**
 * Represents the schema for an object in Morphio.
 * The schema contains metadata about the properties of the object and helps with serialization/deserialization.
 *
 * A `MorphioSchema` can represent either a class or an interface, tracking their properties, types,
 * and other metadata that guides serialization.
 *
 * Example of interface schema:
 * ```typescript
 * interface Vehicle {
 *   type: 'car' | 'bike';  // discriminator property
 *   brand: string;
 * }
 *
 * // Schema for Vehicle interface
 * {
 *   name: 'Vehicle',
 *   isInterface: true,
 *   discriminator: 'type',
 *   properties: new Map([
 *     ['type', { type: 'string', required: true }],
 *     ['brand', { type: 'string', required: true }]
 *   ])
 * }
 * ```
 *
 * Example of implementation schema:
 * ```typescript
 * interface Car extends Vehicle {
 *   type: 'car';
 *   doors: number;
 * }
 *
 * // Schema for Car implementation
 * {
 *   name: 'Car',
 *   isInterface: false,
 *   extends: ['Vehicle'],
 *   discriminatorValue: 'car',
 *   properties: new Map([
 *     ['doors', { type: 'number', required: true }]
 *   ])
 * }
 * ```
 */
export interface MorphioSchema {
  /**
   * The name of the schema (class or interface name)
   */
  name: string;

  /**
   * A map holding the metadata of properties defined in this schema.
   * The map's keys are property names, and the values are the metadata describing each property.
   */
  properties: Map<string, PropertyMetadata>;

  /**
   * Whether this schema represents an interface (true) or a class (false/undefined).
   *
   * When true:
   * - The schema represents an interface that may have multiple implementations
   * - The discriminator property is used to determine the concrete type
   * - Properties from extended interfaces are inherited
   */
  isInterface?: boolean;

  /**
   * For interface inheritance, list of parent type identifiers this schema extends from.
   * Properties from parent schemas are inherited by the implementing schema.
   *
   * Example:
   * ```typescript
   * interface Car extends Vehicle {
   *   doors: number;
   * }
   * extends = ['Vehicle']  // References Vehicle's type identifier
   * ```
   */
  extends?: TypeIdentifier[];
}
