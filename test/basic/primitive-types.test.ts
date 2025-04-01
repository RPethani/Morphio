import 'reflect-metadata';
import { deserialize, serialize, MorphProp, MorphSchema } from '../../src';

describe('Primitive Types Serialization/Deserialization', () => {
  describe('String type', () => {
    @MorphSchema()
    class StringContainer {
      @MorphProp({ type: 'string' })
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
    @MorphSchema()
    class NumberContainer {
      @MorphProp({ type: 'number' })
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

    it('should handle zero', () => {
      const container = new NumberContainer();
      container.value = 0;

      const serialized = serialize(container);
      expect(serialized).toEqual({ value: 0 });

      const deserialized = deserialize(serialized, NumberContainer);
      expect(deserialized.value).toBe(0);
    });
  });

  describe('Boolean type', () => {
    @MorphSchema()
    class BooleanContainer {
      @MorphProp({ type: 'boolean' })
      value!: boolean;
    }

    it('should handle true value', () => {
      const container = new BooleanContainer();
      container.value = true;

      const serialized = serialize(container);
      expect(serialized).toEqual({ value: true });

      const deserialized = deserialize(serialized, BooleanContainer);
      expect(deserialized.value).toBe(true);
    });

    it('should handle false value', () => {
      const container = new BooleanContainer();
      container.value = false;

      const serialized = serialize(container);
      expect(serialized).toEqual({ value: false });

      const deserialized = deserialize(serialized, BooleanContainer);
      expect(deserialized.value).toBe(false);
    });
  });

  describe('BigInt type', () => {
    @MorphSchema()
    class BigIntContainer {
      @MorphProp({ type: 'bigint' })
      value!: bigint;
    }

    it('should handle positive bigint values', () => {
      const container = new BigIntContainer();
      container.value = BigInt('9007199254740991');

      const serialized = serialize(container);
      expect(serialized).toEqual({ value: '9007199254740991' });

      const deserialized = deserialize(serialized, BigIntContainer);
      expect(deserialized.value).toBe(BigInt('9007199254740991'));
    });

    it('should handle negative bigint values', () => {
      const container = new BigIntContainer();
      container.value = BigInt('-9007199254740991');

      const serialized = serialize(container);
      expect(serialized).toEqual({ value: '-9007199254740991' });

      const deserialized = deserialize(serialized, BigIntContainer);
      expect(deserialized.value).toBe(BigInt('-9007199254740991'));
    });

    it('should handle zero bigint value', () => {
      const container = new BigIntContainer();
      container.value = BigInt(0);

      const serialized = serialize(container);
      expect(serialized).toEqual({ value: '0' });

      const deserialized = deserialize(serialized, BigIntContainer);
      expect(deserialized.value).toBe(BigInt(0));
    });
  });

  describe('Date type', () => {
    @MorphSchema()
    class DateContainer {
      @MorphProp({ type: 'date' })
      value!: Date;
    }

    it('should handle current date', () => {
      const container = new DateContainer();
      const now = new Date();
      container.value = now;

      const serialized = serialize(container);
      expect(serialized).toEqual({ value: now.toISOString() });

      const deserialized = deserialize(serialized, DateContainer);
      expect(deserialized.value).toEqual(now);
    });

    it('should handle date strings', () => {
      const container = new DateContainer();
      const dateStr = '2025-04-01T08:30:00.000Z';
      container.value = new Date(dateStr);

      const serialized = serialize(container);
      expect(serialized).toEqual({ value: dateStr });

      const deserialized = deserialize(serialized, DateContainer);
      expect(deserialized.value).toEqual(new Date(dateStr));
    });

    it('should handle epoch date', () => {
      const container = new DateContainer();
      const epochDate = new Date(0);
      container.value = epochDate;

      const serialized = serialize(container);
      expect(serialized).toEqual({ value: epochDate.toISOString() });

      const deserialized = deserialize(serialized, DateContainer);
      expect(deserialized.value).toEqual(epochDate);
    });
  });
});
