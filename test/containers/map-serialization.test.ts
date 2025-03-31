import 'reflect-metadata';
import { deserialize, JsonProp, Serializable, serialize } from '../../src';

describe('Map Serialization/Deserialization', () => {
  describe('Simple maps', () => {
    @Serializable()
    class StringMapContainer {
      @JsonProp({ type: { container: 'map', itemType: 'string' } })
      map!: Map<string, string>;

      getMapSize() {
        return this.map.size;
      }
    }

    it('should handle map of strings', () => {
      const container = new StringMapContainer();
      container.map = new Map([
        ['key1', 'value1'],
        ['key2', 'value2']
      ]);

      const serialized = serialize(container);
      expect(serialized).toEqual({ 
        map: { 
          key1: 'value1', 
          key2: 'value2' 
        } 
      });

      const deserialized = deserialize(serialized, StringMapContainer);
      expect(deserialized.getMapSize()).toBe(2);
      expect(deserialized.map.get('key1')).toBe('value1');
      expect(deserialized.map.get('key2')).toBe('value2');
    });
  });

  describe('Maps with object values', () => {
    @Serializable()
    class Value {
      @JsonProp({ type: 'number' })
      count!: number;

      getCount() {
        return this.count;
      }
    }

    @Serializable()
    class ObjectMapContainer {
      @JsonProp({ type: { container: 'map', itemType: Value } })
      map!: Map<string, Value>;

      getMapSize() {
        return this.map.size;
      }
    }

    it('should serialize and deserialize a Map with serializable values', () => {
      const container = new ObjectMapContainer();
      container.map = new Map([
        ['one', Object.assign(new Value(), { count: 1 })],
        ['two', Object.assign(new Value(), { count: 2 })]
      ]);

      const serialized = serialize(container);
      expect(serialized).toEqual({
        map: {
          one: { count: 1 },
          two: { count: 2 }
        }
      });

      const deserialized = deserialize(serialized, ObjectMapContainer);
      expect(deserialized).toBeInstanceOf(ObjectMapContainer);
      expect(deserialized.getMapSize()).toBe(2);
      expect(deserialized.map.get('one')).toBeInstanceOf(Value);
      expect(deserialized.map.get('one')?.getCount()).toBe(1);
    });
  });

  describe('Empty maps', () => {
    @Serializable()
    class EmptyMapContainer {
      @JsonProp({ type: { container: 'map', itemType: 'string' } })
      map!: Map<string, string>;
    }

    it('should handle empty maps', () => {
      const container = new EmptyMapContainer();
      container.map = new Map();

      const serialized = serialize(container);
      expect(serialized).toEqual({ map: {} });

      const deserialized = deserialize(serialized, EmptyMapContainer);
      expect(deserialized.map.size).toBe(0);
    });
  });
});
