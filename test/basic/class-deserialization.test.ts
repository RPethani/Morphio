import 'reflect-metadata';
import { deserialize, JsonProp, Serializable } from '../../src';

describe('Class Deserialization', () => {
  describe('Basic class deserialization', () => {
    @Serializable()
    class TestClass {
      name?: string;
      age?: number;
    }

    it('should deserialize without JsonProp using fallback', () => {
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
    @Serializable()
    class DecoratedClass {
      @JsonProp({ type: 'string', required: true })
      name!: string;

      @JsonProp({ type: 'number', required: false })
      age?: number;
    }

    it('should respect JsonProp decorator requirements', () => {
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
    @Serializable()
    class Address {
      @JsonProp({ type: 'string' })
      city!: string;
    }

    @Serializable()
    class Person {
      @JsonProp({ type: 'string' })
      name!: string;

      @JsonProp({ type: Address })
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
