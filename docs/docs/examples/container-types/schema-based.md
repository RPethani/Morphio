---
sidebar_position: 2
---

# Container Types with Schema

This section demonstrates how to use manual schema registration to work with arrays and maps.

## Arrays

### Arrays of Objects

```typescript
import { deserialize, morphioSchema, serialize } from 'morphio';

class Tag {
  name!: string;
  color?: string;
}

class Post {
  title!: string;
  tags!: Tag[];
}

// Register schemas
morphioSchema(Tag, {
  name: { type: 'string', required: true },
  color: { type: 'string', required: false },
});

morphioSchema(Post, {
  title: { type: 'string', required: true },
  tags: { type: { container: 'array', itemType: Tag }, required: true },
});

// Usage
const jsonString = JSON.stringify({
  title: 'My Post',
  tags: [
    { name: 'tech', color: 'blue' },
    { name: 'news' }
  ],
});

const deserialized = deserialize(jsonString, Post);
console.log(deserialized.title); // 'My Post'
console.log(deserialized.tags[0].name); // 'tech'
console.log(deserialized.tags[0].color); // 'blue'
console.log(deserialized.tags[1].name); // 'news'
console.log(deserialized.tags[1].color); // undefined

// Serialization
const post = new Post();
post.title = 'My Post';
post.tags = [];

const tag1 = new Tag();
tag1.name = 'tech';
tag1.color = 'blue';

const tag2 = new Tag();
tag2.name = 'news';

post.tags.push(tag1, tag2);

const serialized = serialize(post);
console.log(serialized);
// {
//   title: 'My Post',
//   tags: [
//     { name: 'tech', color: 'blue' },
//     { name: 'news' }
//   ]
// }
```

## Maps

### Maps with Object Values

```typescript
class Score {
  value!: number;
  grade?: string;
}

class StudentRecord {
  name!: string;
  scores!: Map<string, Score>;
}

// Register schemas
morphioSchema(Score, {
  value: { type: 'number', required: true },
  grade: { type: 'string', required: false },
});

morphioSchema(StudentRecord, {
  name: { type: 'string', required: true },
  scores: { type: { container: 'map', itemType: Score }, required: true },
});

// Usage
const jsonString = JSON.stringify({
  name: 'John',
  scores: {
    math: { value: 95, grade: 'A' },
    english: { value: 88 }
  },
});

const deserialized = deserialize(jsonString, StudentRecord);
console.log(deserialized.name); // 'John'
console.log(deserialized.scores.get('math')?.value); // 95
console.log(deserialized.scores.get('math')?.grade); // 'A'
console.log(deserialized.scores.get('english')?.value); // 88
console.log(deserialized.scores.get('english')?.grade); // undefined

// Serialization
const record = new StudentRecord();
record.name = 'John';
record.scores = new Map();

const mathScore = new Score();
mathScore.value = 95;
mathScore.grade = 'A';

const englishScore = new Score();
englishScore.value = 88;

record.scores.set('math', mathScore);
record.scores.set('english', englishScore);

const serialized = serialize(record);
console.log(serialized);
// {
//   name: 'John',
//   scores: {
//     math: { value: 95, grade: 'A' },
//     english: { value: 88 }
//   }
// }
```

## Nested Containers

```typescript
class Category {
  name!: string;
  subcategories!: Map<string, Category[]>;
}

// Register schema
morphioSchema(Category, {
  name: { type: 'string', required: true },
  subcategories: {
    type: {
      container: 'map',
      itemType: {
        container: 'array',
        itemType: Category
      }
    },
    required: true
  },
});

// Usage
const jsonString = JSON.stringify({
  name: 'Electronics',
  subcategories: {
    computers: [
      { name: 'Laptops', subcategories: {} },
      { name: 'Desktops', subcategories: {} }
    ],
    phones: [
      { name: 'Smartphones', subcategories: {} }
    ]
  }
});

const deserialized = deserialize(jsonString, Category);
console.log(deserialized.name); // 'Electronics'
console.log(deserialized.subcategories.get('computers')?.[0].name); // 'Laptops'
```

These examples demonstrate:
1. Schema registration for container types
2. Working with arrays and maps
3. Nested container types
4. Optional properties in container items
5. Complex data structures

All examples are taken directly from working test cases in the Morphio codebase.
