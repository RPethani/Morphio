import { deserialize, morphioSchema, serialize } from '../../../src';

describe('Class Inheritance (Declarative)', () => {
  class Base {
    id!: string;
    createdAt!: Date;
  }

  class Animal extends Base {
    name!: string;
    species!: string;
  }

  class Pet extends Animal {
    owner!: string;
    vaccinated!: boolean;
  }

  // Register base class schema
  morphioSchema(Base, {
    id: { type: 'string', required: true },
    createdAt: { type: 'date', required: true },
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

  it('should deserialize with inherited properties', () => {
    const now = new Date();
    const jsonString = JSON.stringify({
      id: '123',
      createdAt: now.toISOString(),
      name: 'Fluffy',
      species: 'Cat',
      owner: 'John',
      vaccinated: true,
    });

    const result = deserialize(jsonString, Pet);

    expect(result).toBeInstanceOf(Pet);
    expect(result.id).toBe('123');
    expect(result.createdAt).toEqual(now);
    expect(result.name).toBe('Fluffy');
    expect(result.species).toBe('Cat');
    expect(result.owner).toBe('John');
    expect(result.vaccinated).toBe(true);
  });

  it('should serialize with inherited properties', () => {
    const now = new Date();
    const pet = new Pet();
    pet.id = '123';
    pet.createdAt = now;
    pet.name = 'Fluffy';
    pet.species = 'Cat';
    pet.owner = 'John';
    pet.vaccinated = true;

    const result = serialize(pet);
    expect(result).toEqual({
      id: '123',
      createdAt: now.toISOString(),
      name: 'Fluffy',
      species: 'Cat',
      owner: 'John',
      vaccinated: true,
    });
  });

  it('should handle missing optional inherited properties', () => {
    const jsonString = JSON.stringify({
      id: '123',
      createdAt: new Date().toISOString(),
      name: 'Fluffy',
      species: 'Cat',
      owner: 'John',
    });

    const result = deserialize(jsonString, Pet);

    expect(result).toBeInstanceOf(Pet);
    expect(result.vaccinated).toBeUndefined();
  });

  it('should serialize with missing optional inherited properties', () => {
    const now = new Date();
    const pet = new Pet();
    pet.id = '123';
    pet.createdAt = now;
    pet.name = 'Fluffy';
    pet.species = 'Cat';
    pet.owner = 'John';
    // vaccinated is omitted

    const result = serialize(pet);
    expect(result).toEqual({
      id: '123',
      createdAt: now.toISOString(),
      name: 'Fluffy',
      species: 'Cat',
      owner: 'John',
    });
  });
});
