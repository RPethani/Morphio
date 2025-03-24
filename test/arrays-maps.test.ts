import 'reflect-metadata';
import { serialize } from '../src/engine/serialize';
import { deserialize } from '../src/engine/deserialize';
import { Serializable } from '../src/decorators/serializable.decorator';
import { JsonProp } from '../src/decorators/json-prop.decorator';

describe('Morphio array and map serialization/deserialization', () => {
  it('should serialize and deserialize arrays of serializable objects', () => {
    @Serializable()
    class Item {
      @JsonProp({ type: 'string' })
      name!: string;
    }

    @Serializable()
    class Container {
      @JsonProp({ type: Item, container: 'array' })
      items!: Item[];
    }

    const c = new Container();
    const item1 = new Item(); item1.name = 'A';
    const item2 = new Item(); item2.name = 'B';
    c.items = [item1, item2];

    const serialized = serialize(c);
    expect(serialized).toEqual({ items: [{ name: 'A' }, { name: 'B' }] });

    const deserialized = deserialize(serialized, Container);
    expect(deserialized).toBeInstanceOf(Container);
    expect(deserialized.items.length).toBe(2);
    expect(deserialized.items[0]).toBeInstanceOf(Item);
    expect(deserialized.items[0].name).toBe('A');
  });

  it('should serialize and deserialize a Map with serializable values', () => {
    @Serializable()
    class Value {
      @JsonProp({ type: 'number' })
      count!: number;
    }

    @Serializable()
    class Holder {
      @JsonProp({ type: Value, container: 'map', valueType: Value })
      map!: Map<string, Value>;
    }

    const h = new Holder();
    h.map = new Map([
      ['one', Object.assign(new Value(), { count: 1 })],
      ['two', Object.assign(new Value(), { count: 2 })]
    ]);

    const serialized = serialize(h);
    expect(serialized).toEqual({ map: { one: { count: 1 }, two: { count: 2 } } });

    const deserialized = deserialize(serialized, Holder);
    expect(deserialized.map instanceof Map).toBe(true);
    expect(deserialized.map.get('one')).toBeInstanceOf(Value);
    expect(deserialized.map.get('one')?.count).toBe(1);
  });
});
