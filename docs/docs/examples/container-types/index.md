---
sidebar_position: 2
---

# Container Types

This section demonstrates how to serialize and deserialize TypeScript container types using Morphio. You'll find examples for:

## Arrays
Learn how to work with various array types:
- Simple arrays of primitives (string[], number[], etc.)
- Arrays of objects (custom class instances)
- Nested arrays (arrays of arrays)
- Optional array properties
- Type validation and safety

## Maps
Explore different map configurations:
- Maps with primitive keys
- Maps with object values
- Nested maps
- Complex key-value combinations
- Custom key serialization

## Approaches
The examples in this section are presented in two formats:

### Decorator-Based
Using TypeScript decorators with proper type information:
```typescript
@Serializable()
class UserList {
  @JsonProp({ type: 'array', items: { type: 'string' } })
  names: string[];

  @JsonProp({ type: 'map', values: { type: 'number' } })
  scores: Map<string, number>;
}
```

### Schema-Based
Manual schema registration for more control:
```typescript
class UserList {
  names: string[];
  scores: Map<string, number>;
}

morphioSchema(UserList, {
  names: { type: 'array', items: { type: 'string' }, required: true },
  scores: { type: 'map', values: { type: 'number' }, required: true }
});
```

Each example demonstrates proper type handling and validation for container types.

## Arrays of Basic Types

```typescript
@Serializable()
class TodoList {
  @JsonProp({ type: 'array', items: { type: 'string' } })
  tags: string[];

  @JsonProp({ type: 'array', items: { type: 'number' } })
  priorities: number[];
}

// Usage
const json = {
  tags: ["groceries", "home"],
  priorities: [1, 2, 3]
};

const list = deserialize(TodoList, json);
console.log(list.tags); // ["groceries", "home"]
console.log(list.priorities); // [1, 2, 3]
```

## Nested Objects

```typescript
@Serializable()
class Address {
  @JsonProp({ type: 'string' })
  street: string;

  @JsonProp({ type: 'string' })
  city: string;

  @JsonProp({ type: 'string' })
  country: string;
}

@Serializable()
class User {
  @JsonProp({ type: 'string' })
  name: string;

  @JsonProp({ type: 'object', properties: Address })
  address: Address;
}

// Usage
const json = {
  name: "John Doe",
  address: {
    street: "123 Main St",
    city: "New York",
    country: "USA"
  }
};

const user = deserialize(User, json);
console.log(user.name); // "John Doe"
console.log(user.address.street); // "123 Main St"
```

## Arrays of Objects

```typescript
@Serializable()
class Comment {
  @JsonProp({ type: 'string' })
  author: string;

  @JsonProp({ type: 'string' })
  text: string;
}

@Serializable()
class BlogPost {
  @JsonProp({ type: 'string' })
  title: string;

  @JsonProp({ type: 'array', items: { type: 'object', properties: Comment } })
  comments: Comment[];
}

// Usage
const json = {
  title: "My First Post",
  comments: [
    {
      author: "Alice",
      text: "Great post!"
    },
    {
      author: "Bob",
      text: "Thanks for sharing"
    }
  ]
};

const post = deserialize(BlogPost, json);
console.log(post.title); // "My First Post"
console.log(post.comments[0].author); // "Alice"
```

## Maps

```typescript
@Serializable()
class Cache {
  @JsonProp({ type: 'map', values: { type: 'number' } })
  data: Map<string, number>;

  constructor() {
    this.data = new Map();
  }
}

// Usage
const cache = new Cache();
cache.data.set("views", 100);
cache.data.set("likes", 50);

const serialized = serialize(cache);
console.log(serialized);
// {
//   data: {
//     views: 100,
//     likes: 50
//   }
// }

const deserialized = deserialize(Cache, serialized);
console.log(deserialized.data.get("views")); // 100
```

## Nested Maps and Arrays

```typescript
@Serializable()
class Analytics {
  @JsonProp({ type: 'map', values: { type: 'array', items: { type: 'number' } } })
  metrics: Map<string, number[]>;

  constructor() {
    this.metrics = new Map();
  }
}

// Usage
const analytics = new Analytics();
analytics.metrics.set("daily_views", [100, 150, 200]);
analytics.metrics.set("daily_likes", [10, 15, 20]);

const serialized = serialize(analytics);
console.log(serialized);
// {
//   metrics: {
//     daily_views: [100, 150, 200],
//     daily_likes: [10, 15, 20]
//   }
// }

const deserialized = deserialize(Analytics, serialized);
console.log(deserialized.metrics.get("daily_views")); // [100, 150, 200]
```
