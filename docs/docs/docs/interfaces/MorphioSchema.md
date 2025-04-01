# Interface: MorphioSchema

Defined in: [schema/types/MorphioSchema.ts:48](https://github.com/RPethani/Morphio/blob/85bf16253dc3893d85da652ef45df81ed1c5003e/src/schema/types/MorphioSchema.ts#L48)

Represents the schema for an object in Morphio.
The schema contains metadata about the properties of the object and helps with serialization/deserialization.

A `MorphioSchema` can represent either a class or an interface, tracking their properties, types,
and other metadata that guides serialization.

Example of interface schema:
```typescript
interface Vehicle {
  type: 'car' | 'bike';  // discriminator property
  brand: string;
}

// Schema for Vehicle interface
{
  name: 'Vehicle',
  isInterface: true,
  discriminator: 'type',
  properties: new Map([
    ['type', { type: 'string', required: true }],
    ['brand', { type: 'string', required: true }]
  ])
}
```

Example of implementation schema:
```typescript
interface Car extends Vehicle {
  type: 'car';
  doors: number;
}

// Schema for Car implementation
{
  name: 'Car',
  isInterface: false,
  extends: ['Vehicle'],
  discriminatorValue: 'car',
  properties: new Map([
    ['doors', { type: 'number', required: true }]
  ])
}
```

## Properties

### extends?

> `optional` **extends**: `TypeIdentifier`[]

Defined in: [schema/types/MorphioSchema.ts:82](https://github.com/RPethani/Morphio/blob/85bf16253dc3893d85da652ef45df81ed1c5003e/src/schema/types/MorphioSchema.ts#L82)

For interface inheritance, list of parent type identifiers this schema extends from.
Properties from parent schemas are inherited by the implementing schema.

Example:
```typescript
interface Car extends Vehicle {
  doors: number;
}
extends = ['Vehicle']  // References Vehicle's type identifier
```

***

### isInterface?

> `optional` **isInterface**: `boolean`

Defined in: [schema/types/MorphioSchema.ts:68](https://github.com/RPethani/Morphio/blob/85bf16253dc3893d85da652ef45df81ed1c5003e/src/schema/types/MorphioSchema.ts#L68)

Whether this schema represents an interface (true) or a class (false/undefined).

When true:
- The schema represents an interface that may have multiple implementations
- The discriminator property is used to determine the concrete type
- Properties from extended interfaces are inherited

***

### name

> **name**: `string`

Defined in: [schema/types/MorphioSchema.ts:52](https://github.com/RPethani/Morphio/blob/85bf16253dc3893d85da652ef45df81ed1c5003e/src/schema/types/MorphioSchema.ts#L52)

The name of the schema (class or interface name)

***

### properties

> **properties**: `Map`\<`string`, [`PropertyMetadata`](PropertyMetadata.md)\>

Defined in: [schema/types/MorphioSchema.ts:58](https://github.com/RPethani/Morphio/blob/85bf16253dc3893d85da652ef45df81ed1c5003e/src/schema/types/MorphioSchema.ts#L58)

A map holding the metadata of properties defined in this schema.
The map's keys are property names, and the values are the metadata describing each property.
