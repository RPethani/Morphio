/**
 * Morphio - A TypeScript library for JSON serialization and deserialization.
 *
 * This library provides a set of decorators and utilities for converting JSON data
 * to and from TypeScript classes. It supports complex types, nested objects, arrays,
 * maps, and custom type definitions through metadata.
 *
 * Key features:
 * - `@Serializable()` decorator for marking classes as serializable
 * - `@JsonProp()` decorator for defining property metadata
 * - Support for nested objects, arrays, and maps
 * - Type-safe serialization and deserialization
 * - Schema registry for managing class metadata
 *
 * @module morphio
 */

// Core exports
export { serialize } from './engine/serialize';
export { deserialize } from './engine/deserialize';

// Decorators
export { JsonProp } from './decorators/json-prop.decorator';
export { Serializable } from './decorators/serializable.decorator';

// Types
export {
  MorphioSchema,
  PropertyMetadata,
  PropertyType,
  ContainerType,
  SchemaRegistry,
  SchemaOps,
} from './schema';
