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
@MorphSchema()
class User {
  @MorphProp({ type: 'string' })
  name!: string;

  @MorphProp({ type: 'number' })
  age!: number;
}
```

### Complex Type Support
Handle nested objects, arrays, and maps with ease:

```typescript
@MorphSchema()
class Team {
  @MorphProp({ type: { container: 'array', itemType: User } })
  members!: User[];

  @MorphProp({ type: { container: 'map', itemType: 'string' } })
  preferences!: Map<string, string>;
}
```

### Inheritance Support
Work with class inheritance and preserve type information:

```typescript
@MorphSchema()
class Animal {
  @MorphProp({ type: 'string' })
  species!: string;

  @MorphProp({ type: 'number' })
  age!: number;
}

@MorphSchema()
class Dog extends Animal {
  @MorphProp({ type: 'string' })
  breed!: string;

  @MorphProp({ type: 'boolean' })
  isGoodBoy: boolean = true;
}
```

## Getting Started

Ready to begin? Check out our [Getting Started](getting-started.md) guide!
