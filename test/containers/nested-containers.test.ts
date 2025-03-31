import 'reflect-metadata';
import { deserialize, JsonProp, Serializable, serialize } from '../../src';

describe('Nested Containers Serialization/Deserialization', () => {
  describe('Array of Maps', () => {
    @Serializable()
    class Value {
      @JsonProp({ type: 'string' })
      data!: string;
    }

    @Serializable()
    class ArrayOfMapsContainer {
      @JsonProp({ 
        type: { 
          container: 'array', 
          itemType: { 
            container: 'map', 
            itemType: Value 
          } 
        } 
      })
      items!: Map<string, Value>[];

      getItemCount() {
        return this.items.length;
      }
    }

    it('should handle array of maps', () => {
      const container = new ArrayOfMapsContainer();
      container.items = [
        new Map([
          ['a', Object.assign(new Value(), { data: 'A1' })],
          ['b', Object.assign(new Value(), { data: 'B1' })]
        ]),
        new Map([
          ['c', Object.assign(new Value(), { data: 'C2' })]
        ])
      ];

      const serialized = serialize(container);
      expect(serialized).toEqual({
        items: [
          { a: { data: 'A1' }, b: { data: 'B1' } },
          { c: { data: 'C2' } }
        ]
      });

      const deserialized = deserialize(serialized, ArrayOfMapsContainer);
      expect(deserialized.getItemCount()).toBe(2);
      expect(deserialized.items[0].get('a')?.data).toBe('A1');
      expect(deserialized.items[1].get('c')?.data).toBe('C2');
    });
  });

  describe('Map of Arrays', () => {
    @Serializable()
    class Item {
      @JsonProp({ type: 'string' })
      name!: string;
    }

    @Serializable()
    class MapOfArraysContainer {
      @JsonProp({ 
        type: { 
          container: 'map', 
          itemType: { 
            container: 'array', 
            itemType: Item 
          } 
        } 
      })
      map!: Map<string, Item[]>;

      getMapSize() {
        return this.map.size;
      }
    }

    it('should handle map of arrays', () => {
      const container = new MapOfArraysContainer();
      container.map = new Map([
        ['group1', [
          Object.assign(new Item(), { name: 'A' }),
          Object.assign(new Item(), { name: 'B' })
        ]],
        ['group2', [
          Object.assign(new Item(), { name: 'C' })
        ]]
      ]);

      const serialized = serialize(container);
      expect(serialized).toEqual({
        map: {
          group1: [{ name: 'A' }, { name: 'B' }],
          group2: [{ name: 'C' }]
        }
      });

      const deserialized = deserialize(serialized, MapOfArraysContainer);
      expect(deserialized.getMapSize()).toBe(2);
      expect(deserialized.map.get('group1')?.[0].name).toBe('A');
      expect(deserialized.map.get('group2')?.[0].name).toBe('C');
    });
  });
});
