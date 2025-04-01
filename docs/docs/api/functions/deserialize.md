# Function: deserialize()

> **deserialize**\<`T`\>(`input`, `type`): `T`

Defined in: [engine/deserialize.ts:11](https://github.com/RPethani/Morphio/blob/faa508a3bb73f2316d16746415895e81e2772fdf/src/engine/deserialize.ts#L11)

Deserializes a JSON string or object into an instance of the given type.

## Type Parameters

### T

`T`

## Parameters

### input

The input data to deserialize. It can be a JSON string or an object.

`string` | `object`

### type

The class constructor or interface name to deserialize the input into.

`InterfaceType` | `Constructor`\<`T`\>

## Returns

`T`

The deserialized instance of the specified type.
