# Advanced Features

## Custom Type Handling

Morphio provides flexibility in handling custom types and complex scenarios.

### Custom Type Transformations

You can implement custom type transformations for special cases:

```typescript
@MorphSchema()
class CustomType {
  @MorphProp({
    type: 'string',
    required: true,
    transform: {
      serialize: (value: Date) => value.toISOString(),
      deserialize: (value: string) => new Date(value),
    },
  })
  date: Date;

  constructor() {
    this.date = new Date();
  }
}
```

### Nested Arrays

Handling arrays of complex types:

```typescript
@MorphSchema()
class Library {
  @MorphProp({ type: 'string', required: true })
  name: string;

  @MorphProp({ type: [[Book]], required: true })
  shelves: Book[][];

  constructor() {
    this.name = '';
    this.shelves = [];
  }
}
```

### Map Types

Working with Map objects:

```typescript
@MorphSchema()
class Cache {
  @MorphProp({ type: Map, required: true, keyType: 'string', valueType: 'any' })
  data: Map<string, any>;

  constructor() {
    this.data = new Map();
  }
}
```

## Schema Operations

### Custom Schema Names

```typescript
@MorphSchema({ name: 'CustomUser' })
class User {
  @MorphProp({ type: 'string', required: true })
  name: string;
}
```

### Schema Registry

Accessing the schema registry:

```typescript
import { morphioSchema } from 'morphio';

const userSchema = morphioSchema.get(User);
console.log(userSchema.properties);
```

## Best Practices

### Type Safety

Always specify types explicitly:

```typescript
@MorphSchema()
class SafeClass {
  @MorphProp({ type: 'string', required: true })
  id!: string;  // Use definite assignment assertion

  @MorphProp({ type: 'number', required: false })
  count?: number;  // Mark optional properties with ?
}
```

### Error Handling

Implement proper error handling:

```typescript
try {
  const data = deserialize(invalidJson, MyClass);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation failed:', error.message);
  } else {
    console.error('Deserialization failed:', error);
  }
}
```

### Memory Management

For large datasets, consider streaming:

```typescript
@MorphSchema()
class LargeData {
  @MorphProp({ type: [DataChunk], required: true })
  chunks: DataChunk[];

  async *processChunks() {
    for (const chunk of this.chunks) {
      yield await processChunk(chunk);
    }
  }
}
```
