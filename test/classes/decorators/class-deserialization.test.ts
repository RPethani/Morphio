import 'reflect-metadata';
import { deserialize, MorphProp, MorphSchema } from '../../../src';

describe('Class Deserialization', () => {
  describe('Basic class deserialization', () => {
    @MorphSchema()
    class TestClass {
      @MorphProp({ type: 'string', required: true })
      name!: string;

      @MorphProp({ type: 'number', required: false })
      age?: number;
    }

    it('should deserialize without MorphProp using fallback', () => {
      const jsonString = '{"name": "John Doe", "age": 30}';
      const result = deserialize(jsonString, TestClass);

      expect(result).toBeInstanceOf(TestClass);
      expect(result.name).toBe('John Doe');
      expect(result.age).toBe(30);
    });

    it('should handle missing optional properties', () => {
      const jsonString = '{"name": "John Doe"}';
      const result = deserialize(jsonString, TestClass);

      expect(result).toBeInstanceOf(TestClass);
      expect(result.name).toBe('John Doe');
      expect(result.age).toBeUndefined();
    });
  });

  describe('Decorated class deserialization', () => {
    @MorphSchema()
    class DecoratedClass {
      @MorphProp({ type: 'string', required: true })
      name!: string;

      @MorphProp({ type: 'number', required: false })
      age?: number;
    }

    it('should respect MorphProp decorator requirements', () => {
      const jsonString = '{"name": "Jane Doe", "age": 25}';
      const result = deserialize(jsonString, DecoratedClass);

      expect(result).toBeInstanceOf(DecoratedClass);
      expect(result.name).toBe('Jane Doe');
      expect(result.age).toBe(25);
    });

    it('should allow missing optional properties', () => {
      const jsonString = '{"name": "Jane Doe"}';
      const result = deserialize(jsonString, DecoratedClass);

      expect(result).toBeInstanceOf(DecoratedClass);
      expect(result.name).toBe('Jane Doe');
      expect(result.age).toBeUndefined();
    });
  });

  describe('Nested class deserialization', () => {
    @MorphSchema()
    class Address {
      @MorphProp({ type: 'string' })
      city!: string;
    }

    @MorphSchema()
    class Person {
      @MorphProp({ type: 'string' })
      name!: string;

      @MorphProp({ type: Address })
      address!: Address;
    }

    it('should deserialize nested objects', () => {
      const jsonString = '{"name": "Sara", "address": {"city": "Mumbai"}}';
      const result = deserialize(jsonString, Person);

      expect(result).toBeInstanceOf(Person);
      expect(result.name).toBe('Sara');
      expect(result.address).toBeInstanceOf(Address);
      expect(result.address.city).toBe('Mumbai');
    });
  });
});
