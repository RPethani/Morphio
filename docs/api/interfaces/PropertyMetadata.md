# Interface: PropertyMetadata

Defined in: [schema/types/PropertyMetadata.ts:168](https://github.com/RPethani/Morphio/blob/85bf16253dc3893d85da652ef45df81ed1c5003e/src/schema/types/PropertyMetadata.ts#L168)

Metadata for a property used in serialization and deserialization.
Defines how a property should be processed during data transformation.
This is the main interface used for defining schema properties.

## Example

```ts
// Required string property
const nameMetadata: PropertyMetadata = {
  type: 'string',
  required: true,
  description: 'User\'s full name'
};

// Optional array property
const tagsMetadata: PropertyMetadata = {
  type: { container: 'array', itemType: 'string' },
  required: false,
  description: 'List of user tags'
};
```

## Properties

### description?

> `optional` **description**: `string`

Defined in: [schema/types/PropertyMetadata.ts:191](https://github.com/RPethani/Morphio/blob/85bf16253dc3893d85da652ef45df81ed1c5003e/src/schema/types/PropertyMetadata.ts#L191)

Optional description of the property.
Used for documentation and schema generation.

***

### required?

> `optional` **required**: `boolean`

Defined in: [schema/types/PropertyMetadata.ts:185](https://github.com/RPethani/Morphio/blob/85bf16253dc3893d85da652ef45df81ed1c5003e/src/schema/types/PropertyMetadata.ts#L185)

Whether the property is required during serialization/deserialization.
- true: Property must be present (default)
- false: Property is optional

#### Default

```ts
true
```

***

### type

> **type**: [`PropertyType`](../type-aliases/PropertyType.md)

Defined in: [schema/types/PropertyMetadata.ts:176](https://github.com/RPethani/Morphio/blob/85bf16253dc3893d85da652ef45df81ed1c5003e/src/schema/types/PropertyMetadata.ts#L176)

The type of the property. Can be one of:
- Primitive type ('string', 'number', 'boolean', 'Date')
- Class constructor (for class instances)
- Interface name (for registered interfaces)
- Container type (for arrays and maps)
