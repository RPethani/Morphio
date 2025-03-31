/**
 * @packageDocumentation
 * @module Examples.BasicTypes
 */

/**
 * # Basic Types Examples
 *
 * This module demonstrates how to use Morphio with basic types like strings,
 * numbers, booleans, and dates.
 *
 * ## String Properties
 *
 * ```typescript
 * @Serializable()
 * class StringExample {
 *   @JsonProp({ type: 'string', required: true })
 *   required: string;
 *
 *   @JsonProp({ type: 'string' })
 *   optional?: string;
 * }
 * ```
 *
 * ## Number Properties
 *
 * ```typescript
 * @Serializable()
 * class NumberExample {
 *   @JsonProp({ type: 'number' })
 *   integer: number = 0;
 *
 *   @JsonProp({ type: 'number' })
 *   float: number = 0.0;
 * }
 * ```
 *
 * ## Boolean Properties
 *
 * ```typescript
 * @Serializable()
 * class BooleanExample {
 *   @JsonProp({ type: 'boolean' })
 *   isActive: boolean = false;
 *
 *   @JsonProp({ type: 'boolean', required: true })
 *   mustBeSet: boolean;
 * }
 * ```
 *
 * ## Date Properties
 *
 * ```typescript
 * @Serializable()
 * class DateExample {
 *   @JsonProp({ type: 'Date' })
 *   created: Date = new Date();
 *
 *   @JsonProp({ type: 'Date' })
 *   updated?: Date;
 * }
 * ```
 *
 * ## Usage Examples
 *
 * ```typescript
 * // Create and populate instances
 * const str = new StringExample();
 * str.required = "Hello";
 * str.optional = "World";
 *
 * const num = new NumberExample();
 * num.integer = 42;
 * num.float = 3.14;
 *
 * const bool = new BooleanExample();
 * bool.isActive = true;
 * bool.mustBeSet = false;
 *
 * const date = new DateExample();
 * date.updated = new Date('2025-03-31');
 *
 * // Serialize
 * const strJson = serialize(str);
 * const numJson = serialize(num);
 * const boolJson = serialize(bool);
 * const dateJson = serialize(date);
 *
 * // Deserialize
 * const strObj = deserialize(strJson, StringExample);
 * const numObj = deserialize(numJson, NumberExample);
 * const boolObj = deserialize(boolJson, BooleanExample);
 * const dateObj = deserialize(dateJson, DateExample);
 * ```
 */
export const examples = 'This file contains documentation examples.';
