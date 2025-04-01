---
sidebar_position: 1
---

# Class Serialization with Decorators

This section demonstrates how to use decorators to serialize and deserialize classes.

## Basic Class Serialization

```typescript
import { deserialize, JsonProp, Serializable, serialize } from 'morphio';

@Serializable()
class User {
  @JsonProp({ type: 'string' })
  name!: string;

  @JsonProp({ type: 'number' })
  age!: number;

  @JsonProp({ type: 'boolean' })
  isActive!: boolean;

  getFullName() {
    return this.name;
  }
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
console.log(deserialized instanceof User); // true
console.log(deserialized.getFullName()); // 'John Doe'
```

## Nested Objects

```typescript
@Serializable()
class Address {
  @JsonProp({ type: 'string' })
  street!: string;

  @JsonProp({ type: 'string' })
  city!: string;

  getFullAddress() {
    return `${this.street}, ${this.city}`;
  }
}

@Serializable()
class Person {
  @JsonProp({ type: 'string' })
  name!: string;

  @JsonProp({ type: Address })
  address!: Address;

  getAddressString() {
    return this.address.getFullAddress();
  }
}

// Usage
const person = new Person();
person.name = 'John Doe';

const address = new Address();
address.street = '123 Main St';
address.city = 'New York';
person.address = address;

const serialized = serialize(person);
console.log(serialized);
// {
//   name: 'John Doe',
//   address: {
//     street: '123 Main St',
//     city: 'New York'
//   }
// }

const deserialized = deserialize(serialized, Person);
console.log(deserialized.getAddressString()); // '123 Main St, New York'
```

## Optional Properties

```typescript
@Serializable()
class Profile {
  @JsonProp({ type: 'string' })
  name!: string;

  @JsonProp({ type: 'string', required: false })
  bio?: string;

  @JsonProp({ type: 'number', required: false })
  age?: number;

  @JsonProp({ type: 'Date', required: false })
  lastUpdated?: Date;

  hasAge() {
    return this.age !== undefined;
  }
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
console.log(deserialized.hasAge()); // false

// Usage with all properties
const fullProfile = new Profile();
fullProfile.name = 'Jane Doe';
fullProfile.bio = 'Software Engineer';
fullProfile.age = 28;
fullProfile.lastUpdated = new Date();

const serializedFull = serialize(fullProfile);
console.log(serializedFull);
// {
//   name: 'Jane Doe',
//   bio: 'Software Engineer',
//   age: 28,
//   lastUpdated: '2025-04-01T02:20:49+05:30'
// }
```

## Method Preservation

```typescript
@Serializable()
class Calculator {
  @JsonProp({ type: 'number' })
  value!: number;

  add(n: number) {
    this.value += n;
    return this;
  }

  multiply(n: number) {
    this.value *= n;
    return this;
  }

  getValue() {
    return this.value;
  }
}

// Usage showing method preservation after deserialization
const calc = new Calculator();
calc.value = 5;
calc.add(3).multiply(2);

const serialized = serialize(calc);
console.log(serialized); // { value: 16 }

const deserialized = deserialize(serialized, Calculator);
console.log(deserialized.getValue()); // 16
deserialized.add(4);
console.log(deserialized.getValue()); // 20
```

These examples demonstrate:
1. Basic class serialization with decorators
2. Nested object handling
3. Optional property support
4. Method preservation after deserialization
5. Type safety and proper instantiation

All examples are based on working test cases in the Morphio codebase.
