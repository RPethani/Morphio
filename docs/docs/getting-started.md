---
sidebar_position: 2
---

# Getting Started

## Installation

Install Morphio using npm:

```bash
npm install @rpethani/morphio
```

Or using yarn:

```bash
yarn add @rpethani/morphio
```

## Basic Usage

Morphio provides two ways to define your schema:

1. Using decorators (recommended)
2. Using schema objects

### Using Decorators

```typescript
import { MorphProp, MorphSchema } from '@rpethani/morphio';

@MorphSchema()
class User {
  @MorphProp()
  name: string;

  @MorphProp()
  age: number;
}

const json = '{"name": "John Doe", "age": 30}';
const user = deserialize(json, User);
console.log(user.name); // "John Doe"
console.log(user.age); // 30
```

### Using Schema Objects

```typescript
import { morphioSchema, deserialize } from '@rpethani/morphio';

const userSchema = morphioSchema({
  type: 'object',
  properties: {
    name: { type: 'string' },
    age: { type: 'number' },
  },
});

const json = '{"name": "John Doe", "age": 30}';
const user = deserialize(json, userSchema);
console.log(user.name); // "John Doe"
console.log(user.age); // 30
```

## Next Steps

For more examples and detailed API documentation, check out:

- [Examples](/docs/examples) - Various examples showing different use cases
- [API Reference](/docs/api) - Detailed API documentation
