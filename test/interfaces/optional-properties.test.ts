import { morphioSchema } from '../../src/schema';
import { deserialize, serialize } from '../../src';

describe('Optional Properties in Interfaces', () => {
  // Define interfaces with optional properties
  interface Address {
    street?: string;
    city: string;
  }

  interface UserProfile {
    name: string; // Required
    age?: number; // Optional
    email?: string; // Optional
    address?: Address; // Optional nested object
  }

  // Register schema for Address first
  morphioSchema({ interface: 'Address' }, {
    street: { type: 'string', required: false },
    city: { type: 'string', required: true },
  });

  // Then register schema for UserProfile
  morphioSchema({ interface: 'UserProfile' }, {
    name: { type: 'string', required: true },
    age: { type: 'number', required: false },
    email: { type: 'string', required: false },
    address: { type: 'Address', required: false },
  });

  describe('Optional primitive properties', () => {
    it('should handle missing optional properties', () => {
      const user: UserProfile = {
        name: 'John',
      };

      const serialized = serialize(user, { interface: 'UserProfile' });
      expect(serialized).toEqual({
        name: 'John',
      });

      const deserialized = deserialize<UserProfile>(serialized, {
        interface: 'UserProfile',
      });
      expect(deserialized).toEqual({
        name: 'John',
      });
    });

    it('should include provided optional properties', () => {
      const user: UserProfile = {
        name: 'John',
        age: 30,
        email: 'john@example.com',
      };

      const serialized = serialize(user, { interface: 'UserProfile' });
      expect(serialized).toEqual({
        name: 'John',
        age: 30,
        email: 'john@example.com',
      });

      const deserialized = deserialize<UserProfile>(serialized, {
        interface: 'UserProfile',
      });
      expect(deserialized).toEqual({
        name: 'John',
        age: 30,
        email: 'john@example.com',
      });
    });
  });

  describe('Optional nested objects', () => {
    it('should handle missing optional nested objects', () => {
      const user: UserProfile = {
        name: 'John',
      };

      const serialized = serialize(user, { interface: 'UserProfile' });
      expect(serialized).toEqual({
        name: 'John',
      });

      const deserialized = deserialize<UserProfile>(serialized, {
        interface: 'UserProfile',
      });
      expect(deserialized).toEqual({
        name: 'John',
      });
    });

    it('should handle partial optional nested objects', () => {
      const user: UserProfile = {
        name: 'John',
        address: {
          city: 'New York',
          // street is optional and missing
        },
      };

      const serialized = serialize(user, { interface: 'UserProfile' });
      expect(serialized).toEqual({
        name: 'John',
        address: {
          city: 'New York',
        },
      });

      const deserialized = deserialize<UserProfile>(serialized, {
        interface: 'UserProfile',
      });
      expect(deserialized).toEqual({
        name: 'John',
        address: {
          city: 'New York',
        },
      });
    });
  });

  describe('Explicit undefined/null handling', () => {
    it('should handle explicit undefined values', () => {
      const user: UserProfile = {
        name: 'John',
        age: undefined,
        email: undefined,
      };

      const serialized = serialize(user, { interface: 'UserProfile' });
      expect(serialized).toEqual({
        name: 'John',
      });
    });

    it('should handle explicit null values', () => {
      const user = {
        name: 'John',
        age: null,
        email: null,
      };

      const serialized = serialize(user, { interface: 'UserProfile' });
      expect(serialized).toEqual({
        name: 'John',
        age: null,
        email: null,
      });
    });
  });
});
