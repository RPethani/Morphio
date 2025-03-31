/**
 * @packageDocumentation
 * @module Examples.InlineObjects
 */

/**
 * # Inline Objects Examples
 *
 * This module demonstrates how to use Morphio with inline object types.
 * Inline objects allow you to define nested structures without creating separate classes.
 *
 * ## Simple Inline Objects
 *
 * ```typescript
 * @Serializable()
 * class UserProfile {
 *   @JsonProp({ type: 'string' })
 *   name: string;
 *
 *   @JsonProp({
 *     type: {
 *       properties: {
 *         street: { type: 'string', required: true },
 *         city: { type: 'string', required: true },
 *         country: { type: 'string', required: true }
 *       }
 *     }
 *   })
 *   address: {
 *     street: string;
 *     city: string;
 *     country: string;
 *   };
 * }
 * ```
 *
 * ## Nested Inline Objects
 *
 * ```typescript
 * @Serializable()
 * class BlogPost {
 *   @JsonProp({ type: 'string' })
 *   title: string;
 *
 *   @JsonProp({
 *     type: {
 *       properties: {
 *         name: { type: 'string', required: true },
 *         contact: {
 *           type: {
 *             properties: {
 *               email: { type: 'string', required: true },
 *               phone: { type: 'string' }
 *             }
 *           }
 *         }
 *       }
 *     }
 *   })
 *   author: {
 *     name: string;
 *     contact: {
 *       email: string;
 *       phone?: string;
 *     };
 *   };
 * }
 * ```
 *
 * ## Inline Objects in Containers
 *
 * ```typescript
 * @Serializable()
 * class TravelMap {
 *   @JsonProp({
 *     type: {
 *       container: 'map',
 *       itemType: {
 *         properties: {
 *           latitude: { type: 'number', required: true },
 *           longitude: { type: 'number', required: true },
 *           name: { type: 'string', required: true }
 *         }
 *       }
 *     }
 *   })
 *   locations: Map<
 *     string,
 *     {
 *       latitude: number;
 *       longitude: number;
 *       name: string;
 *     }
 *   > = new Map();
 * }
 * ```
 *
 * ## Usage Examples
 *
 * ```typescript
 * // Simple inline object
 * const profile = new UserProfile();
 * profile.name = "John Doe";
 * profile.address = {
 *   street: "123 Main St",
 *   city: "New York",
 *   country: "USA"
 * };
 *
 * // Nested inline object
 * const post = new BlogPost();
 * post.title = "Understanding TypeScript";
 * post.author = {
 *   name: "John Doe",
 *   contact: {
 *     email: "john@example.com",
 *     phone: "+1-555-0123"
 *   }
 * };
 *
 * // Inline objects in container
 * const travel = new TravelMap();
 * travel.locations.set("nyc", {
 *   latitude: 40.7128,
 *   longitude: -74.0060,
 *   name: "New York City"
 * });
 *
 * // Serialize
 * const profileJson = serialize(profile);
 * const postJson = serialize(post);
 * const travelJson = serialize(travel);
 *
 * // Deserialize
 * const profileObj = deserialize(profileJson, UserProfile);
 * const postObj = deserialize(postJson, BlogPost);
 * const travelObj = deserialize(travelJson, TravelMap);
 * ```
 */
export const examples = 'This file contains documentation examples.';
