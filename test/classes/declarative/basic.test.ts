import { deserialize, morphioSchema, serialize } from '../../../src';

describe('Class Deserialization (Declarative)', () => {
  describe('Basic class deserialization', () => {
    class TestClass {
      name?: string;
      age?: number;
    }

    // Register schema declaratively
    morphioSchema(TestClass, {
      name: { type: 'string', required: false },
      age: { type: 'number', required: false },
    });

    it('should deserialize using morphioSchema', () => {
      const jsonString = '{"name": "John Doe", "age": 30}';
      const result = deserialize(jsonString, TestClass);

      expect(result).toBeInstanceOf(TestClass);
      expect(result.name).toBe('John Doe');
      expect(result.age).toBe(30);
    });

    it('should serialize using morphioSchema', () => {
      const test = new TestClass();
      test.name = 'John Doe';
      test.age = 30;

      const result = serialize(test);
      expect(result).toEqual({
        name: 'John Doe',
        age: 30,
      });
    });

    it('should handle missing optional properties', () => {
      const jsonString = '{"name": "John Doe"}';
      const result = deserialize(jsonString, TestClass);

      expect(result).toBeInstanceOf(TestClass);
      expect(result.name).toBe('John Doe');
      expect(result.age).toBeUndefined();
    });

    it('should serialize with missing optional properties', () => {
      const test = new TestClass();
      test.name = 'John Doe';

      const result = serialize(test);
      expect(result).toEqual({
        name: 'John Doe',
      });
    });
  });

  describe('Nested class deserialization', () => {
    class Address {
      city!: string;
    }

    class Person {
      name!: string;
      address!: Address;
    }

    // Register schemas declaratively
    morphioSchema(Address, {
      city: { type: 'string', required: true },
    });

    morphioSchema(Person, {
      name: { type: 'string', required: true },
      address: { type: Address, required: true },
    });

    it('should deserialize nested objects', () => {
      const jsonString = '{"name": "Sara", "address": {"city": "Mumbai"}}';
      const result = deserialize(jsonString, Person);

      expect(result).toBeInstanceOf(Person);
      expect(result.name).toBe('Sara');
      expect(result.address).toBeInstanceOf(Address);
      expect(result.address.city).toBe('Mumbai');
    });

    it('should serialize nested objects', () => {
      const address = new Address();
      address.city = 'Mumbai';

      const person = new Person();
      person.name = 'Sara';
      person.address = address;

      const result = serialize(person);
      expect(result).toEqual({
        name: 'Sara',
        address: {
          city: 'Mumbai',
        },
      });
    });
  });
});
