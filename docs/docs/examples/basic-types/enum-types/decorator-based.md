# Enum Types with Decorators

Morphio provides flexible handling of TypeScript enums with support for both numeric and string enums. You can control how enums are serialized using the `serializeAs` option.

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

// Use them in your class
@MorphSchema()
class TestEnums {
  @MorphProp({ type: { enum: Status } })
  basicStatus!: Status;

  @MorphProp({ type: { enum: Status, default: Status.Active } })
  statusWithDefault!: Status;

  @MorphProp({ type: { enum: Direction, serializeAs: 'key' } })
  direction!: Direction;

  @MorphProp({ type: { enum: Direction } })
  directionAsValue!: Direction;
}
```

## Serialization Strategies

### Default Value Strategy
By default, enums are serialized using their values. For numeric enums, this means the numeric value, and for string enums, this means the string value.

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
You can use the `serializeAs: 'key'` option to serialize enum values as their key names:

```typescript
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

You can specify default values for enum properties:

```typescript
@MorphProp({ type: { enum: Status, default: Status.Active } })
statusWithDefault!: Status;

// When deserializing invalid or missing values, the default is used
const serialized = {
  statusWithDefault: 'INVALID'
};

const deserialized = deserialize(serialized, TestEnums);
console.log(deserialized.statusWithDefault); // Status.Active
```

## Handling Invalid Values

When deserializing invalid enum values:
- If a default value is specified, it will be used
- If no default value is specified, the property will be undefined

```typescript
@MorphProp({ type: { enum: Status } })
statusWithoutDefault!: Status;

const serialized = {
  statusWithoutDefault: 'INVALID'
};

const deserialized = deserialize(serialized, TestEnums);
console.log(deserialized.statusWithoutDefault); // undefined
```

## String Keys During Deserialization

Morphio can handle string keys during deserialization for both numeric and string enums:

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
- If a default value is specified, it will be used
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
