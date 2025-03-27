import { PropertyMetadata } from './PropertyMetadata';

/**
 * Represents the schema for an object in Morphio.
 * The schema contains metadata about the properties of the object and helps with serialization/deserialization.
 *
 * A `MorphioSchema` can represent either a class or an interface, tracking their properties, types,
 * and other metadata that guides serialization.
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
   * Whether this schema represents an interface (true) or a class (false/undefined)
   */
  isInterface?: boolean;

  /**
   * For polymorphic interfaces, specifies which property acts as the type discriminator
   */
  discriminator?: string;

  /**
   * For interface inheritance, list of parent schemas this schema extends from
   */
  extends?: MorphioSchema[];
}
