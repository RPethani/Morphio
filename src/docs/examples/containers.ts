/**
 * @packageDocumentation
 * @module Examples.Containers
 */

/**
 * # Container Types Examples
 *
 * This module demonstrates how to use Morphio with container types like arrays and maps.
 *
 * ## Arrays
 *
 * ### Simple Arrays
 *
 * ```typescript
 * @Serializable()
 * class ArrayExample {
 *   @JsonProp({
 *     type: {
 *       container: 'array',
 *       itemType: 'string'
 *     }
 *   })
 *   tags: string[] = [];
 *
 *   @JsonProp({
 *     type: {
 *       container: 'array',
 *       itemType: 'number'
 *     }
 *   })
 *   scores: number[] = [];
 * }
 * ```
 *
 * ### Nested Arrays
 *
 * ```typescript
 * @Serializable()
 * class NestedArrayExample {
 *   @JsonProp({
 *     type: {
 *       container: 'array',
 *       itemType: {
 *         container: 'array',
 *         itemType: 'number'
 *       }
 *     }
 *   })
 *   matrix: number[][] = [];
 * }
 * ```
 *
 * ## Maps
 *
 * ### Simple Maps
 *
 * ```typescript
 * @Serializable()
 * class MapExample {
 *   @JsonProp({
 *     type: {
 *       container: 'map',
 *       itemType: 'string'
 *     }
 *   })
 *   metadata: Map<string, string> = new Map();
 *
 *   @JsonProp({
 *     type: {
 *       container: 'map',
 *       itemType: 'number'
 *     }
 *   })
 *   scores: Map<string, number> = new Map();
 * }
 * ```
 *
 * ### Maps with Complex Values
 *
 * ```typescript
 * @Serializable()
 * class User {
 *   @JsonProp({ type: 'string' })
 *   name: string;
 * }
 *
 * @Serializable()
 * class ComplexMapExample {
 *   @JsonProp({
 *     type: {
 *       container: 'map',
 *       itemType: User
 *     }
 *   })
 *   users: Map<string, User> = new Map();
 * }
 * ```
 *
 * ## Usage Examples
 *
 * ```typescript
 * // Arrays
 * const arr = new ArrayExample();
 * arr.tags = ['typescript', 'serialization'];
 * arr.scores = [95, 87, 92];
 *
 * const nested = new NestedArrayExample();
 * nested.matrix = [
 *   [1, 2, 3],
 *   [4, 5, 6]
 * ];
 *
 * // Maps
 * const map = new MapExample();
 * map.metadata.set('version', '1.0.0');
 * map.scores.set('math', 95);
 * map.scores.set('science', 87);
 *
 * const complexMap = new ComplexMapExample();
 * const user = new User();
 * user.name = 'John Doe';
 * complexMap.users.set('john', user);
 *
 * // Serialize
 * const arrJson = serialize(arr);
 * const nestedJson = serialize(nested);
 * const mapJson = serialize(map);
 * const complexMapJson = serialize(complexMap);
 *
 * // Deserialize
 * const arrObj = deserialize(arrJson, ArrayExample);
 * const nestedObj = deserialize(nestedJson, NestedArrayExample);
 * const mapObj = deserialize(mapJson, MapExample);
 * const complexMapObj = deserialize(complexMapJson, ComplexMapExample);
 * ```
 */
export const examples = 'This file contains documentation examples.';
