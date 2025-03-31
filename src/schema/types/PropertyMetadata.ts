/**
 * Represents a constructor type that can create instances of a class.
 *
 * @template T - The type of object the constructor creates
 * @example
 * ```ts
 * class User {
 *   name: string;
 * }
 * const ctor: Constructor<User> = User;
 * ```
 */
export type Constructor<T = any> = new () => T;

/**
 * Represents an interface type in the schema system.
 * Used to reference interfaces by their registered name.
 *
 * @example
 * ```ts
 * const userInterface: InterfaceType = {
 *   interface: 'UserProfile'
 * };
 * ```
 */
export interface InterfaceType {
  /**
   * The name of the registered interface schema
   */
  interface: string;
}

/**
 * Represents an object type, which can be either a constructor or an interface type.
 * This is used as a base type for complex objects in the schema system.
 *
 * @example
 * ```ts
 * // Constructor type
 * const userType: ObjectType = User;
 *
 * // Interface type
 * const userInterface: ObjectType = {
 *   interface: 'UserProfile'
 * };
 * ```
 */
export type ObjectType = Constructor | InterfaceType;

/**
 * Represents a type identifier that can be either a constructor, interface, or primitive type name.
 * This is used as a base type for all possible type references in the schema system.
 *
 * @example
 * ```ts
 * // Primitive type
 * const strType: TypeIdentifier = 'string';
 *
 * // Object type (constructor)
 * const userType: TypeIdentifier = User;
 *
 * // Object type (interface)
 * const profileType: TypeIdentifier = { interface: 'UserProfile' };
 * ```
 */
export type TypeIdentifier = ObjectType | string;

/**
 * Represents a container type (Array or Map) with its element type information.
 * Used for nested data structures that can contain other types.
 *
 * @example
 * ```ts
 * // Array of strings
 * const arrayType: ContainerType = {
 *   container: 'array',
 *   itemType: 'string'
 * };
 *
 * // Map of string to User
 * const mapType: ContainerType = {
 *   container: 'map',
 *   itemType: User
 * };
 * ```
 */
export interface ContainerType {
  /**
   * The type of container ('array' or 'map').
   * - 'array': For Array-like collections
   * - 'map': For Map-like collections with string keys
   */
  container: 'array' | 'map';

  /**
   * The type of items in the container.
   * For arrays, represents the element type.
   * For maps, represents the value type (keys are always strings).
   * Can be recursive (e.g., array of arrays).
   */
  itemType: PropertyType;
}

/**
 * Represents a type that can be used in property metadata.
 * This is the main type used for defining property types in schemas.
 * Can represent any valid type in the schema system.
 *
 * @example
 * ```ts
 * // Primitive type
 * const strType: PropertyType = 'string';
 *
 * // Class constructor
 * const userType: PropertyType = User;
 *
 * // Interface type
 * const profileType: PropertyType = { interface: 'UserProfile' };
 *
 * // Container type (array)
 * const arrayType: PropertyType = { container: 'array', itemType: 'string' };
 * ```
 */
export type PropertyType = TypeIdentifier | ContainerType;

/**
 * Metadata for a property used in serialization and deserialization.
 * Defines how a property should be processed during data transformation.
 * This is the main interface used for defining schema properties.
 *
 * @example
 * ```ts
 * // Required string property
 * const nameMetadata: PropertyMetadata = {
 *   type: 'string',
 *   required: true,
 *   description: 'User\'s full name'
 * };
 *
 * // Optional array property
 * const tagsMetadata: PropertyMetadata = {
 *   type: { container: 'array', itemType: 'string' },
 *   required: false,
 *   description: 'List of user tags'
 * };
 * ```
 */
export interface PropertyMetadata {
  /**
   * The type of the property. Can be one of:
   * - Primitive type ('string', 'number', 'boolean', 'Date')
   * - Class constructor (for class instances)
   * - Interface name (for registered interfaces)
   * - Container type (for arrays and maps)
   */
  type: PropertyType;

  /**
   * Whether the property is required during serialization/deserialization.
   * - true: Property must be present (default)
   * - false: Property is optional
   *
   * @default true
   */
  required?: boolean;

  /**
   * Optional description of the property.
   * Used for documentation and schema generation.
   */
  description?: string;
}

/**
 * Helper functions to identify property types in the schema system.
 */

/**
 * Checks if the given property type is a container type (Array or Map).
 *
 * @param type - The property type to check
 * @returns True if the type is a container type, false otherwise
 *
 * @example
 * ```ts
 * isContainerType('string') // false
 * isContainerType({ container: 'array', itemType: 'string' }) // true
 * isContainerType({ interface: 'User' }) // false
 * ```
 */
export function isContainerType(type: PropertyType): type is ContainerType {
  return typeof type === 'object' && 'container' in type;
}

/**
 * Checks if the given property type is an interface type.
 *
 * @param type - The property type to check
 * @returns True if the type is an interface type, false otherwise
 *
 * @example
 * ```ts
 * isInterfaceType('string') // false
 * isInterfaceType({ interface: 'User' }) // true
 * isInterfaceType({ container: 'array', itemType: 'string' }) // false
 * ```
 */
export function isInterfaceType(type: PropertyType): type is InterfaceType {
  return typeof type === 'object' && 'interface' in type;
}

/**
 * Checks if the given property type is a constructor type.
 *
 * @param type - The property type to check
 * @returns True if the type is a constructor type, false otherwise
 *
 * @example
 * ```ts
 * class User {}
 * isConstructorType('string') // false
 * isConstructorType(User) // true
 * isConstructorType({ interface: 'User' }) // false
 * ```
 */
export function isConstructorType(type: PropertyType): type is Constructor {
  return typeof type === 'function';
}

/**
 * Checks if the given property type is a primitive type.
 * Primitive types are string literals representing basic types
 * like 'string', 'number', 'boolean', 'Date', etc.
 *
 * @param type - The property type to check
 * @returns True if the type is a primitive type, false otherwise
 *
 * @example
 * ```ts
 * isPrimitiveType('string') // true
 * isPrimitiveType('number') // true
 * isPrimitiveType({ interface: 'User' }) // false
 * isPrimitiveType(User) // false
 * ```
 */
export function isPrimitiveType(type: PropertyType): type is string {
  return typeof type === 'string';
}

/**
 * Checks if the given property type is an object type.
 * Object types are either constructors or interface types.
 *
 * @param type - The property type to check
 * @returns True if the type is an object type (Constructor or InterfaceType), false otherwise
 *
 * @example
 * ```ts
 * class User {}
 * isObjectType('string') // false
 * isObjectType(User) // true
 * isObjectType({ interface: 'User' }) // true
 * isObjectType({ container: 'array', itemType: 'string' }) // false
 * ```
 */
export function isObjectType(type: PropertyType): type is ObjectType {
  return isConstructorType(type) || isInterfaceType(type);
}
