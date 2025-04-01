---
sidebar_position: 2
---

# Inheritance with Schema

This section demonstrates how to use manual schema registration with class inheritance.

## Basic Inheritance

```typescript
import { deserialize, morphioSchema, serialize } from 'morphio';

class Base {
  id!: string;
  createdAt!: Date;

  getId() {
    return this.id;
  }
}

class Animal extends Base {
  name!: string;
  species!: string;

  getSpecies() {
    return this.species;
  }
}

class Pet extends Animal {
  owner!: string;
  vaccinated!: boolean;

  isVaccinated() {
    return this.vaccinated;
  }
}

// Register base class schema
morphioSchema(Base, {
  id: { type: 'string', required: true },
  createdAt: { type: 'Date', required: true },
});

// Register Animal schema with inheritance
morphioSchema(Animal, {
  name: { type: 'string', required: true },
  species: { type: 'string', required: true },
}, [Base]);

// Register Pet schema with inheritance
morphioSchema(Pet, {
  owner: { type: 'string', required: true },
  vaccinated: { type: 'boolean', required: true },
}, [Animal]);

// Usage
const now = new Date();
const pet = new Pet();
pet.id = '123';
pet.createdAt = now;
pet.name = 'Fluffy';
pet.species = 'Cat';
pet.owner = 'John';
pet.vaccinated = true;

const serialized = serialize(pet);
console.log(serialized);
// {
//   id: '123',
//   createdAt: '2025-04-01T02:23:28+05:30',
//   name: 'Fluffy',
//   species: 'Cat',
//   owner: 'John',
//   vaccinated: true
// }

const deserialized = deserialize(serialized, Pet);
console.log(deserialized.getId()); // '123'
console.log(deserialized.getSpecies()); // 'Cat'
console.log(deserialized.isVaccinated()); // true
```

## Optional Properties in Inheritance

```typescript
class Vehicle {
  id!: string;
  color?: string;

  hasColor() {
    return this.color !== undefined;
  }
}

class Car extends Vehicle {
  model!: string;
  year?: number;

  getModel() {
    return this.model;
  }
}

// Register schemas with optional properties
morphioSchema(Vehicle, {
  id: { type: 'string', required: true },
  color: { type: 'string', required: false },
});

morphioSchema(Car, {
  model: { type: 'string', required: true },
  year: { type: 'number', required: false },
}, [Vehicle]);

// Usage with missing optional properties
const jsonString = JSON.stringify({
  id: '123',
  model: 'Tesla'
});

const deserialized = deserialize(jsonString, Car);
console.log(deserialized.id); // '123'
console.log(deserialized.hasColor()); // false
console.log(deserialized.getModel()); // 'Tesla'
console.log(deserialized.year); // undefined

// Serialize with missing optional properties
const car = new Car();
car.id = '123';
car.model = 'Tesla';

const serialized = serialize(car);
console.log(serialized);
// {
//   id: '123',
//   model: 'Tesla'
// }
```

## Multi-Level Inheritance

```typescript
class Entity {
  id!: string;
  createdAt!: Date;

  getId() {
    return this.id;
  }
}

class Product extends Entity {
  name!: string;
  price!: number;

  getPrice() {
    return this.price;
  }
}

class DigitalProduct extends Product {
  downloadUrl!: string;
  fileSize?: number;

  hasFileSize() {
    return this.fileSize !== undefined;
  }
}

// Register schemas with inheritance chain
morphioSchema(Entity, {
  id: { type: 'string', required: true },
  createdAt: { type: 'Date', required: true },
});

morphioSchema(Product, {
  name: { type: 'string', required: true },
  price: { type: 'number', required: true },
}, [Entity]);

morphioSchema(DigitalProduct, {
  downloadUrl: { type: 'string', required: true },
  fileSize: { type: 'number', required: false },
}, [Product]);

// Usage
const now = new Date();
const product = new DigitalProduct();
product.id = 'dp123';
product.createdAt = now;
product.name = 'E-book';
product.price = 9.99;
product.downloadUrl = 'https://example.com/download';
product.fileSize = 1024;

const serialized = serialize(product);
console.log(serialized);
// {
//   id: 'dp123',
//   createdAt: '2025-04-01T02:23:28+05:30',
//   name: 'E-book',
//   price: 9.99,
//   downloadUrl: 'https://example.com/download',
//   fileSize: 1024
// }

const deserialized = deserialize(serialized, DigitalProduct);
console.log(deserialized.getId()); // 'dp123'
console.log(deserialized.getPrice()); // 9.99
console.log(deserialized.hasFileSize()); // true
```

These examples demonstrate:
1. Schema registration with inheritance
2. Multi-level inheritance chain
3. Optional properties in inherited classes
4. Method inheritance and preservation
5. Proper type instantiation through inheritance chain

All examples are taken directly from working test cases in the Morphio codebase.
