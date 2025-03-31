# Morphio - TypeScript Serialization Library

![Morphio Logo](./assets/morphio.png)

Morphio is a powerful and flexible TypeScript library for serialization and deserialization of objects. It provides robust support for complex data structures, type safety, and multiple approaches to schema definition. Perfect for applications that need to handle complex JSON transformations while maintaining strong typing.

## Features

- **Multiple Schema Definition Approaches**:

  - **Decorator-based**: Use `@Serializable` and `@JsonProp` decorators for a clean, declarative style
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
import { Serializable, JsonProp, serialize, deserialize } from 'morphio';

@Serializable()
class UserProfile {
  @JsonProp({ type: 'string', required: true })
  name: string;

  @JsonProp({ type: 'number' })
  age?: number;

  @JsonProp({
    type: {
      container: 'array',
      itemType: 'string',
    },
  })
  tags: string[] = [];

  @JsonProp({
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
@Serializable()
class BlogPost {
  @JsonProp({ type: 'string' })
  title: string;

  @JsonProp({
    type: {
      properties: {
        name: { type: 'string', required: true },
        email: { type: 'string', required: true },
      },
    },
  })
  author: { name: string; email: string };
}
```

## Documentation

For detailed documentation, including:

- API Reference
- Advanced Usage Guide
- Best Practices
- Migration Guide

Visit our [documentation](https://rpethani.github.io/Morphio/).

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](./.github/CONTRIBUTING.md) for:

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

MIT License - see the [LICENSE](./LICENSE) file for details.

## Support

Need help?

1. Check the [documentation](https://rpethani.github.io/Morphio/)
2. Search [existing issues](https://github.com/RPethani/Morphio/issues)
3. Create a new issue

## Acknowledgments

Special thanks to all contributors who have helped make Morphio better!
