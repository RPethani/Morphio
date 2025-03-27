import 'reflect-metadata';
import { deserialize, JsonProp, Serializable } from '../src';

describe('Morphio deserialization engine', () => {
  it('should assign values without JsonProp using fallback', () => {
    @Serializable()
    class TestClass {
      name?: string;
      age?: number;
    }

    const jsonString = '{"name": "John Doe", "age": 30}';
    const result = deserialize(jsonString, TestClass);
    console.log(result);
    expect(result).toBeInstanceOf(TestClass);
    expect(result.name).toBe('John Doe');
    expect(result.age).toBe(30);
  });

  it('should respect JsonProp decorator and optional fields', () => {
    @Serializable()
    class TestClass {
      name?: string;

      @JsonProp({ type: 'number', required: false })
      age?: number;
    }

    const jsonString = '{"name": "John Doe"}';
    const result = deserialize(jsonString, TestClass);

    expect(result).toBeInstanceOf(TestClass);
    expect(result.name).toBe('John Doe');
    expect(result.age).toBeUndefined();
  });
});
