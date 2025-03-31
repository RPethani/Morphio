# Function: JsonProp()

> **JsonProp**(`options`): (`_`, `context`) => `void`

Defined in: [decorators/json-prop.decorator.ts:26](https://github.com/RPethani/Morphio/blob/85bf16253dc3893d85da652ef45df81ed1c5003e/src/decorators/json-prop.decorator.ts#L26)

A decorator function that adds metadata to a class property for serialization/deserialization.

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

## Serializable

decorator to build the complete class schema.

The property type defaults to 'string' if not explicitly specified in the options.

Example usage:
```ts
@Serializable()
class User {
  @JsonProp({ type: 'string', required: true })
  name: string;

  @JsonProp({ type: 'number', description: 'User age in years' })
  age?: number;
}
```
