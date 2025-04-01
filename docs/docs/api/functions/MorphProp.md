# Function: MorphProp()

> **MorphProp**(`options`): (`_`, `context`) => `void`

Defined in: decorators/morph-prop.decorator.ts:26

A decorator function that adds metadata to a class property for transformation.

This decorator collects property metadata in the class's context.metadata.properties Map,
which is later processed by the

## Parameters

### options

[`PropertyMetadata`](../interfaces/PropertyMetadata.md)

Property metadata configuration. See [PropertyMetadata](../interfaces/PropertyMetadata.md) for details.

## Returns

`Function`

A decorator function that collects property metadata

### Parameters

#### \_

`undefined`

#### context

`ClassFieldDecoratorContext`

### Returns

`void`

## Morph Schema

decorator to build the complete class schema.

The property type defaults to 'string' if not explicitly specified in the options.

Example usage:
```ts
@MorphSchema()
class User {
  @MorphProp({ type: 'string', required: true })
  name: string;

  @MorphProp({ type: 'number', description: 'User age in years' })
  age?: number;
}
```
