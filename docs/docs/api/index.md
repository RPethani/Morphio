# Morphio - TypeScript Serialization Library

![Morphio Logo](_media/morphio.png)

Morphio is a powerful and flexible TypeScript library for serialization and deserialization of objects. It provides robust support for complex data structures, type safety, and multiple approaches to schema definition. Perfect for applications that need to handle complex JSON transformations while maintaining strong typing.

## Features

- **Multiple Schema Definition Approaches**:

  - **Decorator-based**: Use `@MorphProp` and `@MorphSchema` decorators for a clean, declarative style
  - **Declarative**: Define schemas programmatically using `morphioSchema`
  - **Interface-based**: Work with interfaces and runtime type information

- **Rich Type Support**:

  - Primitive types (string, number, boolean, Date)
  - Complex containers (Array, Map)
  - Nested objects and inheritance
  - Inline object definitions
  - Optional properties

- **Advanced Features**:
  - Type-safe serialization and deserialization
  - Automatic type inference
  - Forgiving deserialization with proper error handling
  - Extensible processor architecture
  - Comprehensive schema validation

## Installation

```bash
npm install morphio
```

## Usage Examples

### Decorator-Based Approach

```typescript
import { MorphSchema, MorphProp, serialize, deserialize } from 'morphio';

@MorphSchema()
class UserProfile {
  @MorphProp({ type: 'string', required: true })
  name: string;

  @MorphProp({ type: 'number' })
  age?: number;

  @MorphProp({
    type: {
      container: 'array',
      itemType: 'string',
    },
  })
  tags: string[] = [];

  @MorphProp({
    type: {
      container: 'map',
      itemType: 'number',
    },
  })
  scores: Map<string, number> = new Map();
}

// Create and populate an instance
const user = new UserProfile();
user.name = 'John Doe';
user.age = 30;
user.tags = ['developer', 'typescript'];
user.scores.set('math', 95);

// Serialize to JSON
const json = serialize(user);
console.log(json);
// {
//   "name": "John Doe",
//   "age": 30,
//   "tags": ["developer", "typescript"],
//   "scores": { "math": 95 }
// }

// Deserialize back to class instance
const deserialized = deserialize(json, UserProfile);
console.log(deserialized instanceof UserProfile); // true
```

### Declarative Approach

```typescript
import { morphioSchema } from 'morphio';

class Location {
  latitude: number;
  longitude: number;
}

// Define schema programmatically
morphioSchema(Location, {
  latitude: { type: 'number', required: true },
  longitude: { type: 'number', required: true },
});

// Use the schema for serialization/deserialization
const loc = new Location();
loc.latitude = 40.7128;
loc.longitude = -74.006;

const json = serialize(loc);
const deserialized = deserialize(json, Location);
```

### Inline Objects

```typescript
@MorphSchema()
class BlogPost {
  @MorphProp({ type: 'string' })
  title: string;

  @MorphProp({
    type: {
      properties: {
        name: { type: 'string', required: true },
        email: { type: 'string', required: true },
      },
    },
  })
  author: { name: string; email: string };
}

## Documentation

For detailed documentation, including:

- API Reference
- Advanced Usage Guide
- Best Practices
- Migration Guide

Visit our [API Reference](https://rpethani.github.io/Morphio/docs/api) for detailed information about all the public APIs exposed by Morphio.

## Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/RPethani/Morphio/blob/main/CONTRIBUTING.md) for:

- Development setup
- Coding standards
- Pull request process
- Testing requirements

## Testing

Morphio has extensive test coverage. Run the test suite:

```bash
npm test
```

## License

Morphio is licensed under the [MIT License](https://github.com/RPethani/Morphio/blob/main/LICENSE).

## Support

Need help?

1. Check the [API Reference](https://rpethani.github.io/Morphio/docs/api)
2. Search [existing issues](https://github.com/RPethani/Morphio/issues)
3. Create a new issue

## Acknowledgments

Special thanks to all contributors who have helped make Morphio better!
