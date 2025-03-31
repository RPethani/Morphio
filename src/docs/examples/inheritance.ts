/**
 * @packageDocumentation
 * @module Examples.Inheritance
 */

/**
 * # Inheritance Examples
 *
 * This module demonstrates how to use Morphio with class inheritance.
 *
 * ## Basic Inheritance
 *
 * ```typescript
 * @Serializable()
 * class BaseEntity {
 *   @JsonProp({ type: 'string', required: true })
 *   id: string;
 *
 *   @JsonProp({ type: 'Date' })
 *   createdAt: Date = new Date();
 * }
 *
 * @Serializable()
 * class User extends BaseEntity {
 *   @JsonProp({ type: 'string', required: true })
 *   name: string;
 *
 *   @JsonProp({ type: 'string' })
 *   email?: string;
 * }
 * ```
 *
 * ## Multi-level Inheritance
 *
 * ```typescript
 * @Serializable()
 * class Animal {
 *   @JsonProp({ type: 'string', required: true })
 *   species: string;
 * }
 *
 * @Serializable()
 * class Pet extends Animal {
 *   @JsonProp({ type: 'string', required: true })
 *   name: string;
 *
 *   @JsonProp({ type: 'Date' })
 *   birthDate?: Date;
 * }
 *
 * @Serializable()
 * class Dog extends Pet {
 *   @JsonProp({ type: 'string' })
 *   breed: string;
 *
 *   @JsonProp({
 *     type: {
 *       container: 'array',
 *       itemType: 'string'
 *     }
 *   })
 *   tricks: string[] = [];
 * }
 * ```
 *
 * ## Interface Inheritance
 *
 * ```typescript
 * interface IEntity {
 *   id: string;
 *   createdAt: Date;
 * }
 *
 * interface INamedEntity extends IEntity {
 *   name: string;
 * }
 *
 * morphioSchema<IEntity>('Entity', {
 *   id: { type: 'string', required: true },
 *   createdAt: { type: 'Date' }
 * });
 *
 * morphioSchema<INamedEntity>('NamedEntity', {
 *   id: { type: 'string', required: true },
 *   createdAt: { type: 'Date' },
 *   name: { type: 'string', required: true }
 * });
 * ```
 *
 * ## Usage Examples
 *
 * ```typescript
 * // Class inheritance
 * const user = new User();
 * user.id = "123";
 * user.name = "John Doe";
 * user.email = "john@example.com";
 *
 * const dog = new Dog();
 * dog.species = "Canis lupus familiaris";
 * dog.name = "Rex";
 * dog.breed = "German Shepherd";
 * dog.tricks = ["sit", "stay", "fetch"];
 *
 * // Interface inheritance
 * const entity = {
 *   id: "456",
 *   createdAt: new Date()
 * };
 *
 * const namedEntity = {
 *   id: "789",
 *   createdAt: new Date(),
 *   name: "Test Entity"
 * };
 *
 * // Serialize
 * const userJson = serialize(user);
 * const dogJson = serialize(dog);
 * const entityJson = serialize(entity);
 * const namedEntityJson = serialize(namedEntity);
 *
 * // Deserialize
 * const userObj = deserialize(userJson, User);
 * const dogObj = deserialize(dogJson, Dog);
 * const entityObj = deserialize<IEntity>(entityJson, 'Entity');
 * const namedEntityObj = deserialize<INamedEntity>(namedEntityJson, 'NamedEntity');
 * ```
 */
export const examples = 'This file contains documentation examples.';
