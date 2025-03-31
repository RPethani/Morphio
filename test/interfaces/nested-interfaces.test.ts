import { morphioSchema } from '../../src/schema';
import { deserialize, serialize } from '../../src';

describe('Nested Interface Serialization/Deserialization', () => {
  // Define interfaces
  interface Address {
    street: string;
    city: string;
    country: string;
  }

  interface Contact {
    person: {
      name: string;
      age: number;
    };
    address: Address;
  }

  // Register schemas
  morphioSchema('Address', {
    street: { type: 'string', required: true },
    city: { type: 'string', required: true },
    country: { type: 'string', required: true },
  });

  morphioSchema('Person', {
    name: { type: 'string', required: true },
    age: { type: 'number', required: true },
  });

  morphioSchema('Contact', {
    person: { type: 'Person', required: true },
    address: { type: 'Address', required: true },
  });

  describe('Nested serialization', () => {
    it('should serialize nested interfaces', () => {
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
      };

      const serialized = serialize(contact, { interface: 'Contact' });
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
      });
    });
  });

  describe('Nested deserialization', () => {
    it('should deserialize nested interfaces', () => {
      const json = {
        person: {
          name: 'Jane',
          age: 25,
        },
        address: {
          street: '123 Main St',
          city: 'New York',
          country: 'USA',
        },
      };

      const deserialized = deserialize<Contact>(json, {
        interface: 'Contact',
      });
      expect(deserialized).toEqual({
        person: {
          name: 'Jane',
          age: 25,
        },
        address: {
          street: '123 Main St',
          city: 'New York',
          country: 'USA',
        },
      });
    });
  });
});
