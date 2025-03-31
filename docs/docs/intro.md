---
sidebar_position: 1
---

# Introduction

Welcome to Morphio! A powerful TypeScript library for type-safe serialization and deserialization.

## What is Morphio?

Morphio is a TypeScript library that provides type-safe serialization and deserialization between TypeScript classes and JSON objects. It offers:

- **Type Safety**: Full TypeScript support with compile-time type checking
- **Decorators**: Simple and intuitive decorator-based API
- **Complex Types**: Support for nested objects, arrays, maps, and custom types
- **Flexibility**: Extensible architecture for custom type handling
- **Performance**: Optimized for both runtime performance and bundle size

## Key Features

### Type-Safe Serialization
Convert your TypeScript classes to JSON while preserving type information:

```typescript
@Serializable()
class User {
  @JsonProp()
  name: string;
}
```

### Complex Type Support
Handle nested objects, arrays, maps, and custom types with ease:

```typescript
@Serializable()
class Team {
  @JsonProp()
  members: User[];

  @JsonProp()
  metadata: Map<string, any>;
}
```

### Custom Type Handling
Extend Morphio's functionality with custom type processors:

```typescript
@Serializable()
class Config {
  @JsonProp({ processor: CustomDateProcessor })
  createdAt: Date;
}
```

## Getting Started

Ready to begin? Check out our [Getting Started](getting-started.md) guide!
