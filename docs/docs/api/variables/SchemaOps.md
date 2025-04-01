# Variable: SchemaOps

> `const` **SchemaOps**: `object`

Defined in: [schema/operations/SchemaOps.ts:15](https://github.com/RPethani/Morphio/blob/faa508a3bb73f2316d16746415895e81e2772fdf/src/schema/operations/SchemaOps.ts#L15)

Operations for managing MorphioSchema instances.
These operations replace the previous class-based methods with pure functions.

## Type declaration

### addProperty()

Adds a property to the schema

#### Parameters

##### schema

[`MorphioSchema`](../interfaces/MorphioSchema.md)

The schema to modify

##### key

`string`

The property key

##### meta

[`PropertyMetadata`](../interfaces/PropertyMetadata.md)

The property metadata

#### Returns

`void`

### create()

Creates a new MorphioSchema instance

#### Parameters

##### name

`string`

The name of the schema (usually the class or interface name)

##### options?

Optional schema configuration

###### isInterface?

`boolean`

#### Returns

[`MorphioSchema`](../interfaces/MorphioSchema.md)

A new MorphioSchema instance

### getProperties()

Gets all properties for a schema, including inherited ones.
Properties from parent schemas are included first, then overridden by own properties.

#### Parameters

##### schema

[`MorphioSchema`](../interfaces/MorphioSchema.md)

The schema to get properties for

#### Returns

`Map`\<`string`, [`PropertyMetadata`](../interfaces/PropertyMetadata.md)\>

Map of all property names to their metadata

### setName()

Sets the name of a schema

#### Parameters

##### schema

[`MorphioSchema`](../interfaces/MorphioSchema.md)

The schema to modify

##### name

`string`

The new name to set

#### Returns

`void`
