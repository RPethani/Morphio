---
title: Decorator Compatibility
description: Learn how to use Morphio decorators in different TypeScript environments
sidebar_position: 3
---

# Decorator Compatibility

Morphio's decorators are designed to work seamlessly in both modern TypeScript projects and older TypeScript versions. This guide explains how to configure your project for different decorator environments.

## Understanding Decorator Environments

Morphio supports two decorator environments:

1. **Modern TypeScript (Stage 3 Decorators)**
   - Uses the latest TypeScript decorator proposal
   - Recommended for TypeScript 5.x and later
   - Provides better type safety and performance

2. **Legacy TypeScript (Experimental Decorators)**
   - Uses the older experimental decorator syntax
   - Required for TypeScript versions before 5.x
   - Maintains compatibility with older TypeScript projects

## Configuration

### Modern TypeScript (Recommended)

For TypeScript 5.x and later, no special configuration is needed. Just ensure you're using the latest stable version of TypeScript.

### Legacy TypeScript

To use Morphio decorators in TypeScript versions before 5.x, add the following configuration to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "useDefineForClassFields": true
  }
}
```
