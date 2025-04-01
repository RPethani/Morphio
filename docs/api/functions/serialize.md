# Function: serialize()

> **serialize**(`input`, `objectType`?): `object`

Defined in: [engine/serialize.ts:25](https://github.com/RPethani/Morphio/blob/85bf16253dc3893d85da652ef45df81ed1c5003e/src/engine/serialize.ts#L25)

Serializes an instance of a class into a plain object.

The `serialize` function is responsible for converting an instance of a class into a plain
JavaScript object, based on the schema associated with that class. It respects the metadata
defined by the `@MorphProp` decorator and handles nested objects, arrays, and maps.

This function supports forgiving serialization, meaning that properties without explicit
metadata will be included in the serialized output.

## Parameters

### input

`any`

The instance to serialize. It must be an instance of a class.

### objectType?

`ObjectType`

The type of the object to serialize.

## Returns

`object`

The serialized object.

## Example

```ts
const user = new User("John", "john@example.com");
const serialized = serialize(user);
console.log(serialized); // { name: "John", email: "john@example.com" }
```
