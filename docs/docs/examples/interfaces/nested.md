---
sidebar_position: 2
---

# Nested Interfaces

This section demonstrates how to work with nested interfaces using schema-based serialization.

## Nested Objects

```typescript
import { morphioSchema, deserialize, serialize } from 'morphio';

interface Address {
  street: string;
  city: string;
  country: string;
  postalCode?: string;
}

interface Person {
  name: string;
  address: Address;
  alternateAddress?: Address;
}

// Register schemas
morphioSchema({ interface: 'Address' }, {
  street: { type: 'string', required: true },
  city: { type: 'string', required: true },
  country: { type: 'string', required: true },
  postalCode: { type: 'string', required: false }
});

morphioSchema({ interface: 'Person' }, {
  name: { type: 'string', required: true },
  address: { type: { interface: 'Address' }, required: true },
  alternateAddress: { type: { interface: 'Address' }, required: false }
});

// Usage
const person: Person = {
  name: 'John Doe',
  address: {
    street: '123 Main St',
    city: 'New York',
    country: 'USA',
    postalCode: '10001'
  }
};

const serialized = serialize(person, { interface: 'Person' });
console.log(serialized);
// {
//   name: 'John Doe',
//   address: {
//     street: '123 Main St',
//     city: 'New York',
//     country: 'USA',
//     postalCode: '10001'
//   }
// }

const deserialized = deserialize<Person>(serialized, { interface: 'Person' });
console.log(deserialized.name); // 'John Doe'
console.log(deserialized.address.city); // 'New York'
```

## Arrays of Interfaces

```typescript
interface Tag {
  name: string;
  color?: string;
}

interface Post {
  title: string;
  content: string;
  tags: Tag[];
}

// Register schemas
morphioSchema({ interface: 'Tag' }, {
  name: { type: 'string', required: true },
  color: { type: 'string', required: false }
});

morphioSchema({ interface: 'Post' }, {
  title: { type: 'string', required: true },
  content: { type: 'string', required: true },
  tags: { type: { container: 'array', itemType: { interface: 'Tag' } }, required: true }
});

// Usage
const post: Post = {
  title: 'My First Post',
  content: 'Hello World!',
  tags: [
    { name: 'tech', color: 'blue' },
    { name: 'blog' }
  ]
};

const serialized = serialize(post, { interface: 'Post' });
console.log(serialized);
// {
//   title: 'My First Post',
//   content: 'Hello World!',
//   tags: [
//     { name: 'tech', color: 'blue' },
//     { name: 'blog' }
//   ]
// }

const deserialized = deserialize<Post>(serialized, { interface: 'Post' });
console.log(deserialized.title); // 'My First Post'
console.log(deserialized.tags[0].name); // 'tech'
```

## Maps with Interface Values

```typescript
interface Score {
  value: number;
  grade?: string;
}

interface StudentRecord {
  studentId: string;
  name: string;
  scores: Map<string, Score>;
}

// Register schemas
morphioSchema({ interface: 'Score' }, {
  value: { type: 'number', required: true },
  grade: { type: 'string', required: false }
});

morphioSchema({ interface: 'StudentRecord' }, {
  studentId: { type: 'string', required: true },
  name: { type: 'string', required: true },
  scores: { type: { container: 'map', itemType: { interface: 'Score' } }, required: true }
});

// Usage
const record: StudentRecord = {
  studentId: 'ST123',
  name: 'John Doe',
  scores: new Map([
    ['math', { value: 95, grade: 'A' }],
    ['english', { value: 88 }]
  ])
};

const serialized = serialize(record, { interface: 'StudentRecord' });
console.log(serialized);
// {
//   studentId: 'ST123',
//   name: 'John Doe',
//   scores: {
//     math: { value: 95, grade: 'A' },
//     english: { value: 88 }
//   }
// }

const deserialized = deserialize<StudentRecord>(serialized, { interface: 'StudentRecord' });
console.log(deserialized.name); // 'John Doe'
console.log(deserialized.scores.get('math')?.value); // 95
```

These examples demonstrate:
1. Nested interface schemas
2. Arrays of interfaces
3. Maps with interface values
4. Optional properties in nested structures
5. Complex data structures

All examples are based on working test cases in the Morphio codebase.
