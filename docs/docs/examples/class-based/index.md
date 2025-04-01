---
sidebar_position: 3
---

# Class-Based Serialization

This section demonstrates how to serialize and deserialize TypeScript classes using Morphio. You'll find examples for:

## Basic Class Serialization
Learn how to serialize simple classes:

### Decorator-Based Approach
```typescript
@Serializable()
class User {
  @JsonProp({ type: 'string' })
  id: string;

  @JsonProp({ type: 'string' })
  name: string;

  @JsonProp({ type: 'number', required: false })
  age?: number;

  getDisplayName(): string {
    return `${this.name} (${this.id})`;
  }
}

// Usage
const json = {
  id: "user123",
  name: "John Doe",
  age: 30
};

const user = deserialize(User, json);
console.log(user.getDisplayName()); // "John Doe (user123)"
```

### Schema-Based Approach
```typescript
class User {
  id: string;
  name: string;
  age?: number;

  getDisplayName(): string {
    return `${this.name} (${this.id})`;
  }
}

morphioSchema(User, {
  id: { type: 'string', required: true },
  name: { type: 'string', required: true },
  age: { type: 'number', required: false }
});
```

## Nested Objects
Working with nested class instances:

### Decorator-Based Approach
```typescript
@Serializable()
class Address {
  @JsonProp({ type: 'string' })
  street: string;

  @JsonProp({ type: 'string' })
  city: string;

  @JsonProp({ type: 'string' })
  country: string;

  getFullAddress(): string {
    return `${this.street}, ${this.city}, ${this.country}`;
  }
}

@Serializable()
class User {
  @JsonProp({ type: 'string' })
  name: string;

  @JsonProp({ type: 'object', properties: Address })
  address: Address;

  @JsonProp({ type: 'array', items: { type: 'object', properties: Address } })
  alternateAddresses?: Address[];
}
```

### Schema-Based Approach
```typescript
class Address {
  street: string;
  city: string;
  country: string;

  getFullAddress(): string {
    return `${this.street}, ${this.city}, ${this.country}`;
  }
}

class User {
  name: string;
  address: Address;
  alternateAddresses?: Address[];
}

morphioSchema(Address, {
  street: { type: 'string', required: true },
  city: { type: 'string', required: true },
  country: { type: 'string', required: true }
});

morphioSchema(User, {
  name: { type: 'string', required: true },
  address: { type: 'object', properties: Address, required: true },
  alternateAddresses: {
    type: 'array',
    items: { type: 'object', properties: Address },
    required: false
  }
});
```

## Methods and Computed Properties
Handling class methods and computed properties:

### Decorator-Based Approach
```typescript
@Serializable()
class Product {
  @JsonProp({ type: 'string' })
  name: string;

  @JsonProp({ type: 'number' })
  price: number;

  @JsonProp({ type: 'number', required: false })
  discountPercentage?: number;

  get discountedPrice(): number {
    if (!this.discountPercentage) return this.price;
    return this.price * (1 - this.discountPercentage / 100);
  }

  calculateTax(taxRate: number): number {
    return this.discountedPrice * taxRate;
  }
}
```

### Schema-Based Approach
```typescript
class Product {
  name: string;
  price: number;
  discountPercentage?: number;

  get discountedPrice(): number {
    if (!this.discountPercentage) return this.price;
    return this.price * (1 - this.discountPercentage / 100);
  }

  calculateTax(taxRate: number): number {
    return this.discountedPrice * taxRate;
  }
}

morphioSchema(Product, {
  name: { type: 'string', required: true },
  price: { type: 'number', required: true },
  discountPercentage: { type: 'number', required: false }
});
```

Each example demonstrates proper type handling and validation while preserving class methods and behavior throughout the serialization process.
