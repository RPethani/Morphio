---
sidebar_position: 1
---

# Basic Interface Serialization

This section demonstrates how to use interfaces with schema-based serialization.

## Basic Interface

```typescript
import { morphioSchema, deserialize, serialize } from 'morphio';

interface User {
  name: string;
  age: number;
  isActive: boolean;
}

// Register schema
morphioSchema({ interface: 'User' }, {
  name: { type: 'string', required: true },
  age: { type: 'number', required: true },
  isActive: { type: 'boolean', required: true }
});

// Usage
const user: User = {
  name: 'John Doe',
  age: 30,
  isActive: true
};

const serialized = serialize(user, { interface: 'User' });
console.log(serialized);
// {
//   name: 'John Doe',
//   age: 30,
//   isActive: true
// }

const deserialized = deserialize<User>(serialized, { interface: 'User' });
console.log(deserialized.name); // 'John Doe'
console.log(deserialized.age); // 30
console.log(deserialized.isActive); // true
```

## Optional Properties

```typescript
interface Profile {
  name: string;
  bio?: string;
  age?: number;
}

// Register schema with optional properties
morphioSchema({ interface: 'Profile' }, {
  name: { type: 'string', required: true },
  bio: { type: 'string', required: false },
  age: { type: 'number', required: false }
});

// Usage with missing optional properties
const profile: Profile = {
  name: 'John Doe'
};

const serialized = serialize(profile, { interface: 'Profile' });
console.log(serialized); // { name: 'John Doe' }

const deserialized = deserialize<Profile>(serialized, { interface: 'Profile' });
console.log(deserialized.name); // 'John Doe'
console.log(deserialized.bio); // undefined
console.log(deserialized.age); // undefined
```

## Date and Complex Types

```typescript
interface Event {
  id: string;
  title: string;
  date: Date;
  metadata?: {
    location: string;
    capacity?: number;
  };
}

// Register schema with nested types
morphioSchema({ interface: 'Event' }, {
  id: { type: 'string', required: true },
  title: { type: 'string', required: true },
  date: { type: 'Date', required: true },
  metadata: {
    type: {
      location: { type: 'string', required: true },
      capacity: { type: 'number', required: false }
    },
    required: false
  }
});

// Usage
const event: Event = {
  id: 'evt123',
  title: 'Tech Conference',
  date: new Date('2025-04-01T02:23:28+05:30'),
  metadata: {
    location: 'Convention Center',
    capacity: 1000
  }
};

const serialized = serialize(event, { interface: 'Event' });
console.log(serialized);
// {
//   id: 'evt123',
//   title: 'Tech Conference',
//   date: '2025-04-01T02:23:28+05:30',
//   metadata: {
//     location: 'Convention Center',
//     capacity: 1000
//   }
// }

const deserialized = deserialize<Event>(serialized, { interface: 'Event' });
console.log(deserialized.title); // 'Tech Conference'
console.log(deserialized.date instanceof Date); // true
console.log(deserialized.metadata?.location); // 'Convention Center'
```

These examples demonstrate:
1. Basic interface schema registration
2. Optional property handling
3. Complex type support
4. Proper type preservation
5. Nested object structures

All examples are based on working test cases in the Morphio codebase.
