---
sidebar_position: 2
---

# Basic Types with Schema

This section demonstrates how to use manual schema registration to serialize and deserialize basic TypeScript types.

## Basic Class Schema

```typescript
import { deserialize, morphioSchema, serialize } from 'morphio';

class TestClass {
  name?: string;
  age?: number;
}

// Register schema declaratively
morphioSchema(TestClass, {
  name: { type: 'string', required: false },
  age: { type: 'number', required: false },
});

// Usage
const test = new TestClass();
test.name = 'John Doe';
test.age = 30;

const serialized = serialize(test);
console.log(serialized);
// {
//   name: 'John Doe',
//   age: 30
// }

// Deserialize from JSON string
const jsonString = '{"name": "John Doe", "age": 30}';
const deserialized = deserialize(jsonString, TestClass);
console.log(deserialized.name); // 'John Doe'
console.log(deserialized.age); // 30
```

## Optional Properties

```typescript
class Profile {
  name!: string;
  bio?: string;
  age?: number;
}

// Register schema with required and optional properties
morphioSchema(Profile, {
  name: { type: 'string', required: true },
  bio: { type: 'string', required: false },
  age: { type: 'number', required: false },
});

// Usage with missing optional properties
const jsonString = '{"name": "John Doe"}';
const deserialized = deserialize(jsonString, Profile);
console.log(deserialized.name); // 'John Doe'
console.log(deserialized.bio); // undefined
console.log(deserialized.age); // undefined

// Serialize with missing optional properties
const profile = new Profile();
profile.name = 'John Doe';

const serialized = serialize(profile);
console.log(serialized); // { name: 'John Doe' }
```

## Nested Objects

```typescript
class Address {
  city!: string;
}

class Person {
  name!: string;
  address!: Address;
}

// Register schemas declaratively
morphioSchema(Address, {
  city: { type: 'string', required: true },
});

morphioSchema(Person, {
  name: { type: 'string', required: true },
  address: { type: Address, required: true },
});

// Usage
const jsonString = '{"name": "Sara", "address": {"city": "Mumbai"}}';
const deserialized = deserialize(jsonString, Person);
console.log(deserialized.name); // 'Sara'
console.log(deserialized.address.city); // 'Mumbai'

// Serialize nested objects
const address = new Address();
address.city = 'Mumbai';

const person = new Person();
person.name = 'Sara';
person.address = address;

const serialized = serialize(person);
console.log(serialized);
// {
//   name: 'Sara',
//   address: {
//     city: 'Mumbai'
//   }
// }
```

These examples demonstrate:
1. Manual schema registration
2. Working with required and optional properties
3. Nested object serialization
4. Both string and object input for deserialization

All examples are taken directly from working test cases in the Morphio codebase.
