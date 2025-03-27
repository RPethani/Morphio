# Morphio - TypeScript Serialization Library

![Morphio Logo](./assets/morphio.png)

Morphio is a powerful and flexible TypeScript library for serialization and deserialization of objects. It supports data transformation with a focus on simplicity, performance, and extensibility. Morphio is designed to make it easy to handle JSON serialization in a structured and intuitive way, with a schema-driven approach.

## Features
- **Schema-driven serialization**: Automatically handle JSON serialization and deserialization based on class schema.
- **Flexible property handling**: Support for primitive types, nested objects, arrays, and maps.
- **Forgiving deserialization**: Morphio can handle missing properties or undefined fields while maintaining data integrity.
- **Type inference**: Automatically infer property types when no explicit `@JsonProp` decorator is defined.

## Installation

You can install Morphio via npm:

```bash
npm install morphio
```

## Usage

Here is an example of how to use Morphio to serialize and deserialize a class:

### Example Code

```ts
import { Serializable, JsonProp } from 'morphio';

@Serializable()
class Address {
  @JsonProp({ type: 'string' }) city: string;
}

@Serializable()
class User {
  @JsonProp({ type: 'string' }) name: string;
  @JsonProp({ type: Address }) address: Address;
}

const user = new User();
user.name = 'John Doe';
user.address = new Address();
user.address.city = 'New York';

// Serialize the user object to JSON
const json = serialize(user);
console.log(json);

// Deserialize the JSON back into a User object
const deserializedUser = deserialize(json, User);
console.log(deserializedUser);
```

## Documentation

For detailed documentation and advanced usage examples, please visit our [documentation](./docs).

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](./.github/CONTRIBUTING.md) for details on how to submit pull requests, report issues, and contribute to the project.

### Development

Morphio uses a structured development process with a clear branching strategy. See our [Contributing Guidelines](./.github/CONTRIBUTING.md) for:
- Branching strategy
- Code style guidelines
- Commit message conventions
- Pull request process
- Development setup

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Support

If you encounter any issues or have questions:
1. Check our [documentation](./docs)
2. Search existing [issues](https://github.com/yourusername/morphio/issues)
3. Create a new issue if needed

## Acknowledgments

Thanks to all contributors who have helped shape Morphio!
