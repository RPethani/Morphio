# Function: MorphSchema()

> **MorphSchema**(`options`?): (`target`, `context`) => `void`

Defined in: decorators/morph-schema.decorator.ts:30

A decorator to mark a class as transformable and process its property metadata.

This decorator performs two main functions:
1. Registers a schema for the class in the SchemaRegistry
2. Processes all property metadata collected by

## Parameters

### options?

`MorphSchemaOptions`

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

## Morph Prop

decorators

The decorator looks for a Map of property metadata in context.metadata.properties,
which is populated by the

## Morph Prop

decorators. It then registers each property
with the class schema.

Example usage:
```ts
@MorphSchema({ name: 'CustomUser' })
class User {
  @MorphProp({ type: 'string', required: true })
  name: string;

  @MorphProp({ type: 'number', description: 'User age' })
  age?: number;
}
```
