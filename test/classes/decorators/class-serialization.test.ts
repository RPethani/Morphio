import 'reflect-metadata';
import { serialize, MorphProp, MorphSchema } from '../../../src';

describe('Class Serialization', () => {
  describe('Basic class serialization', () => {
    @MorphSchema()
    class BasicUser {
      name?: string;
      age?: number;
    }

    it('should serialize a class without MorphProp using fallback', () => {
      const user = new BasicUser();
      user.name = 'Jane';
      user.age = 28;

      const json = serialize(user);
      expect(json).toEqual({ name: 'Jane', age: 28 });
    });
  });

  describe('Decorated class serialization', () => {
    @MorphSchema()
    class DecoratedUser {
      @MorphProp({ type: 'string' })
      name?: string;

      @MorphProp({ type: 'number' })
      age?: number;

      @MorphProp({ type: 'string' })
      email?: string;
    }

    it('should respect MorphProp decorator', () => {
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

    it('should serialize nested objects if they are serializable', () => {
      const person = new Person();
      person.name = 'Sara';
      person.address = new Address();
      person.address.city = 'Mumbai';

      const json = serialize(person);
      expect(json).toEqual({
        name: 'Sara',
        address: { city: 'Mumbai' },
      });
    });
  });
});
