---
sidebar_position: 2
---

# Getting Started

## Installation

Install Morphio using npm:

```bash
npm install morphio
```

Or using yarn:

```bash
yarn add morphio
```

## Basic Usage

Here's a simple example of how to use Morphio:

```typescript
import { JsonProp, Serializable } from 'morphio';

@Serializable()
class User {
  @JsonProp()
  name: string;

  @JsonProp()
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

// Serialization
const user = new User('John Doe', 30);
const json = JSON.stringify(user); // {"name":"John Doe","age":30}

// Deserialization
const deserializedUser = JSON.parse(json, User);
console.log(deserializedUser instanceof User); // true
console.log(deserializedUser.name); // "John Doe"
```

## Next Steps

- Check out the [Examples](./examples.md) for more usage scenarios
- Learn about [Advanced Features](./advanced/custom-types.md)
- Explore the [API Reference](./api/intro.md)
