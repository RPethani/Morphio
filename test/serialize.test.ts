import 'reflect-metadata';
import {JsonProp, Serializable, serialize} from '../src';

describe('Morphio serialization engine', () => {
  it('should serialize a class without JsonProp using fallback', () => {
    @Serializable()
    class BasicUser {
      name?: string;
      age?: number;
    }

    const user = new BasicUser();
    user.name = 'Jane';
    user.age = 28;

    const json = serialize(user);
    expect(json).toEqual({name: 'Jane', age: 28});
  });

  it('should respect JsonProp decorator and skip undefined/null values', () => {
    @Serializable()
    class DecoratedUser {
      @JsonProp({type: 'string'})
      name?: string;

      @JsonProp({type: 'number'})
      age?: number;

      @JsonProp({type: 'string'})
      email?: string;
    }

    const user = new DecoratedUser();
    user.name = 'Tom';
    user.age = 32;
    user.email = undefined;

    const json = serialize(user);
    expect(json).toEqual({name: 'Tom', age: 32});
  });

  it('should serialize nested objects if they are serializable', () => {
    @Serializable()
    class Address {
      @JsonProp({type: 'string'})
      city!: string;
    }

    @Serializable()
    class Person {
      @JsonProp({type: 'string'})
      name!: string;

      @JsonProp({type: Address})
      address!: Address;
    }

    const person = new Person();
    person.name = 'Sara';
    person.address = new Address();
    person.address.city = 'Mumbai';

    const json = serialize(person);
    expect(json).toEqual({name: 'Sara', address: {city: 'Mumbai'}});
  });
});
