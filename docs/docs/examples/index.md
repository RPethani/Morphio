---
sidebar_position: 1
---

# Examples

Welcome to the Morphio examples section. Here you'll find comprehensive examples demonstrating various features and use cases.

## Organization
The examples are organized into the following categories:

### Basic Types
Serialization of primitive types, dates, and optional properties. Covers both decorator-based and schema-based approaches.

### Container Types
Working with arrays and maps, including nested structures and complex type combinations.

### Class-Based Serialization
Serializing and deserializing class instances while preserving methods and type information.

### Inheritance
Handling class and interface inheritance, from simple to complex inheritance chains.

### Interface-Based Serialization
Working with TypeScript interfaces, including nested interfaces and interface inheritance.

## Approaches
Each section (where applicable) provides examples in two formats:

### Decorator-Based
Using TypeScript decorators for a clean, declarative approach. Example:
```typescript
@MorphSchema()
class User {
  @MorphProp({ type: 'string' })
  name: string;
}
```

### Schema-Based
Manual schema registration for more control. Example:
```typescript
class User {
  name: string;
}

morphioSchema(User, {
  name: { type: 'string', required: true }
});
```

Choose the approach that best fits your needs. Both provide the same level of type safety and functionality.
