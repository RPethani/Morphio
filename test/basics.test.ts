import 'reflect-metadata';
import {Morphio} from '../src/Morphio';
import {Serializable} from "../src/decorators/serializable.decorator";
import {JsonProp} from "../src/decorators/json-prop.decorator";

describe('Morphio', () => {
  it('should directly assign serialized values to class properties', () => {
    @Serializable()
    class TestClass {
      name?: string;
      age?: number;
    }
    const jsonString = '{"name": "John Doe", "age": 30}';
    const result = Morphio.parseToClass(jsonString, TestClass);

    expect(result).toBeInstanceOf(TestClass);
    expect(result.name).toBe('John Doe');
    expect(result.age).toBe(30);
  });

  it('should use JsonProp decorator for special cases', () => {
    @Serializable()
    class TestClass {
      name?: string;

      @JsonProp({type: 'number', required: false})
      age?: number;
    }

    const jsonString = '{"name": "John Doe"}'; // 'age' is optional and missing
    const result = Morphio.parseToClass(jsonString, TestClass);

    expect(result).toBeInstanceOf(TestClass);
    expect(result.name).toBe('John Doe');
    expect(result.age).toBeUndefined();
  });
});
