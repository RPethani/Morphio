# Class: SchemaRegistry

Defined in: [schema/registry/SchemaRegistry.ts:8](https://github.com/RPethani/Morphio/blob/faa508a3bb73f2316d16746415895e81e2772fdf/src/schema/registry/SchemaRegistry.ts#L8)

A registry that maintains the mapping between types (classes/interfaces) and their schemas.

## Constructors

### Constructor

> **new SchemaRegistry**(): `SchemaRegistry`

#### Returns

`SchemaRegistry`

## Methods

### getOrCreate()

> `static` **getOrCreate**(`target`): [`MorphioSchema`](../interfaces/MorphioSchema.md)

Defined in: [schema/registry/SchemaRegistry.ts:31](https://github.com/RPethani/Morphio/blob/faa508a3bb73f2316d16746415895e81e2772fdf/src/schema/registry/SchemaRegistry.ts#L31)

Gets or creates a schema for a type

#### Parameters

##### target

`TypeIdentifier`

The class constructor or interface name

#### Returns

[`MorphioSchema`](../interfaces/MorphioSchema.md)

The schema for the type

***

### getSchema()

> `static` **getSchema**(`target`): `undefined` \| [`MorphioSchema`](../interfaces/MorphioSchema.md)

Defined in: [schema/registry/SchemaRegistry.ts:52](https://github.com/RPethani/Morphio/blob/faa508a3bb73f2316d16746415895e81e2772fdf/src/schema/registry/SchemaRegistry.ts#L52)

Gets a schema for a type if it exists

#### Parameters

##### target

`TypeIdentifier`

The class constructor or interface name

#### Returns

`undefined` \| [`MorphioSchema`](../interfaces/MorphioSchema.md)

The schema for the type or undefined if not found

***

### registerSchema()

> `static` **registerSchema**(`target`, `schema`): `void`

Defined in: [schema/registry/SchemaRegistry.ts:21](https://github.com/RPethani/Morphio/blob/faa508a3bb73f2316d16746415895e81e2772fdf/src/schema/registry/SchemaRegistry.ts#L21)

Registers a schema for a type

#### Parameters

##### target

`TypeIdentifier`

The class constructor or interface name

##### schema

[`MorphioSchema`](../interfaces/MorphioSchema.md)

The schema to register

#### Returns

`void`
