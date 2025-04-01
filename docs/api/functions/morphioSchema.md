# Function: morphioSchema()

> **morphioSchema**(`type`, `properties`, `parentTypes`?): [`MorphioSchema`](../interfaces/MorphioSchema.md)

Defined in: [schema/operations/SchemaOps.ts:125](https://github.com/RPethani/Morphio/blob/85bf16253dc3893d85da652ef45df81ed1c5003e/src/schema/operations/SchemaOps.ts#L125)

Creates and registers a schema for an interface or class.

## Parameters

### type

`ObjectType`

The class constructor or interface type

### properties

`Record`\<`string`, [`PropertyMetadata`](../interfaces/PropertyMetadata.md)\>

Map of property names to their metadata

### parentTypes?

`TypeIdentifier`[]

Optional array of types this schema extends from

## Returns

[`MorphioSchema`](../interfaces/MorphioSchema.md)

The created and registered schema

## Example

```typescript
interface Person {
  name: string;
  age: number;
}

// Using interface name
morphioSchema({ interface: 'Person' }, {
  name: { type: 'string', required: true },
  age: { type: 'number', required: true }
});

// Using class constructor with inheritance
morphioSchema(Employee, {
  salary: { type: 'number', required: true }
}, [Person]);

// Using interface with inheritance
morphioSchema({ interface: 'Admin' }, {
  permissions: { type: 'string', required: true }
}, [{ interface: 'Employee' }]);
```
