---
sidebar_position: 1
---

# Tutorial Intro

Let's discover **Docusaurus in less than 5 minutes**.

## Getting Started

Welcome to Morphio! A powerful TypeScript library for type-safe serialization and deserialization.

### What is Morphio?

Morphio is a TypeScript library that provides type-safe serialization and deserialization between TypeScript classes and JSON objects. It supports complex types, nested objects, arrays, maps, and custom type definitions through metadata.

### Installation

```bash
npm install morphio
# or
yarn add morphio
```

### Quick Start

Here's a simple example of how to use Morphio:

```typescript
import { Serializable, JsonProp } from 'morphio';

@Serializable()
class User {
  @JsonProp({ type: 'string', required: true })
  name: string;

  @JsonProp({ type: 'number', required: false })
  age?: number;

  constructor() {
    this.name = '';
  }
}

// Create a user instance
const user = new User();
user.name = 'John Doe';
user.age = 30;

// Serialize to JSON
const json = serialize(user);
console.log(json); // { "name": "John Doe", "age": 30 }

// Deserialize back to User instance
const deserialized = deserialize(json, User);
console.log(deserialized instanceof User); // true
console.log(deserialized.name); // "John Doe"
```

### Key Features

- Type-safe serialization and deserialization
- Support for complex types and nested objects
- Decorator-based metadata
- Customizable property transformations
- Built-in type validation

### Next Steps

- Check out the [API Reference](/docs/api/intro) for detailed documentation
- See [Examples](/docs/examples) for more usage examples
- Learn about [Advanced Features](/docs/advanced/custom-types)

## Generate a new site

Generate a new Docusaurus site using the **classic template**.

The classic template will automatically be added to your project after you run the command:

```bash
npm init docusaurus@latest my-website classic
```

You can type this command into Command Prompt, Powershell, Terminal, or any other integrated terminal of your code editor.

The command also installs all necessary dependencies you need to run Docusaurus.

## Start your site

Run the development server:

```bash
cd my-website
npm run start
```

The `cd` command changes the directory you're working with. In order to work with your newly created Docusaurus site, you'll need to navigate the terminal there.

The `npm run start` command builds your website locally and serves it through a development server, ready for you to view at http://localhost:3000/.

Open `docs/intro.md` (this page) and edit some lines: the site **reloads automatically** and displays your changes.
