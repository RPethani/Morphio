# Advanced Features

## Custom Type Handling

Morphio provides flexibility in handling custom types and complex scenarios.

### Custom Type Transformations

You can implement custom type transformations for special cases:

```typescript
@Serializable()
class CustomType {
  @JsonProp({
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
@Serializable()
class Library {
  @JsonProp({ type: 'string', required: true })
  name: string;

  @JsonProp({ type: [[Book]], required: true })
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
@Serializable()
class Cache {
  @JsonProp({ type: Map, required: true, keyType: 'string', valueType: 'any' })
  data: Map<string, any>;

  constructor() {
    this.data = new Map();
  }
}
```

## Schema Operations

### Custom Schema Names

```typescript
@Serializable({ name: 'CustomUser' })
class User {
  @JsonProp({ type: 'string', required: true })
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
@Serializable()
class SafeClass {
  @JsonProp({ type: 'string', required: true })
  id!: string;  // Use definite assignment assertion

  @JsonProp({ type: 'number', required: false })
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
@Serializable()
class LargeData {
  @JsonProp({ type: [DataChunk], required: true })
  chunks: DataChunk[];

  async *processChunks() {
    for (const chunk of this.chunks) {
      yield await processChunk(chunk);
    }
  }
}
```
