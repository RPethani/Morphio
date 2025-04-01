---
sidebar_position: 4
---

# Examples

Here are various examples demonstrating Morphio's features.

## Basic Types

```typescript
@MorphSchema()
class User {
  @MorphProp()
  name: string;

  @MorphProp()
  age: number;

  @MorphProp()
  isActive: boolean;
}
```

## Nested Objects

```typescript
@MorphSchema()
class Address {
  @MorphProp()
  street: string;

  @MorphProp()
  city: string;
}

@MorphSchema()
class User {
  @MorphProp()
  name: string;

  @MorphProp()
  address: Address;
}
```

## Arrays and Collections

```typescript
@MorphSchema()
class Team {
  @MorphProp()
  name: string;

  @MorphProp()
  members: User[];

  @MorphProp()
  tags: Set<string>;
}
```

## Maps

```typescript
@MorphSchema()
class Configuration {
  @MorphProp()
  settings: Map<string, any>;

  @MorphProp()
  metadata: Map<string, string>;
}
```

## Optional Properties

```typescript
@MorphSchema()
class Profile {
  @MorphProp()
  name: string;

  @MorphProp({ required: false })
  bio?: string;

  @MorphProp({ defaultValue: false })
  isPublic: boolean;
}
```

## Inheritance

```typescript
@MorphSchema()
class Animal {
  @MorphProp()
  name: string;
}

@MorphSchema()
class Dog extends Animal {
  @MorphProp()
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

@MorphSchema()
class Event {
  @MorphProp({ processor: DateProcessor })
  startDate: Date;

  @MorphProp({ processor: DateProcessor })
  endDate: Date;
}
```

## Complete Example

Here's a complete example showing multiple features working together:

```typescript
@MorphSchema()
class Organization {
  @MorphProp()
  name: string;

  @MorphProp()
  teams: Team[];

  @MorphProp()
  config: Configuration;

  @MorphProp({ processor: DateProcessor })
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

@MorphSchema()
class User {
  @MorphProp({ type: 'string', required: true })
  name: string;

  @MorphProp({ type: 'number', required: false })
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
@MorphSchema()
class Address {
  @MorphProp({ type: 'string', required: true })
  street: string;

  @MorphProp({ type: 'string', required: true })
  city: string;

  constructor() {
    this.street = '';
    this.city = '';
  }
}

@MorphSchema()
class Person {
  @MorphProp({ type: 'string', required: true })
  name: string;

  @MorphProp({ type: Address, required: true })
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
@MorphSchema()
class Team {
  @MorphProp({ type: 'string', required: true })
  name: string;

  @MorphProp({ type: [User], required: true })
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
@MorphSchema()
class Event {
  @MorphProp({ type: 'string', required: true })
  title: string;

  @MorphProp({ type: Date, required: true })
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
@MorphSchema()
class Settings {
  @MorphProp({ type: 'string', required: false })
  theme?: string;

  @MorphProp({ type: 'number', required: false })
  fontSize?: number;

  @MorphProp({ type: 'boolean', required: false })
  darkMode?: boolean;
}

const settings = new Settings();
settings.theme = 'dark';
// fontSize is omitted
settings.darkMode = true;

const json = serialize(settings);
const deserialized = deserialize(json, Settings);
