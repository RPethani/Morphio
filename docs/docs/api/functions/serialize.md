# Function: serialize()

> **serialize**(`input`, `objectType`?): `object`

Defined in: [engine/serialize.ts:13](https://github.com/RPethani/Morphio/blob/faa508a3bb73f2316d16746415895e81e2772fdf/src/engine/serialize.ts#L13)

Serializes a class instance to a plain JavaScript object.

This function recursively processes each property of the class instance based on
the metadata defined by the `@MorphProp` decorator and handles nested objects, arrays, and maps.

## Parameters

### input

`any`

### objectType?

`ObjectType`

## Returns

`object`

A plain JavaScript object representation of the class instance
