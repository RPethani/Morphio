# Type Alias: PropertyType

> **PropertyType** = `TypeIdentifier` \| [`ContainerType`](../interfaces/ContainerType.md) \| `InlineObjectType`

Defined in: [schema/types/PropertyMetadata.ts:144](https://github.com/RPethani/Morphio/blob/85bf16253dc3893d85da652ef45df81ed1c5003e/src/schema/types/PropertyMetadata.ts#L144)

Represents a type that can be used in property metadata.
This is the main type used for defining property types in schemas.
Can represent any valid type in the schema system.

## Example

```ts
// Primitive type
const strType: PropertyType = 'string';

// Class constructor
const userType: PropertyType = User;

// Interface type
const profileType: PropertyType = { interface: 'UserProfile' };

// Container type (array)
const arrayType: PropertyType = { container: 'array', itemType: 'string' };
```
