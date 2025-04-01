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
- **Flexibility**: Support for both class-based and interface-based serialization
- **Performance**: Optimized for both runtime performance and bundle size

## Key Features

### Type-Safe Serialization
Convert your TypeScript classes to JSON while preserving type information:

```typescript
@Serializable()
class User {
  @JsonProp({ type: 'string' })
  name!: string;

  @JsonProp({ type: 'number' })
  age!: number;
}
```

### Complex Type Support
Handle nested objects, arrays, and maps with ease:

```typescript
@Serializable()
class Team {
  @JsonProp({ type: { container: 'array', itemType: User } })
  members!: User[];

  @JsonProp({ type: { container: 'map', itemType: 'string' } })
  preferences!: Map<string, string>;
}
```

### Inheritance Support
Work with class inheritance and preserve type information:

```typescript
@Serializable()
class Animal {
  @JsonProp({ type: 'string' })
  species!: string;

  @JsonProp({ type: 'number' })
  age!: number;
}

@Serializable()
class Dog extends Animal {
  @JsonProp({ type: 'string' })
  breed!: string;

  @JsonProp({ type: 'boolean' })
  isGoodBoy: boolean = true;
}
```

## Getting Started

Ready to begin? Check out our [Getting Started](getting-started.md) guide!
