import 'reflect-metadata';
import { deserialize, JsonProp, Serializable, serialize } from '../../src';

describe('Array Serialization/Deserialization', () => {
  describe('Simple arrays', () => {
    @Serializable()
    class StringArrayContainer {
      @JsonProp({ type: { container: 'array', itemType: 'string' } })
      items!: string[];
    }

    it('should handle array of strings', () => {
      const container = new StringArrayContainer();
      container.items = ['one', 'two', 'three'];

      const serialized = serialize(container);
      expect(serialized).toEqual({ items: ['one', 'two', 'three'] });

      const deserialized = deserialize(serialized, StringArrayContainer);
      expect(deserialized.items).toEqual(['one', 'two', 'three']);
    });
  });

  describe('Arrays of objects', () => {
    @Serializable()
    class Item {
      @JsonProp({ type: 'string' })
      name!: string;

      getName() {
        return this.name;
      }
    }

    @Serializable()
    class Container {
      @JsonProp({ type: { container: 'array', itemType: Item } })
      items!: Item[];

      getItemCount() {
        return this.items.length;
      }
    }

    it('should serialize and deserialize arrays of serializable objects', () => {
      const container = new Container();
      const item1 = new Item();
      item1.name = 'A';
      const item2 = new Item();
      item2.name = 'B';
      container.items = [item1, item2];

      const serialized = serialize(container);
      expect(serialized).toEqual({ items: [{ name: 'A' }, { name: 'B' }] });

      const deserialized = deserialize(serialized, Container);
      expect(deserialized).toBeInstanceOf(Container);
      expect(deserialized.getItemCount()).toBe(2);
      expect(deserialized.items[0]).toBeInstanceOf(Item);
      expect(deserialized.items[0].getName()).toBe('A');
    });
  });

  describe('Empty arrays', () => {
    @Serializable()
    class EmptyArrayContainer {
      @JsonProp({ type: { container: 'array', itemType: 'string' } })
      items!: string[];
    }

    it('should handle empty arrays', () => {
      const container = new EmptyArrayContainer();
      container.items = [];

      const serialized = serialize(container);
      expect(serialized).toEqual({ items: [] });

      const deserialized = deserialize(serialized, EmptyArrayContainer);
      expect(deserialized.items).toEqual([]);
    });
  });
});
