/**
 * Morphio - A TypeScript library for JSON serialization and deserialization.
 *
 * This library provides a set of decorators and utilities for converting JSON data
 * to and from TypeScript classes. It supports complex types, nested objects, arrays,
 * maps, and custom type definitions through metadata.
 *
 * Key features:
 * - `@MorphSchema()` decorator for defining class schemas
 * - `@MorphProp()` decorator for defining property metadata
 * - Support for nested objects, arrays, and maps
 * - Type-safe serialization and deserialization
 * - Schema registry for managing class metadata
 *
 * @module morphio
 */

import './polyfills/symbol-metadata-polyfill';

// Core exports
export { serialize } from './engine/serialize';
export { deserialize } from './engine/deserialize';

// Decorators
export { MorphProp } from './decorators/morph-prop.decorator';
export { MorphSchema } from './decorators/morph-schema.decorator';

// Schema operations
export { morphioSchema } from './schema/operations/SchemaOps';

// Types
export {
  MorphioSchema,
  PropertyMetadata,
  PropertyType,
  ContainerType,
  SchemaRegistry,
  SchemaOps,
} from './schema';
