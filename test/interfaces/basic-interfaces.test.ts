import { deserialize, serialize } from '../../src';
import { morphioSchema } from '../../src/schema';

describe('Basic Interface Serialization/Deserialization', () => {
  // Simple interface
  interface Person {
    name: string;
    age: number;
  }

  // Register schema
  beforeAll(() => {
    morphioSchema('Person', {
      name: { type: 'string', required: true },
      age: { type: 'number', required: true },
    });
  });

  describe('Basic serialization', () => {
    it('should serialize a Person object', () => {
      const person: Person = {
        name: 'John',
        age: 30,
      };

      const serialized = serialize(person, { interface: 'Person' });
      expect(serialized).toEqual({
        name: 'John',
        age: 30,
      });
    });

    it('should deserialize to a Person object', () => {
      const json = {
        name: 'John',
        age: 30,
      };

      const deserialized = deserialize<Person>(json, { interface: 'Person' });
      expect(deserialized).toEqual({
        name: 'John',
        age: 30,
      });
    });
  });
});
