import { Constructor, PropertyMetadata } from './PropertyMetadata';

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
 *   extends: [vehicleSchema],
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
   * For polymorphic interfaces, specifies which property acts as the type discriminator.
   * This property's value will be used to determine which implementation to use during deserialization.
   *
   * Example:
   * ```typescript
   * interface Vehicle {
   *   type: 'car' | 'bike';  // discriminator property
   * }
   * discriminator = 'type'  // Property name that determines implementation
   * ```
   */
  discriminator?: string;

  /**
   * For interface implementations, specifies the value of the discriminator property
   * that identifies this specific implementation.
   *
   * Example:
   * ```typescript
   * interface Car extends Vehicle {
   *   type: 'car';  // Concrete value for Vehicle's type discriminator
   * }
   * discriminatorValue = 'car'  // Matches the 'type' property value
   * ```
   */
  discriminatorValue?: string;

  /**
   * For interface inheritance, list of parent schemas this schema extends from.
   * Properties from parent schemas are inherited by the implementing schema.
   *
   * Example:
   * ```typescript
   * interface Car extends Vehicle {
   *   doors: number;
   * }
   * extends = [vehicleSchema]  // Inherits Vehicle's properties
   * ```
   */
  extends?: MorphioSchema[];

  /** Names of interfaces that this schema implements */
  implementedInterfaces?: string[];

  /**
   * For interface types, specifies a concrete class implementation to always use.
   * This is an alternative to discriminator-based resolution.
   *
   * Example:
   * ```typescript
   * interface Config {
   *   settings: { [key: string]: any };
   * }
   *
   * class JsonConfig implements Config {
   *   settings = {};
   *   load() { ... }
   * }
   *
   * // Always use JsonConfig for Config properties
   * implementation = JsonConfig
   * ```
   */
  implementation?: Constructor;
}
