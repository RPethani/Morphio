# Function: Serializable()

> **Serializable**(`options`?): (`target`, `context`) => `void`

Defined in: [decorators/serializable.decorator.ts:30](https://github.com/RPethani/Morphio/blob/85bf16253dc3893d85da652ef45df81ed1c5003e/src/decorators/serializable.decorator.ts#L30)

A decorator to mark a class as serializable and process its property metadata.

This decorator performs two main functions:
1. Registers a schema for the class in the SchemaRegistry
2. Processes all property metadata collected by

## Parameters

### options?

`SerializableOptions`

Configuration options

## Returns

`Function`

A decorator function that processes class and property metadata

### Parameters

#### target

() => `any`

#### context

`ClassDecoratorContext`

### Returns

`void`

## Json Prop

decorators

The decorator looks for a Map of property metadata in context.metadata.properties,
which is populated by the

## Json Prop

decorators. It then registers each property
with the class schema.

Example usage:
```ts
@Serializable({ name: 'CustomUser' })
class User {
  @JsonProp({ type: 'string', required: true })
  name: string;

  @JsonProp({ type: 'number', description: 'User age' })
  age?: number;
}
```
