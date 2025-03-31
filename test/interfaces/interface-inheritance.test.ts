// test/interfaces/interface-inheritance.test.ts
import { morphioSchema } from '../../src/schema';
import { deserialize, serialize } from '../../src';

describe('Interface Inheritance', () => {
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

  beforeAll(() => {
    // Register base interface schema
    morphioSchema('Base', {
      id: { type: 'string', required: true },
      createdAt: { type: 'Date', required: true },
    });

    // Register Animal schema with inheritance
    morphioSchema('Animal', {
      id: { type: 'string', required: true },
      createdAt: { type: 'Date', required: true },
      name: { type: 'string', required: true },
      species: { type: 'string', required: true },
    });

    // Register Pet schema with inheritance
    morphioSchema('Pet', {
      id: { type: 'string', required: true },
      createdAt: { type: 'Date', required: true },
      name: { type: 'string', required: true },
      species: { type: 'string', required: true },
      owner: { type: 'string', required: true },
      vaccinated: { type: 'boolean', required: true },
    });
  });

  it('should serialize and deserialize inherited properties', () => {
    const pet: Pet = {
      id: '123',
      createdAt: new Date('2025-01-01'),
      name: 'Fluffy',
      species: 'Cat',
      owner: 'John',
      vaccinated: true,
    };

    const serialized = serialize(pet, { interface: 'Pet' });
    expect(serialized).toEqual({
      id: '123',
      createdAt: '2025-01-01T00:00:00.000Z',
      name: 'Fluffy',
      species: 'Cat',
      owner: 'John',
      vaccinated: true,
    });

    const deserialized = deserialize<Pet>(serialized, { interface: 'Pet' });
    expect(deserialized).toEqual(pet);
  });

  it('should work with partial interface type', () => {
    const animal: Animal = {
      id: '456',
      createdAt: new Date('2025-01-02'),
      name: 'Lion',
      species: 'Panthera leo',
    };

    const serialized = serialize(animal, { interface: 'Animal' });
    expect(serialized).toEqual({
      id: '456',
      createdAt: '2025-01-02T00:00:00.000Z',
      name: 'Lion',
      species: 'Panthera leo',
    });

    const deserialized = deserialize<Animal>(serialized, {
      interface: 'Animal',
    });
    expect(deserialized).toEqual(animal);
  });
});
