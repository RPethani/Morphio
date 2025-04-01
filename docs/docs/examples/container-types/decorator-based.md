---
sidebar_position: 1
---

# Container Types with Decorators

This section demonstrates how to use decorators to work with arrays and maps.

## Arrays

### Arrays of Primitive Types

```typescript
import { deserialize, JsonProp, Serializable, serialize } from 'morphio';

@MorphSchema()
class StringArrayContainer {
  @MorphProp({ type: { container: 'array', itemType: 'string' } })
  items!: string[];
}

// Usage
const container = new StringArrayContainer();
container.items = ['one', 'two', 'three'];

const serialized = serialize(container);
console.log(serialized);
// {
//   items: ['one', 'two', 'three']
// }

const deserialized = deserialize(serialized, StringArrayContainer);
console.log(deserialized.items); // ['one', 'two', 'three']

// Empty array example
const emptyContainer = new StringArrayContainer();
emptyContainer.items = [];

const serializedEmpty = serialize(emptyContainer);
console.log(serializedEmpty); // { items: [] }
```

### Arrays of Objects

```typescript
@MorphSchema()
class Item {
  @MorphProp({ type: 'string' })
  name!: string;

  getName() {
    return this.name;
  }
}

@MorphSchema()
class Container {
  @MorphProp({ type: { container: 'array', itemType: Item } })
  items!: Item[];

  getItemCount() {
    return this.items.length;
  }
}

// Usage
const container = new Container();
const item1 = new Item();
item1.name = 'A';
const item2 = new Item();
item2.name = 'B';
container.items = [item1, item2];

const serialized = serialize(container);
console.log(serialized);
// {
//   items: [
//     { name: 'A' },
//     { name: 'B' }
//   ]
// }

const deserialized = deserialize(serialized, Container);
console.log(deserialized.getItemCount()); // 2
console.log(deserialized.items[0].getName()); // 'A'
```

## Maps

### Maps with Primitive Values

```typescript
@MorphSchema()
class StringMapContainer {
  @MorphProp({ type: { container: 'map', itemType: 'string' } })
  map!: Map<string, string>;

  getMapSize() {
    return this.map.size;
  }
}

// Usage
const container = new StringMapContainer();
container.map = new Map([
  ['key1', 'value1'],
  ['key2', 'value2']
]);

const serialized = serialize(container);
console.log(serialized);
// {
//   map: {
//     key1: 'value1',
//     key2: 'value2'
//   }
// }

const deserialized = deserialize(serialized, StringMapContainer);
console.log(deserialized.getMapSize()); // 2
console.log(deserialized.map.get('key1')); // 'value1'
```

### Maps with Object Values

```typescript
@MorphSchema()
class Value {
  @MorphProp({ type: 'number' })
  count!: number;

  getCount() {
    return this.count;
  }
}

@MorphSchema()
class ObjectMapContainer {
  @MorphProp({ type: { container: 'map', itemType: Value } })
  map!: Map<string, Value>;

  getMapSize() {
    return this.map.size;
  }
}

// Usage
const container = new ObjectMapContainer();
container.map = new Map([
  ['one', Object.assign(new Value(), { count: 1 })],
  ['two', Object.assign(new Value(), { count: 2 })]
]);

const serialized = serialize(container);
console.log(serialized);
// {
//   map: {
//     one: { count: 1 },
//     two: { count: 2 }
//   }
// }

const deserialized = deserialize(serialized, ObjectMapContainer);
console.log(deserialized.getMapSize()); // 2
console.log(deserialized.map.get('one')?.getCount()); // 1
```

### Empty Maps

```typescript
@MorphSchema()
class EmptyMapContainer {
  @MorphProp({ type: { container: 'map', itemType: 'string' } })
  map!: Map<string, string>;
}

// Usage
const container = new EmptyMapContainer();
container.map = new Map();

const serialized = serialize(container);
console.log(serialized); // { map: {} }

const deserialized = deserialize(serialized, EmptyMapContainer);
console.log(deserialized.map.size); // 0
```

These examples demonstrate:
1. Working with arrays of primitive types and objects
2. Working with maps of primitive types and objects
3. Proper type declarations for containers
4. Methods on container classes
5. Empty container handling

All examples are taken directly from working test cases in the Morphio codebase.
