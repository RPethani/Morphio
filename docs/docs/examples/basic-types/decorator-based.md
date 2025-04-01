---
sidebar_position: 1
---

# Basic Types with Decorators

This section demonstrates how to use decorators to serialize and deserialize basic TypeScript types.

## String, Number, and Boolean

```typescript
import { deserialize, JsonProp, Serializable, serialize } from 'morphio';

@MorphSchema()
class StringContainer {
  @MorphProp({ type: 'string' })
  value!: string;
}

// Usage with string
const container = new StringContainer();
container.value = 'test';

const serialized = serialize(container);
console.log(serialized); // { value: 'test' }

const deserialized = deserialize(serialized, StringContainer);
console.log(deserialized.value); // 'test'

// Example with empty string
const emptyContainer = new StringContainer();
emptyContainer.value = '';

const serializedEmpty = serialize(emptyContainer);
console.log(serializedEmpty); // { value: '' }
```

```typescript
@MorphSchema()
class NumberContainer {
  @MorphProp({ type: 'number' })
  value!: number;
}

// Usage with integer
const intContainer = new NumberContainer();
intContainer.value = 42;

const serializedInt = serialize(intContainer);
console.log(serializedInt); // { value: 42 }

// Usage with floating point
const floatContainer = new NumberContainer();
floatContainer.value = 3.14;

const serializedFloat = serialize(floatContainer);
console.log(serializedFloat); // { value: 3.14 }
```

```typescript
@MorphSchema()
class BooleanContainer {
  @MorphProp({ type: 'boolean' })
  value!: boolean;
}

// Usage with true
const trueContainer = new BooleanContainer();
trueContainer.value = true;

const serializedTrue = serialize(trueContainer);
console.log(serializedTrue); // { value: true }

// Usage with false
const falseContainer = new BooleanContainer();
falseContainer.value = false;

const serializedFalse = serialize(falseContainer);
console.log(serializedFalse); // { value: false }
```

## Multiple Properties

```typescript
@MorphSchema()
class User {
  @MorphProp({ type: 'string' })
  name!: string;

  @MorphProp({ type: 'number' })
  age!: number;

  @MorphProp({ type: 'boolean' })
  isActive!: boolean;
}

// Usage
const user = new User();
user.name = 'John Doe';
user.age = 30;
user.isActive = true;

const serialized = serialize(user);
console.log(serialized);
// {
//   name: 'John Doe',
//   age: 30,
//   isActive: true
// }

const deserialized = deserialize(serialized, User);
console.log(deserialized.name); // 'John Doe'
console.log(deserialized.age); // 30
console.log(deserialized.isActive); // true
```

## Optional Properties

```typescript
@MorphSchema()
class Profile {
  @MorphProp({ type: 'string' })
  name!: string;

  @MorphProp({ type: 'string', required: false })
  bio?: string;

  @MorphProp({ type: 'number', required: false })
  age?: number;
}

// Usage with missing optional properties
const profile = new Profile();
profile.name = 'John Doe';

const serialized = serialize(profile);
console.log(serialized); // { name: 'John Doe' }

// Deserialize with missing optional properties
const json = { name: 'John Doe' };
const deserialized = deserialize(json, Profile);
console.log(deserialized.name); // 'John Doe'
console.log(deserialized.bio); // undefined
console.log(deserialized.age); // undefined
```

These examples demonstrate:
1. Basic type serialization and deserialization
2. Working with required and optional properties
3. Proper type declarations and imports
4. Real-world usage patterns

All examples are taken directly from working test cases in the Morphio codebase.
