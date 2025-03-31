# Add Interface Serialization and Inline Object Support

## Overview
This PR adds support for interface-based serialization and inline object types, along with comprehensive documentation improvements.

## Key Changes

### New Features
1. **Interface Serialization**
   - Added support for serializing/deserializing TypeScript interfaces
   - Implemented declarative schema registration for interfaces
   - Added type-safe schema definition

2. **Inline Object Support**
   - Added `InlineObjectProcessor` for handling inline object types
   - Support for nested inline objects
   - Support for inline objects in containers (arrays/maps)

3. **Documentation**
   - Added comprehensive examples in `src/docs/examples/`
   - Updated README with current features and examples
   - Added TSDoc comments across the codebase

### Technical Details
- New processor: `InlineObjectProcessor` for handling inline object types
- Enhanced `ProcessorFactory` to handle inline objects
- Updated `PropertyMetadata` types to support inline objects
- Added extensive test coverage for all new features

### Documentation Updates
- Added example categories:
  - Basic Types
  - Containers (Arrays/Maps)
  - Inline Objects
  - Inheritance
- Each example includes:
  - Type/class definitions
  - Sample data creation
  - Serialization/deserialization examples
  - Expected results

## Testing
- Added test suites:
  - `test/classes/declarative/inline-objects.test.ts`
  - `test/classes/decorators/inline-objects.test.ts`
  - `test/interfaces/inline-objects.test.ts`
- All tests passing
- Coverage maintained

## Breaking Changes
None. All changes are backward compatible.

## Checklist
- [x] Code follows project style guidelines
- [x] Tests added for new features
- [x] Documentation updated
- [x] No breaking changes
- [x] All tests passing
