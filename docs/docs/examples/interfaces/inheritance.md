---
sidebar_position: 3
---

# Interface Inheritance

This section demonstrates how to work with interface inheritance using schema-based serialization.

## Basic Interface Inheritance

```typescript
import { morphioSchema, deserialize, serialize } from 'morphio';

interface Base {
  id: string;
  createdAt: Date;
}

interface Animal extends Base {
  name: string;
  species: string;
}

interface Pet extends Animal {
  owner: string;
  vaccinated: boolean;
}

// Register schemas
// Register base interface schema
morphioSchema({ interface: 'Base' }, {
  id: { type: 'string', required: true },
  createdAt: { type: 'Date', required: true },
});

// Register Animal schema with inheritance
morphioSchema({ interface: 'Animal' }, {
  name: { type: 'string', required: true },
  species: { type: 'string', required: true },
}, [{ interface: 'Base' }]);

// Register Pet schema with inheritance
morphioSchema({ interface: 'Pet' }, {
  owner: { type: 'string', required: true },
  vaccinated: { type: 'boolean', required: true },
}, [{ interface: 'Animal' }]);

// Usage
const pet: Pet = {
  id: '123',
  createdAt: new Date('2025-01-01'),
  name: 'Fluffy',
  species: 'Cat',
  owner: 'John',
  vaccinated: true,
};

const serialized = serialize(pet, { interface: 'Pet' });
console.log(serialized);
// {
//   id: '123',
//   createdAt: '2025-01-01T00:00:00.000Z',
//   name: 'Fluffy',
//   species: 'Cat',
//   owner: 'John',
//   vaccinated: true
// }

const deserialized = deserialize<Pet>(serialized, { interface: 'Pet' });
console.log(deserialized.id); // '123'
console.log(deserialized.name); // 'Fluffy'
console.log(deserialized.owner); // 'John'
```

## Working with Partial Types

```typescript
// Using the Animal interface from the inheritance chain
const animal: Animal = {
  id: '456',
  createdAt: new Date('2025-01-02'),
  name: 'Lion',
  species: 'Panthera leo',
};

const serialized = serialize(animal, { interface: 'Animal' });
console.log(serialized);
// {
//   id: '456',
//   createdAt: '2025-01-02T00:00:00.000Z',
//   name: 'Lion',
//   species: 'Panthera leo'
// }

const deserialized = deserialize<Animal>(serialized, { interface: 'Animal' });
console.log(deserialized.id); // '456'
console.log(deserialized.species); // 'Panthera leo'
```

## Complex Inheritance with Optional Properties

```typescript
interface Entity {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
}

interface Product extends Entity {
  name: string;
  price: number;
  description?: string;
}

interface DigitalProduct extends Product {
  downloadUrl: string;
  fileSize?: number;
  format: string;
}

// Register schemas
morphioSchema({ interface: 'Entity' }, {
  id: { type: 'string', required: true },
  createdAt: { type: 'Date', required: true },
  updatedAt: { type: 'Date', required: false }
});

morphioSchema({ interface: 'Product' }, {
  name: { type: 'string', required: true },
  price: { type: 'number', required: true },
  description: { type: 'string', required: false }
}, [{ interface: 'Entity' }]);

morphioSchema({ interface: 'DigitalProduct' }, {
  downloadUrl: { type: 'string', required: true },
  fileSize: { type: 'number', required: false },
  format: { type: 'string', required: true }
}, [{ interface: 'Product' }]);

// Usage
const product: DigitalProduct = {
  id: 'dp123',
  createdAt: new Date('2025-01-01'),
  name: 'E-book',
  price: 9.99,
  downloadUrl: 'https://example.com/download',
  format: 'PDF',
  fileSize: 1024
};

const serialized = serialize(product, { interface: 'DigitalProduct' });
console.log(serialized);
// {
//   id: 'dp123',
//   createdAt: '2025-01-01T00:00:00.000Z',
//   name: 'E-book',
//   price: 9.99,
//   downloadUrl: 'https://example.com/download',
//   format: 'PDF',
//   fileSize: 1024
// }

const deserialized = deserialize<DigitalProduct>(serialized, { interface: 'DigitalProduct' });
console.log(deserialized.name); // 'E-book'
console.log(deserialized.price); // 9.99
console.log(deserialized.format); // 'PDF'
```

These examples demonstrate:
1. Basic interface inheritance
2. Multi-level inheritance chain
3. Working with partial types from the inheritance chain
4. Optional properties in inherited interfaces
5. Complex inheritance structures

All examples are taken directly from working test cases in the Morphio codebase.
