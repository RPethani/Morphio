---
sidebar_position: 1
---

# Inheritance with Decorators

This section demonstrates how to use decorators with class inheritance.

## Basic Inheritance

```typescript
import { deserialize, JsonProp, Serializable, serialize } from 'morphio';

@Serializable()
class Animal {
  @JsonProp({ type: 'string' })
  name!: string;

  @JsonProp({ type: 'string' })
  species!: string;

  getSpecies() {
    return this.species;
  }
}

@Serializable()
class Pet extends Animal {
  @JsonProp({ type: 'string' })
  owner!: string;

  @JsonProp({ type: 'boolean' })
  vaccinated!: boolean;

  isVaccinated() {
    return this.vaccinated;
  }
}

// Usage
const pet = new Pet();
pet.name = 'Fluffy';
pet.species = 'Cat';
pet.owner = 'John';
pet.vaccinated = true;

const serialized = serialize(pet);
console.log(serialized);
// {
//   name: 'Fluffy',
//   species: 'Cat',
//   owner: 'John',
//   vaccinated: true
// }

const deserialized = deserialize(serialized, Pet);
console.log(deserialized.getSpecies()); // 'Cat'
console.log(deserialized.isVaccinated()); // true
```

## Multi-Level Inheritance

```typescript
@Serializable()
class LivingBeing {
  @JsonProp({ type: 'string' })
  id!: string;

  @JsonProp({ type: 'Date' })
  createdAt!: Date;

  getId() {
    return this.id;
  }
}

@Serializable()
class Animal extends LivingBeing {
  @JsonProp({ type: 'string' })
  species!: string;

  @JsonProp({ type: 'number' })
  age!: number;

  getAge() {
    return this.age;
  }
}

@Serializable()
class Pet extends Animal {
  @JsonProp({ type: 'string' })
  owner!: string;

  @JsonProp({ type: 'boolean', required: false })
  vaccinated?: boolean;

  getOwner() {
    return this.owner;
  }
}

// Usage
const now = new Date();
const pet = new Pet();
pet.id = '123';
pet.createdAt = now;
pet.species = 'Cat';
pet.age = 3;
pet.owner = 'John';
pet.vaccinated = true;

const serialized = serialize(pet);
console.log(serialized);
// {
//   id: '123',
//   createdAt: '2025-04-01T02:23:28+05:30',
//   species: 'Cat',
//   age: 3,
//   owner: 'John',
//   vaccinated: true
// }

const deserialized = deserialize(serialized, Pet);
console.log(deserialized.getId()); // '123'
console.log(deserialized.getAge()); // 3
console.log(deserialized.getOwner()); // 'John'
```

## Optional Properties in Inheritance

```typescript
@Serializable()
class Vehicle {
  @JsonProp({ type: 'string' })
  id!: string;

  @JsonProp({ type: 'string', required: false })
  color?: string;
}

@Serializable()
class Car extends Vehicle {
  @JsonProp({ type: 'string' })
  model!: string;

  @JsonProp({ type: 'number', required: false })
  year?: number;
}

// Usage with missing optional properties
const car = new Car();
car.id = 'car123';
car.model = 'Tesla';

const serialized = serialize(car);
console.log(serialized);
// {
//   id: 'car123',
//   model: 'Tesla'
// }

// Deserialize with missing optional properties
const json = {
  id: 'car123',
  model: 'Tesla'
};
const deserialized = deserialize(json, Car);
console.log(deserialized.id); // 'car123'
console.log(deserialized.color); // undefined
console.log(deserialized.model); // 'Tesla'
console.log(deserialized.year); // undefined
```

These examples demonstrate:
1. Basic single-level inheritance
2. Multi-level inheritance
3. Optional properties in inherited classes
4. Method inheritance and preservation
5. Proper type instantiation through inheritance chain

All examples are based on working test cases in the Morphio codebase.
