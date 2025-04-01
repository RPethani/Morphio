# Interface: ContainerType

Defined in: [schema/types/PropertyMetadata.ts:87](https://github.com/RPethani/Morphio/blob/85bf16253dc3893d85da652ef45df81ed1c5003e/src/schema/types/PropertyMetadata.ts#L87)

Represents a container type (Array or Map) with its element type information.
Used for nested data structures that can contain other types.

## Example

```ts
// Array of strings
const arrayType: ContainerType = {
  container: 'array',
  itemType: 'string'
};

// Map of string to User
const mapType: ContainerType = {
  container: 'map',
  itemType: User
};
```

## Properties

### container

> **container**: `"array"` \| `"map"`

Defined in: [schema/types/PropertyMetadata.ts:93](https://github.com/RPethani/Morphio/blob/85bf16253dc3893d85da652ef45df81ed1c5003e/src/schema/types/PropertyMetadata.ts#L93)

The type of container ('array' or 'map').
- 'array': For Array-like collections
- 'map': For Map-like collections with string keys

***

### itemType

> **itemType**: [`PropertyType`](../type-aliases/PropertyType.md)

Defined in: [schema/types/PropertyMetadata.ts:101](https://github.com/RPethani/Morphio/blob/85bf16253dc3893d85da652ef45df81ed1c5003e/src/schema/types/PropertyMetadata.ts#L101)

The type of items in the container.
For arrays, represents the element type.
For maps, represents the value type (keys are always strings).
Can be recursive (e.g., array of arrays).
