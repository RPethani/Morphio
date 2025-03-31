import 'reflect-metadata';
import { deserialize, serialize, JsonProp, Serializable } from '../../src';

describe('Primitive Types Serialization/Deserialization', () => {
  describe('String type', () => {
    @Serializable()
    class StringContainer {
      @JsonProp({ type: 'string' })
      value!: string;
    }

    it('should handle string values', () => {
      const container = new StringContainer();
      container.value = 'test';
      
      const serialized = serialize(container);
      expect(serialized).toEqual({ value: 'test' });
      
      const deserialized = deserialize(serialized, StringContainer);
      expect(deserialized.value).toBe('test');
    });

    it('should handle empty strings', () => {
      const container = new StringContainer();
      container.value = '';
      
      const serialized = serialize(container);
      expect(serialized).toEqual({ value: '' });
      
      const deserialized = deserialize(serialized, StringContainer);
      expect(deserialized.value).toBe('');
    });
  });

  describe('Number type', () => {
    @Serializable()
    class NumberContainer {
      @JsonProp({ type: 'number' })
      value!: number;
    }

    it('should handle integer values', () => {
      const container = new NumberContainer();
      container.value = 42;
      
      const serialized = serialize(container);
      expect(serialized).toEqual({ value: 42 });
      
      const deserialized = deserialize(serialized, NumberContainer);
      expect(deserialized.value).toBe(42);
    });

    it('should handle floating point values', () => {
      const container = new NumberContainer();
      container.value = 3.14;
      
      const serialized = serialize(container);
      expect(serialized).toEqual({ value: 3.14 });
      
      const deserialized = deserialize(serialized, NumberContainer);
      expect(deserialized.value).toBe(3.14);
    });
  });

  describe('Boolean type', () => {
    @Serializable()
    class BooleanContainer {
      @JsonProp({ type: 'boolean' })
      value!: boolean;
    }

    it('should handle true values', () => {
      const container = new BooleanContainer();
      container.value = true;
      
      const serialized = serialize(container);
      expect(serialized).toEqual({ value: true });
      
      const deserialized = deserialize(serialized, BooleanContainer);
      expect(deserialized.value).toBe(true);
    });

    it('should handle false values', () => {
      const container = new BooleanContainer();
      container.value = false;
      
      const serialized = serialize(container);
      expect(serialized).toEqual({ value: false });
      
      const deserialized = deserialize(serialized, BooleanContainer);
      expect(deserialized.value).toBe(false);
    });
  });
});
