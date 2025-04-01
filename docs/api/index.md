# morphio

Morphio - A TypeScript library for JSON serialization and deserialization.

This library provides a set of decorators and utilities for converting JSON data
to and from TypeScript classes. It supports complex types, nested objects, arrays,
maps, and custom type definitions through metadata.

Key features:
- `@Serializable()` decorator for marking classes as serializable
- `@JsonProp()` decorator for defining property metadata
- Support for nested objects, arrays, and maps
- Type-safe serialization and deserialization
- Schema registry for managing class metadata

## Classes

- [SchemaRegistry](classes/SchemaRegistry.md)

## Interfaces

- [ContainerType](interfaces/ContainerType.md)
- [MorphioSchema](interfaces/MorphioSchema.md)
- [PropertyMetadata](interfaces/PropertyMetadata.md)

## Type Aliases

- [PropertyType](type-aliases/PropertyType.md)

## Variables

- [SchemaOps](variables/SchemaOps.md)

## Functions

- [deserialize](functions/deserialize.md)
- [JsonProp](functions/JsonProp.md)
- [morphioSchema](functions/morphioSchema.md)
- [Serializable](functions/Serializable.md)
- [serialize](functions/serialize.md)
