import { MorphProp, MorphSchema } from '../../src';
import { deserialize, serialize } from '../../src';

enum Status {
  Inactive = 0,
  Active = 1,
}

enum Direction {
  Up = 'UP',
  Down = 'DOWN',
}

enum Mixed {
  No = 0,
  Yes = 1,
}

@MorphSchema()
class TestEnums {
  @MorphProp({ type: { enum: Status } })
  basicStatus!: Status;

  @MorphProp({ type: { enum: Status, default: Status.Active } })
  statusWithDefault!: Status;

  @MorphProp({ type: { enum: Status } })
  statusWithoutDefault!: Status;

  @MorphProp({ type: { enum: Direction, serializeAs: 'key' } })
  direction!: Direction;

  @MorphProp({ type: { enum: Direction } })
  directionAsValue!: Direction;

  @MorphProp({ type: { enum: Mixed, serializeAs: 'key' } })
  mixedKey!: Mixed;
}

describe('Enum Types', () => {
  it('should serialize and deserialize numeric enums', () => {
    const obj = new TestEnums();
    obj.basicStatus = Status.Active;

    const serialized = serialize(obj, TestEnums) as Partial<TestEnums>;
    expect(serialized.basicStatus).toBe(Status.Active);

    const deserialized = deserialize(serialized, TestEnums);
    expect(deserialized.basicStatus).toBe(Status.Active);
  });

  it('should use default value when deserializing invalid enum value', () => {
    const serialized = {
      statusWithDefault: 'INVALID',
    };

    const deserialized = deserialize(serialized, TestEnums);
    expect(deserialized.statusWithDefault).toBe(Status.Active);
  });

  it('should return undefined when deserializing invalid enum value without default', () => {
    const serialized = {
      statusWithoutDefault: 'INVALID',
    };

    const deserialized = deserialize(serialized, TestEnums);
    expect(deserialized.statusWithoutDefault).toBeUndefined();
  });

  it('should serialize string enums as keys when specified', () => {
    const obj = new TestEnums();
    obj.direction = Direction.Down;

    const serialized = serialize(obj, TestEnums) as Partial<TestEnums>;
    expect(serialized.direction).toBe('Down');

    const deserialized = deserialize(serialized, TestEnums);
    expect(deserialized.direction).toBe(Direction.Down);
  });

  it('should serialize string enums as values by default', () => {
    const obj = new TestEnums();
    obj.directionAsValue = Direction.Down;

    const serialized = serialize(obj, TestEnums) as Partial<TestEnums>;
    expect(serialized.directionAsValue).toBe('DOWN');

    const deserialized = deserialize(serialized, TestEnums);
    expect(deserialized.directionAsValue).toBe(Direction.Down);
  });

  it('should handle string keys during deserialization', () => {
    const serialized = {
      basicStatus: 'Active',
      direction: 'Down',
    };

    const deserialized = deserialize(serialized, TestEnums);
    expect(deserialized.basicStatus).toBe('Active');
    expect(deserialized.direction).toBe(Direction.Down);
  });

  it('should handle null and undefined values', () => {
    const test = new TestEnums();
    // Don't set any values

    const serialized = serialize(test) as Partial<TestEnums>;
    expect(serialized.basicStatus).toBeUndefined();
    expect(serialized.direction).toBeUndefined();
    // Default value should be used
    expect(serialized.statusWithDefault).toBe(Status.Active);

    const deserialized = deserialize(serialized, TestEnums);
    expect(deserialized.basicStatus).toBeUndefined();
    expect(deserialized.direction).toBeUndefined();
    expect(deserialized.statusWithDefault).toBe(Status.Active);
  });
});
