---
sidebar_position: 2
---

# Class Serialization with Schema

This section demonstrates how to use manual schema registration to serialize and deserialize classes.

## Basic Class Schema

```typescript
import { deserialize, morphioSchema, serialize } from 'morphio';

class TestClass {
  name?: string;
  age?: number;
  isActive?: boolean;

  getAge() {
    return this.age;
  }
}

// Register schema declaratively
morphioSchema(TestClass, {
  name: { type: 'string', required: false },
  age: { type: 'number', required: false },
  isActive: { type: 'boolean', required: false }
});

// Usage
const test = new TestClass();
test.name = 'John Doe';
test.age = 30;
test.isActive = true;

const serialized = serialize(test);
console.log(serialized);
// {
//   name: 'John Doe',
//   age: 30,
//   isActive: true
// }

// Deserialize from JSON string
const jsonString = '{"name": "John Doe", "age": 30, "isActive": true}';
const deserialized = deserialize(jsonString, TestClass);
console.log(deserialized.name); // 'John Doe'
console.log(deserialized.getAge()); // 30
```

## Nested Objects

```typescript
class Address {
  city!: string;

  getCity() {
    return this.city;
  }
}

class Person {
  name!: string;
  address!: Address;

  getAddressCity() {
    return this.address.getCity();
  }
}

// Register schemas declaratively
morphioSchema(Address, {
  city: { type: 'string', required: true }
});

morphioSchema(Person, {
  name: { type: 'string', required: true },
  address: { type: Address, required: true }
});

// Usage
const jsonString = '{"name": "Sara", "address": {"city": "Mumbai"}}';
const deserialized = deserialize(jsonString, Person);
console.log(deserialized.name); // 'Sara'
console.log(deserialized.getAddressCity()); // 'Mumbai'

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

## Required vs Optional Properties

```typescript
class Profile {
  name!: string;
  bio?: string;
  age?: number;

  hasBio() {
    return this.bio !== undefined;
  }
}

// Register schema with required and optional properties
morphioSchema(Profile, {
  name: { type: 'string', required: true },
  bio: { type: 'string', required: false },
  age: { type: 'number', required: false }
});

// Usage with missing optional properties
const jsonString = '{"name": "John Doe"}';
const deserialized = deserialize(jsonString, Profile);
console.log(deserialized.name); // 'John Doe'
console.log(deserialized.hasBio()); // false
console.log(deserialized.age); // undefined

// Serialize with missing optional properties
const profile = new Profile();
profile.name = 'John Doe';

const serialized = serialize(profile);
console.log(serialized); // { name: 'John Doe' }
```

## Complex Objects with Methods

```typescript
class Score {
  value!: number;
  grade?: string;

  isPass() {
    return this.value >= 60;
  }

  getGradeOrDefault() {
    return this.grade || 'N/A';
  }
}

class StudentRecord {
  name!: string;
  scores!: Map<string, Score>;

  getAverageScore() {
    let total = 0;
    let count = 0;
    this.scores.forEach(score => {
      total += score.value;
      count++;
    });
    return count > 0 ? total / count : 0;
  }
}

// Register schemas
morphioSchema(Score, {
  value: { type: 'number', required: true },
  grade: { type: 'string', required: false }
});

morphioSchema(StudentRecord, {
  name: { type: 'string', required: true },
  scores: { type: { container: 'map', itemType: Score }, required: true }
});

// Usage
const jsonString = JSON.stringify({
  name: 'John',
  scores: {
    math: { value: 95, grade: 'A' },
    english: { value: 88 }
  }
});

const deserialized = deserialize(jsonString, StudentRecord);
console.log(deserialized.name); // 'John'
console.log(deserialized.scores.get('math')?.isPass()); // true
console.log(deserialized.scores.get('math')?.getGradeOrDefault()); // 'A'
console.log(deserialized.scores.get('english')?.getGradeOrDefault()); // 'N/A'
console.log(deserialized.getAverageScore()); // 91.5
```

These examples demonstrate:
1. Manual schema registration
2. Working with required and optional properties
3. Nested object serialization
4. Method preservation
5. Complex object structures with containers

All examples are taken directly from working test cases in the Morphio codebase.
