import 'reflect-metadata';
import { serialize, JsonProp, Serializable } from '../../src';

describe('Class Serialization', () => {
  describe('Basic class serialization', () => {
    @Serializable()
    class BasicUser {
      name?: string;
      age?: number;
    }

    it('should serialize a class without JsonProp using fallback', () => {
      const user = new BasicUser();
      user.name = 'Jane';
      user.age = 28;

      const json = serialize(user);
      expect(json).toEqual({ name: 'Jane', age: 28 });
    });
  });

  describe('Decorated class serialization', () => {
    @Serializable()
    class DecoratedUser {
      @JsonProp({ type: 'string' })
      name?: string;

      @JsonProp({ type: 'number' })
      age?: number;

      @JsonProp({ type: 'string' })
      email?: string;
    }

    it('should respect JsonProp decorator', () => {
      const user = new DecoratedUser();
      user.name = 'Tom';
      user.age = 32;

      const json = serialize(user);
      expect(json).toEqual({ name: 'Tom', age: 32 });
    });

    it('should skip undefined values', () => {
      const user = new DecoratedUser();
      user.name = 'Tom';
      user.email = undefined;

      const json = serialize(user);
      expect(json).toEqual({ name: 'Tom' });
    });
  });

  describe('Nested class serialization', () => {
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

    it('should serialize nested objects if they are serializable', () => {
      const person = new Person();
      person.name = 'Sara';
      person.address = new Address();
      person.address.city = 'Mumbai';

      const json = serialize(person);
      expect(json).toEqual({ 
        name: 'Sara', 
        address: { city: 'Mumbai' } 
      });
    });
  });
});
