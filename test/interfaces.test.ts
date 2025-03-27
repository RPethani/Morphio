import { SerializationEngine } from '../src/engine/SerializationEngine';
import { morphioSchema } from '../src/schema';

// Simple interfaces
interface Person {
  name: string;
  age: number;
}

interface Address {
  street: string;
  city: string;
  country: string;
}

interface Contact {
  person: Person;
  address: Address;
  email?: string;
}

// Register interface schemas
morphioSchema('Person', {
  name: { type: 'string', required: true },
  age: { type: 'number', required: true },
});

morphioSchema('Address', {
  street: { type: 'string', required: true },
  city: { type: 'string', required: true },
  country: { type: 'string', required: true },
});

morphioSchema('Contact', {
  person: { type: 'Person', required: true },
  address: { type: 'Address', required: true },
  email: { type: 'string', required: false },
});

describe('Plain Interface Serialization/Deserialization', () => {
  const engine = SerializationEngine.getInstance();

  describe('Basic interface', () => {
    it('should serialize and deserialize a Person object', () => {
      const person: Person = {
        name: 'John',
        age: 30,
      };

      const serialized = engine.serialize(person);
      expect(serialized).toEqual({
        name: 'John',
        age: 30,
      });

      const deserialized = engine.deserialize<Person>(serialized, 'Person');
      expect(deserialized).toEqual(person);
    });
  });

  describe('Nested interfaces', () => {
    it('should serialize and deserialize nested interfaces', () => {
      const contact: Contact = {
        person: {
          name: 'Jane',
          age: 25,
        },
        address: {
          street: '123 Main St',
          city: 'New York',
          country: 'USA',
        },
        email: 'jane@example.com',
      };

      const serialized = engine.serialize(contact);
      expect(serialized).toEqual({
        person: {
          name: 'Jane',
          age: 25,
        },
        address: {
          street: '123 Main St',
          city: 'New York',
          country: 'USA',
        },
        email: 'jane@example.com',
      });

      const deserialized = engine.deserialize<Contact>(serialized, 'Contact');
      expect(deserialized).toEqual(contact);
    });
  });

  describe('Optional properties', () => {
    it('should handle optional properties correctly', () => {
      const contact: Contact = {
        person: {
          name: 'Bob',
          age: 40,
        },
        address: {
          street: '456 Oak St',
          city: 'Boston',
          country: 'USA',
        },
        // email is omitted
      };

      const serialized = engine.serialize(contact);
      expect(serialized).toEqual({
        person: {
          name: 'Bob',
          age: 40,
        },
        address: {
          street: '456 Oak St',
          city: 'Boston',
          country: 'USA',
        },
      });

      const deserialized = engine.deserialize<Contact>(serialized, 'Contact');
      expect(deserialized).toEqual(contact);
    });
  });
});
