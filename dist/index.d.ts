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
type Constructor<T = any> = new () => T;
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
interface InterfaceType {
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
type ObjectType = Constructor | InterfaceType;
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
type TypeIdentifier = ObjectType | string;
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
interface ContainerType {
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
 * Represents an inline object type with its property definitions.
 * Used for objects that are defined directly in a schema without a separate class or interface.
 *
 * @example
 * ```ts
 * // Inline object type for an address
 * const addressType: InlineObjectType = {
 *   properties: {
 *     street: { type: 'string', required: true },
 *     city: { type: 'string', required: true },
 *     country: { type: 'string', required: true }
 *   }
 * };
 * ```
 */
interface InlineObjectType {
    properties: Record<string, PropertyMetadata>;
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
type PropertyType = TypeIdentifier | ContainerType | InlineObjectType;
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
interface PropertyMetadata {
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
interface MorphioSchema {
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

/**
 * Operations for managing MorphioSchema instances.
 * These operations replace the previous class-based methods with pure functions.
 */
declare const SchemaOps: {
    /**
     * Creates a new MorphioSchema instance
     *
     * @param name - The name of the schema (usually the class or interface name)
     * @param options - Optional schema configuration
     * @returns A new MorphioSchema instance
     */
    create(name: string, options?: {
        isInterface?: boolean;
    }): MorphioSchema;
    /**
     * Sets the name of a schema
     *
     * @param schema - The schema to modify
     * @param name - The new name to set
     */
    setName(schema: MorphioSchema, name: string): void;
    /**
     * Adds a property to the schema
     *
     * @param schema - The schema to modify
     * @param key - The property key
     * @param meta - The property metadata
     */
    addProperty(schema: MorphioSchema, key: string, meta: PropertyMetadata): void;
    /**
     * Gets all properties for a schema, including inherited ones.
     * Properties from parent schemas are included first, then overridden by own properties.
     *
     * @param schema - The schema to get properties for
     * @returns Map of all property names to their metadata
     */
    getProperties(schema: MorphioSchema): Map<string, PropertyMetadata>;
};
/**
 * Creates and registers a schema for an interface or class.
 *
 * @example
 * ```typescript
 * interface Person {
 *   name: string;
 *   age: number;
 * }
 *
 * // Using interface name
 * morphioSchema({ interface: 'Person' }, {
 *   name: { type: 'string', required: true },
 *   age: { type: 'number', required: true }
 * });
 *
 * // Using class constructor with inheritance
 * morphioSchema(Employee, {
 *   salary: { type: 'number', required: true }
 * }, [Person]);
 *
 * // Using interface with inheritance
 * morphioSchema({ interface: 'Admin' }, {
 *   permissions: { type: 'string', required: true }
 * }, [{ interface: 'Employee' }]);
 * ```
 *
 * @param type - The class constructor or interface type
 * @param properties - Map of property names to their metadata
 * @param parentTypes - Optional array of types this schema extends from
 * @returns The created and registered schema
 */
declare function morphioSchema(type: ObjectType, properties: Record<string, PropertyMetadata>, parentTypes?: TypeIdentifier[]): MorphioSchema;

/**
 * A registry that maintains the mapping between types (classes/interfaces) and their schemas.
 */
declare class SchemaRegistry {
    /**
     * Map of type constructors or interface names to their schemas
     * @private
     */
    private static schemas;
    /**
     * Registers a schema for a type
     *
     * @param target - The class constructor or interface name
     * @param schema - The schema to register
     */
    static registerSchema(target: TypeIdentifier, schema: MorphioSchema): void;
    /**
     * Gets or creates a schema for a type
     *
     * @param target - The class constructor or interface name
     * @returns The schema for the type
     */
    static getOrCreate(target: TypeIdentifier): MorphioSchema;
    /**
     * Gets a schema for a type if it exists
     *
     * @param target - The class constructor or interface name
     * @returns The schema for the type or undefined if not found
     */
    static getSchema(target: TypeIdentifier): MorphioSchema | undefined;
    /**
     * Converts a TypeIdentifier into a string key for the schema registry.
     *
     * This conversion is necessary because when using objects as Map keys, JavaScript compares them by reference.
     * For example:
     * ```typescript
     * const map = new Map();
     * map.set({ interface: 'Animal' }, schema);
     *
     * // This will return undefined because it's a different object reference
     * map.get({ interface: 'Animal' });
     *
     * // Using string keys solves this:
     * map.set('Interface:Animal', schema);
     * map.get('Interface:Animal'); // Works correctly
     * ```
     *
     * For class constructors we can use them directly as keys since they are already unique references.
     *
     * @param target - The type identifier to convert to a map key
     * @returns A string key for interface types, or the constructor reference for class types
     * @private
     */
    private static getTypeKey;
}

/**
 * Serializes an instance of a class into a plain object.
 *
 * The `serialize` function is responsible for converting an instance of a class into a plain
 * JavaScript object, based on the schema associated with that class. It respects the metadata
 * defined by the `@JsonProp` decorator and handles nested objects, arrays, and maps.
 *
 * This function supports forgiving serialization, meaning that properties without explicit
 * metadata will be included in the serialized output.
 *
 * @param input The instance to serialize. It must be an instance of a class.
 * @param objectType The type of the object to serialize.
 * @returns The serialized object.
 *
 * @example
 * ```ts
 * const user = new User("John", "john@example.com");
 * const serialized = serialize(user);
 * console.log(serialized); // { name: "John", email: "john@example.com" }
 * ```
 */
declare function serialize(input: any, objectType?: ObjectType): object;

/**
 * Deserializes a JSON string or object into an instance of the given type.
 *
 * @param input The input data to deserialize. It can be a JSON string or an object.
 * @param type The class constructor or interface name to deserialize the input into.
 * @returns {T} The deserialized instance of the specified type.
 */
declare function deserialize<T>(input: string | object, type: Constructor<T> | InterfaceType): T;

/**
 * A decorator function that adds metadata to a class property for serialization/deserialization.
 *
 * This decorator collects property metadata in the class's context.metadata.properties Map,
 * which is later processed by the @Serializable decorator to build the complete class schema.
 *
 * The property type defaults to 'string' if not explicitly specified in the options.
 *
 * Example usage:
 * ```ts
 * @Serializable()
 * class User {
 *   @JsonProp({ type: 'string', required: true })
 *   name: string;
 *
 *   @JsonProp({ type: 'number', description: 'User age in years' })
 *   age?: number;
 * }
 * ```
 *
 * @param options - Property metadata configuration. See {@link PropertyMetadata} for details.
 * @returns A decorator function that collects property metadata
 */
declare function JsonProp(options: PropertyMetadata): (_: undefined, context: ClassFieldDecoratorContext) => void;

/**
 * A decorator to mark a class as serializable and process its property metadata.
 *
 * This decorator performs two main functions:
 * 1. Registers a schema for the class in the SchemaRegistry
 * 2. Processes all property metadata collected by @JsonProp decorators
 *
 * The decorator looks for a Map of property metadata in context.metadata.properties,
 * which is populated by the @JsonProp decorators. It then registers each property
 * with the class schema.
 *
 * Example usage:
 * ```ts
 * @Serializable({ name: 'CustomUser' })
 * class User {
 *   @JsonProp({ type: 'string', required: true })
 *   name: string;
 *
 *   @JsonProp({ type: 'number', description: 'User age' })
 *   age?: number;
 * }
 * ```
 *
 * @param options - Configuration options
 * @returns A decorator function that processes class and property metadata
 */
declare function Serializable(options?: SerializableOptions): (target: new () => any, context: ClassDecoratorContext) => void;
/**
 * Options for configuring the `Serializable` decorator.
 *
 * The `SerializableOptions` interface allows you to customize the name of the schema for
 * a class that is marked as serializable. If the `name` is not provided, the class's
 * constructor name will be used as the default name.
 */
interface SerializableOptions {
    name?: string;
}

export { type ContainerType, JsonProp, type MorphioSchema, type PropertyMetadata, type PropertyType, SchemaOps, SchemaRegistry, Serializable, deserialize, morphioSchema, serialize };
