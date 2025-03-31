---
sidebar_position: 5
---

# Interface-Based Serialization

This section demonstrates how to work with TypeScript interfaces in Morphio. Since interfaces are a TypeScript-only concept and don't exist at runtime, all interface serialization uses schema-based registration.

## Basic Interface Serialization
Working with simple interfaces:

```typescript
interface User {
  id: string;
  name: string;
  email?: string;
  age: number;
}

// Register the interface schema
morphioSchema({ interface: 'User' }, {
  id: { type: 'string', required: true },
  name: { type: 'string', required: true },
  email: { type: 'string', required: false },
  age: { type: 'number', required: true }
});

// Usage
const json = {
  id: "user123",
  name: "John Doe",
  age: 30
};

const user = deserialize<User>(json, { interface: 'User' });
console.log(user.name); // "John Doe"
console.log(user.age); // 30
console.log(user.email); // undefined

const serialized = serialize(user, { interface: 'User' });
console.log(serialized); 
// {
//   id: "user123",
//   name: "John Doe",
//   age: 30
// }
```

## Nested Interfaces
Working with interfaces that contain other interfaces:

```typescript
interface Address {
  street: string;
  city: string;
  country: string;
  postalCode?: string;
}

interface Contact {
  email: string;
  phone?: string;
}

interface Customer {
  id: string;
  name: string;
  address: Address;
  contact: Contact;
  alternateAddresses?: Address[];
}

// Register schemas for each interface
morphioSchema({ interface: 'Address' }, {
  street: { type: 'string', required: true },
  city: { type: 'string', required: true },
  country: { type: 'string', required: true },
  postalCode: { type: 'string', required: false }
});

morphioSchema({ interface: 'Contact' }, {
  email: { type: 'string', required: true },
  phone: { type: 'string', required: false }
});

morphioSchema({ interface: 'Customer' }, {
  id: { type: 'string', required: true },
  name: { type: 'string', required: true },
  address: { type: 'object', properties: { interface: 'Address' }, required: true },
  contact: { type: 'object', properties: { interface: 'Contact' }, required: true },
  alternateAddresses: {
    type: 'array',
    items: { type: 'object', properties: { interface: 'Address' } },
    required: false
  }
});

// Usage
const json = {
  id: "cust123",
  name: "John Doe",
  address: {
    street: "123 Main St",
    city: "San Francisco",
    country: "USA",
    postalCode: "94105"
  },
  contact: {
    email: "john@example.com",
    phone: "555-0123"
  }
};

const customer = deserialize<Customer>(json, { interface: 'Customer' });
console.log(customer.address.city); // "San Francisco"
console.log(customer.contact.email); // "john@example.com"
```

## Interface Inheritance
Working with interface inheritance chains:

```typescript
interface Entity {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
}

interface Product extends Entity {
  name: string;
  price: number;
  description?: string;
}

interface DigitalProduct extends Product {
  downloadUrl: string;
  fileSize?: number;
  format: string;
}

// Register base interface schema
morphioSchema({ interface: 'Entity' }, {
  id: { type: 'string', required: true },
  createdAt: { type: 'Date', required: true },
  updatedAt: { type: 'Date', required: false }
});

// Register Product schema with inheritance
morphioSchema({ interface: 'Product' }, {
  name: { type: 'string', required: true },
  price: { type: 'number', required: true },
  description: { type: 'string', required: false }
}, [{ interface: 'Entity' }]);

// Register DigitalProduct schema with inheritance
morphioSchema({ interface: 'DigitalProduct' }, {
  downloadUrl: { type: 'string', required: true },
  fileSize: { type: 'number', required: false },
  format: { type: 'string', required: true }
}, [{ interface: 'Product' }]);

// Usage
const json = {
  id: "dp123",
  createdAt: "2025-01-01T00:00:00.000Z",
  name: "E-book",
  price: 9.99,
  downloadUrl: "https://example.com/download",
  format: "PDF",
  fileSize: 1024
};

const product = deserialize<DigitalProduct>(json, { interface: 'DigitalProduct' });
console.log(product.name); // "E-book"
console.log(product.price); // 9.99
console.log(product.format); // "PDF"
console.log(product.createdAt instanceof Date); // true
```

## Maps with Interface Values
Working with maps that contain interface values:

```typescript
interface UserPreferences {
  theme: string;
  language: string;
  notifications: boolean;
}

interface UserSettings {
  userId: string;
  preferences: Map<string, UserPreferences>;
}

// Register schemas
morphioSchema({ interface: 'UserPreferences' }, {
  theme: { type: 'string', required: true },
  language: { type: 'string', required: true },
  notifications: { type: 'boolean', required: true }
});

morphioSchema({ interface: 'UserSettings' }, {
  userId: { type: 'string', required: true },
  preferences: {
    type: 'map',
    values: { type: 'object', properties: { interface: 'UserPreferences' } },
    required: true
  }
});

// Usage
const json = {
  userId: "user123",
  preferences: {
    "desktop": {
      theme: "dark",
      language: "en",
      notifications: true
    },
    "mobile": {
      theme: "light",
      language: "en",
      notifications: false
    }
  }
};

const settings = deserialize<UserSettings>(json, { interface: 'UserSettings' });
console.log(settings.preferences.get("desktop")?.theme); // "dark"
console.log(settings.preferences.get("mobile")?.notifications); // false
```

Each example demonstrates proper type handling and validation while working with TypeScript interfaces. Remember that interface serialization always requires explicit schema registration since interfaces don't exist at runtime.
