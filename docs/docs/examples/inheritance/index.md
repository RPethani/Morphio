---
sidebar_position: 4
---

# Inheritance

This section demonstrates how to handle class and interface inheritance in Morphio. You'll find examples for:

## Single-Level Inheritance
Learn how to work with basic inheritance:
- Parent-child class relationships
- Property inheritance
- Method preservation
- Type validation across inheritance

## Multi-Level Inheritance
Explore complex inheritance scenarios:
- Deep inheritance chains
- Property overriding
- Type composition
- Schema inheritance

## Approaches
The examples in this section are presented in two formats:

### Decorator-Based
Using TypeScript decorators with proper type information:
```typescript
@MorphSchema()
class Animal {
  @MorphProp({ type: 'string' })
  id: string;

  @MorphProp({ type: 'string' })
  species: string;
}

@MorphSchema()
class Pet extends Animal {
  @MorphProp({ type: 'string' })
  name: string;

  @MorphProp({ type: 'string' })
  owner: string;
}
```

### Schema-Based
Manual schema registration with inheritance:
```typescript
class Animal {
  id: string;
  species: string;
}

class Pet extends Animal {
  name: string;
  owner: string;
}

morphioSchema(Animal, {
  id: { type: 'string', required: true },
  species: { type: 'string', required: true }
});

morphioSchema(Pet, {
  name: { type: 'string', required: true },
  owner: { type: 'string', required: true }
}, [Animal]);
```

Each example demonstrates proper inheritance handling while maintaining type safety throughout the serialization process.
