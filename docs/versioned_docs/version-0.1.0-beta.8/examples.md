---
sidebar_position: 3
---

# Examples

Here are various examples demonstrating Morphio's features.

## Basic Types

```typescript
@Serializable()
class User {
  @JsonProp()
  name: string;

  @JsonProp()
  age: number;

  @JsonProp()
  isActive: boolean;
}
```

## Nested Objects

```typescript
@Serializable()
class Address {
  @JsonProp()
  street: string;

  @JsonProp()
  city: string;
}

@Serializable()
class User {
  @JsonProp()
  name: string;

  @JsonProp()
  address: Address;
}
```

## Arrays and Collections

```typescript
@Serializable()
class Team {
  @JsonProp()
  name: string;

  @JsonProp()
  members: User[];

  @JsonProp()
  tags: Set<string>;
}
```

## Maps

```typescript
@Serializable()
class Configuration {
  @JsonProp()
  settings: Map<string, any>;

  @JsonProp()
  metadata: Map<string, string>;
}
```

## Optional Properties

```typescript
@Serializable()
class Profile {
  @JsonProp()
  name: string;

  @JsonProp({ required: false })
  bio?: string;

  @JsonProp({ defaultValue: false })
  isPublic: boolean;
}
```

## Inheritance

```typescript
@Serializable()
class Animal {
  @JsonProp()
  name: string;
}

@Serializable()
class Dog extends Animal {
  @JsonProp()
  breed: string;
}
```

## Custom Type Processors

```typescript
class DateProcessor implements ValueProcessor<Date> {
  serialize(value: Date): string {
    return value.toISOString();
  }

  deserialize(value: string): Date {
    return new Date(value);
  }
}

@Serializable()
class Event {
  @JsonProp({ processor: DateProcessor })
  startDate: Date;

  @JsonProp({ processor: DateProcessor })
  endDate: Date;
}
```

## Complete Example

Here's a complete example showing multiple features working together:

```typescript
@Serializable()
class Organization {
  @JsonProp()
  name: string;

  @JsonProp()
  teams: Team[];

  @JsonProp()
  config: Configuration;

  @JsonProp({ processor: DateProcessor })
  createdAt: Date;

  constructor(name: string) {
    this.name = name;
    this.teams = [];
    this.config = new Configuration();
    this.createdAt = new Date();
  }
}

// Usage
const org = new Organization('Acme Inc.');
org.teams.push(new Team('Engineering'));
org.config.settings.set('theme', 'dark');

const json = JSON.stringify(org);
const deserialized = JSON.parse(json, Organization);
```

## Basic Usage

### Simple Class

```typescript
import { Serializable, JsonProp, serialize, deserialize } from 'morphio';

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

const user = new User();
user.name = 'John Doe';
user.age = 30;

const json = serialize(user);
const deserialized = deserialize(json, User);
```

## Nested Objects

### Parent-Child Relationship

```typescript
@Serializable()
class Address {
  @JsonProp({ type: 'string', required: true })
  street: string;

  @JsonProp({ type: 'string', required: true })
  city: string;

  constructor() {
    this.street = '';
    this.city = '';
  }
}

@Serializable()
class Person {
  @JsonProp({ type: 'string', required: true })
  name: string;

  @JsonProp({ type: Address, required: true })
  address: Address;

  constructor() {
    this.name = '';
    this.address = new Address();
  }
}

const person = new Person();
person.name = 'John Doe';
person.address.street = '123 Main St';
person.address.city = 'New York';

const json = serialize(person);
const deserialized = deserialize(json, Person);
```

## Arrays and Collections

### Array of Objects

```typescript
@Serializable()
class Team {
  @JsonProp({ type: 'string', required: true })
  name: string;

  @JsonProp({ type: [User], required: true })
  members: User[];

  constructor() {
    this.name = '';
    this.members = [];
  }
}

const team = new Team();
team.name = 'Engineering';
team.members = [
  Object.assign(new User(), { name: 'John', age: 30 }),
  Object.assign(new User(), { name: 'Jane', age: 25 }),
];

const json = serialize(team);
const deserialized = deserialize(json, Team);
```

## Custom Type Handling

### Date Fields

```typescript
@Serializable()
class Event {
  @JsonProp({ type: 'string', required: true })
  title: string;

  @JsonProp({ type: Date, required: true })
  date: Date;

  constructor() {
    this.title = '';
    this.date = new Date();
  }
}

const event = new Event();
event.title = 'Team Meeting';
event.date = new Date('2024-01-01');

const json = serialize(event);
const deserialized = deserialize(json, Event);
```

## Optional Properties

### Partial Object

```typescript
@Serializable()
class Settings {
  @JsonProp({ type: 'string', required: false })
  theme?: string;

  @JsonProp({ type: 'number', required: false })
  fontSize?: number;

  @JsonProp({ type: 'boolean', required: false })
  darkMode?: boolean;
}

const settings = new Settings();
settings.theme = 'dark';
// fontSize is omitted
settings.darkMode = true;

const json = serialize(settings);
const deserialized = deserialize(json, Settings);
