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

// Core serialization/deserialization functions
export * from './engine/serialize';
export * from './engine/deserialize';

// Decorators for class and property definitions
export * from './decorators/serializable.decorator';
export * from './decorators/json-prop.decorator';

// Types for property metadata
export {
  PropertyMetadata,
  PropertyType,
  ContainerType,
} from './decorators/PropertyMetadata';
