# Enum Types with Schemas

You can also work with enums using schema-based configuration in Morphio. This approach provides the same functionality as decorators but allows you to define your serialization rules separately from your class definitions.

## Basic Usage

```typescript
// Define your enums
enum Status {
  Inactive = 0,
  Active = 1,
}

enum Direction {
  Up = 'UP',
  Down = 'DOWN',
}

// Define your class
class TestEnums {
  basicStatus!: Status;
  statusWithDefault!: Status;
  direction!: Direction;
  directionAsValue!: Direction;
}

// Define the schema
const schema: MorphioSchema = {
  properties: {
    basicStatus: {
      type: { enum: Status }
    },
    statusWithDefault: {
      type: { enum: Status, default: Status.Active }
    },
    direction: {
      type: { enum: Direction, serializeAs: 'key' }
    },
    directionAsValue: {
      type: { enum: Direction }
    }
  }
};

// Register the schema
SchemaRegistry.registerSchema(TestEnums, schema);
```

## Serialization Strategies

### Default Value Strategy
By default, enums are serialized using their values:

```typescript
const obj = new TestEnums();
obj.basicStatus = Status.Active;
obj.directionAsValue = Direction.Down;

const serialized = serialize(obj);
console.log(serialized);
// Output:
// {
//   basicStatus: 1,        // Numeric value
//   directionAsValue: 'DOWN'  // String value
// }
```

### Key Strategy
Use `serializeAs: 'key'` in your schema to serialize enum values as their key names:

```typescript
const schema: MorphioSchema = {
  properties: {
    direction: {
      type: { enum: Direction, serializeAs: 'key' }
    }
  }
};

const obj = new TestEnums();
obj.direction = Direction.Down;

const serialized = serialize(obj);
console.log(serialized);
// Output:
// {
//   direction: 'Down'  // Key name instead of value
// }
```

## Default Values

Specify default values in your schema:

```typescript
const schema: MorphioSchema = {
  properties: {
    statusWithDefault: {
      type: { enum: Status, default: Status.Active }
    }
  }
};

// When deserializing invalid or missing values, the default is used
const serialized = {
  statusWithDefault: 'INVALID'
};

const deserialized = deserialize(serialized, TestEnums);
console.log(deserialized.statusWithDefault); // Status.Active
```

## Handling Invalid Values

When deserializing invalid enum values:
- If a default value is specified in the schema, it will be used
- If no default value is specified, the property will be undefined

```typescript
const schema: MorphioSchema = {
  properties: {
    statusWithoutDefault: {
      type: { enum: Status }
    }
  }
};

const serialized = {
  statusWithoutDefault: 'INVALID'
};

const deserialized = deserialize(serialized, TestEnums);
console.log(deserialized.statusWithoutDefault); // undefined
```

## String Keys During Deserialization

Morphio handles string keys during deserialization for both numeric and string enums:

```typescript
const serialized = {
  basicStatus: 'Active',    // String key for numeric enum
  direction: 'Down'         // String key for string enum
};

const deserialized = deserialize(serialized, TestEnums);
console.log(deserialized.basicStatus); // Status.Active
console.log(deserialized.direction);   // Direction.Down
```

## Handling Null and Undefined

When serializing properties that are null or undefined:
- If a default value is specified in the schema, it will be used
- Otherwise, the property will be undefined in the serialized output

```typescript
const test = new TestEnums();
// Don't set any values

const serialized = serialize(test);
console.log(serialized);
// Output:
// {
//   statusWithDefault: 1,  // Default value used
//   basicStatus: undefined,
//   direction: undefined
// }
```
