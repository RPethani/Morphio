import 'reflect-metadata';
import { deserialize } from '../src/engine/deserialize';
import { Serializable } from '../src/decorators/serializable.decorator';
import { JsonProp } from '../src/decorators/json-prop.decorator';

describe('Morphio deserialization engine', () => {
  it('should assign values without JsonProp using fallback', () => {
    @Serializable()
    class TestClass {
      name?: string;
      age?: number;
    }

    const jsonString = '{"name": "John Doe", "age": 30}';
    const result = deserialize(jsonString, TestClass);

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
