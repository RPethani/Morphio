// symbol-metadata-polyfill.ts

// Ensure Symbol.metadata exists
(Symbol as any).metadata ??= Symbol.for('Symbol.metadata');

// Function to initialize metadata storage on a target object
function createMetadataStorage(target: any) {
  if (!target[Symbol.metadata]) {
    Object.defineProperty(target, Symbol.metadata, {
      value: Object.create(null),
      configurable: true,
      enumerable: false,
      writable: true,
    });
  }
}

// Apply the metadata storage to the global object (optional, based on your use case)
createMetadataStorage(globalThis);
