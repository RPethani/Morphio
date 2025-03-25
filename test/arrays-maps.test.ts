import 'reflect-metadata';
import {deserialize, JsonProp, Serializable, serialize} from '../src';

describe('Morphio array and map serialization/deserialization', () => {
  it('should serialize and deserialize arrays of serializable objects', () => {
    @Serializable()
    class Item {
      @JsonProp({type: 'string'})
      name!: string;

      // Method to verify class type
      getName() {
        return this.name;
      }
    }

    @Serializable()
    class Container {
      @JsonProp({type: {container: 'array', itemType: Item}})
      items!: Item[];

      // Method to verify class type
      getItemCount() {
        return this.items.length;
      }
    }

    const c = new Container();
    const item1 = new Item();
    item1.name = 'A';
    const item2 = new Item();
    item2.name = 'B';
    c.items = [item1, item2];

    const serialized = serialize(c);
    expect(serialized).toEqual({items: [{name: 'A'}, {name: 'B'}]});

    const deserialized = deserialize(serialized, Container);
    expect(deserialized).toBeInstanceOf(Container);
    expect(deserialized.getItemCount()).toBe(2);
    expect(deserialized.items[0]).toBeInstanceOf(Item);
    expect(deserialized.items[0].getName()).toBe('A');
  });

  it('should serialize and deserialize a Map with serializable values', () => {
    @Serializable()
    class Value {
      @JsonProp({type: 'number'})
      count!: number;

      // Method to verify class type
      getCount() {
        return this.count;
      }
    }

    @Serializable()
    class Holder {
      @JsonProp({type: {container: 'map', itemType: Value}})
      map!: Map<string, Value>;

      // Method to verify class type
      getMapSize() {
        return this.map.size;
      }
    }

    const h = new Holder();
    h.map = new Map([
      ['one', Object.assign(new Value(), {count: 1})],
      ['two', Object.assign(new Value(), {count: 2})]
    ]);

    const serialized = serialize(h);
    expect(serialized).toEqual({map: {one: {count: 1}, two: {count: 2}}});

    const deserialized = deserialize(serialized, Holder);
    expect(deserialized).toBeInstanceOf(Holder);
    expect(deserialized.getMapSize()).toBe(2);
    expect(deserialized.map.get('one')).toBeInstanceOf(Value);
    expect(deserialized.map.get('one')?.getCount()).toBe(1);
  });

  it('should serialize and deserialize nested arrays and maps', () => {
    @Serializable()
    class Address {
      @JsonProp({type: 'string'})
      street!: string;

      // Method to verify class type
      getStreet() {
        return this.street;
      }
    }

    @Serializable()
    class Container {
      @JsonProp({type: {container: 'array', itemType: Address}})
      addresses!: Address[];

      @JsonProp({type: {container: 'map', itemType: Address}})
      addressMap!: Map<string, Address>;

      // Method to verify class type
      getAddressCount() {
        return this.addresses.length;
      }
    }

    const c = new Container();
    const address1 = new Address();
    address1.street = 'Street 1';
    const address2 = new Address();
    address2.street = 'Street 2';

    c.addresses = [address1, address2];
    c.addressMap = new Map([
      ['home', address1],
      ['office', address2]
    ]);

    const serialized = serialize(c);
    expect(serialized).toEqual({
      addresses: [{street: 'Street 1'}, {street: 'Street 2'}],
      addressMap: {home: {street: 'Street 1'}, office: {street: 'Street 2'}}
    });

    const deserialized = deserialize(serialized, Container);
    expect(deserialized).toBeInstanceOf(Container);
    expect(deserialized.getAddressCount()).toBe(2);
    expect(deserialized.addresses[0]).toBeInstanceOf(Address);
    expect(deserialized.addresses[0].getStreet()).toBe('Street 1');
  });

  it('should serialize and deserialize a Map with arrays of serializable objects as values', () => {
    @Serializable()
    class Item {
      @JsonProp({type: 'string'})
      name!: string;

      // Method to verify class type
      getName() {
        return this.name;
      }
    }

    @Serializable()
    class Holder {
      @JsonProp({type: {container: 'map', itemType: {container: 'array', itemType: Item}}})
      map!: Map<string, Item[]>;

      // Method to verify class type
      getMapSize() {
        return this.map.size;
      }
    }

    const h = new Holder();
    const item1 = new Item();
    item1.name = 'A';
    const item2 = new Item();
    item2.name = 'B';
    h.map = new Map([
      ['group1', [item1, item2]],
      ['group2', [item1]]
    ]);

    const serialized = serialize(h);
    expect(serialized).toEqual({
      map: {
        group1: [{name: 'A'}, {name: 'B'}],
        group2: [{name: 'A'}]
      }
    });

    const deserialized = deserialize(serialized, Holder);
    expect(deserialized).toBeInstanceOf(Holder);
    expect(deserialized.getMapSize()).toBe(2);
    expect(deserialized.map.get('group1')?.length).toBe(2);
    expect(deserialized.map.get('group1')?.[0].getName()).toBe('A');
  });

  it('should handle deeply nested collections like Array<Map<string, Array<Address>>>', () => {
    @Serializable()
    class Address {
      @JsonProp({type: 'string'})
      street!: string;

      // Method to verify class type
      getStreet() {
        return this.street;
      }
    }

    @Serializable()
    class ComplexContainer {
      @JsonProp({type: {container: 'array', itemType: Address}})
      addresses!: Address[];

      @JsonProp({type: {container: 'array', itemType: {container: 'map', itemType: Address}}})
      addressGroups!: Map<string, Address>[];  // Array of Maps

      // Method to verify class type
      getAddressCount() {
        return this.addresses.length;
      }
    }

    const c = new ComplexContainer();
    const address1 = new Address();
    address1.street = 'Street 1';
    const address2 = new Address();
    address2.street = 'Street 2';

    c.addresses = [address1, address2];
    c.addressGroups = [
      new Map([['home', address1]]),
      new Map([['office', address2]])
    ];

    const serialized = serialize(c);
    expect(serialized).toEqual({
      addresses: [{street: 'Street 1'}, {street: 'Street 2'}],
      addressGroups: [
        {home: {street: 'Street 1'}},
        {office: {street: 'Street 2'}}
      ]
    });

    const deserialized = deserialize(serialized, ComplexContainer);
    expect(deserialized).toBeInstanceOf(ComplexContainer);
    expect(deserialized.getAddressCount()).toBe(2);
    expect(deserialized.addressGroups[0] instanceof Map).toBe(true);
    expect(deserialized.addressGroups[0].get('home')?.getStreet()).toBe('Street 1');
  });
});
