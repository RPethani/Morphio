# Examples

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
```
