/**
 * @packageDocumentation
 * @module GettingStarted
 */

/**
 * # Getting Started with Morphio
 *
 * ## Installation
 *
 * Install Morphio using npm:
 *
 * ```bash
 * npm install morphio
 * ```
 *
 * Or using yarn:
 *
 * ```bash
 * yarn add morphio
 * ```
 *
 * ## Basic Usage
 *
 * Here's a simple example of how to use Morphio:
 *
 * ```typescript
 * import { Serializable, JsonProp, serialize, deserialize } from 'morphio';
 *
 * @Serializable()
 * class User {
 *   @JsonProp({ type: 'string' })
 *   name: string;
 *
 *   @JsonProp({ type: 'number' })
 *   age: number;
 * }
 *
 * // Create and serialize an object
 * const user = new User();
 * user.name = "John Doe";
 * user.age = 30;
 *
 * const json = serialize(user);
 * console.log(json); // { "name": "John Doe", "age": 30 }
 *
 * // Deserialize back to an object
 * const deserialized = deserialize(json, User);
 * console.log(deserialized instanceof User); // true
 * console.log(deserialized.name); // "John Doe"
 * ```
 *
 * ## Key Concepts
 *
 * ### 1. Decorators
 *
 * - `@Serializable()`: Marks a class as serializable
 * - `@JsonProp()`: Defines property metadata for serialization
 *
 * ### 2. Core Functions
 *
 * - `serialize()`: Converts an object to a plain JavaScript object
 * - `deserialize()`: Creates an instance from a plain object
 *
 * ### 3. Property Types
 *
 * Supported types include:
 * - Primitive types (`string`, `number`, `boolean`)
 * - Date objects
 * - Arrays
 * - Maps
 * - Nested objects (other serializable classes)
 *
 * ## Next Steps
 *
 * - Learn about Core Concepts in the API documentation
 * - Check out the Examples section
 * - Read the Contributing guidelines if you want to help improve Morphio
 */
export const gettingStarted = 'This file is for documentation purposes only.';
