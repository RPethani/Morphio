# API Reference

## Core Functions

### serialize()

Converts a TypeScript class instance into a plain JavaScript object.

```typescript
function serialize(input: any): object
```

#### Parameters
- `input`: The class instance to serialize

#### Returns
A plain JavaScript object representation of the input

### deserialize()

Converts a plain JavaScript object into a TypeScript class instance.

```typescript
function deserialize<T>(input: string | object, type: Constructor<T>): T
```

#### Parameters
- `input`: The object or JSON string to deserialize
- `type`: The target class type

#### Returns
An instance of the specified class type

## Decorators

### @Serializable()

Marks a class as serializable and processes its property metadata.

```typescript
function Serializable(options?: SerializableOptions): ClassDecorator
```

#### Options
- `name`: Optional custom name for the schema

### @JsonProp()

Adds metadata to a class property for serialization/deserialization.

```typescript
function JsonProp(options: PropertyMetadata): PropertyDecorator
```

#### Options
- `type`: The property type ('string', 'number', 'boolean', etc.)
- `required`: Whether the property is required (default: true)
- `description`: Optional description of the property

## Interfaces

### PropertyMetadata

Configuration options for property serialization.

```typescript
interface PropertyMetadata {
  type: string;
  required?: boolean;
  description?: string;
}
```

### SerializableOptions

Configuration options for serializable classes.

```typescript
interface SerializableOptions {
  name?: string;
}
```
