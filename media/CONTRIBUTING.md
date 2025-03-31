# Contributing to Morphio

Thank you for your interest in contributing to Morphio! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct (to be added).

## Development Process

### Branching Strategy

We use a simple but effective branching strategy:

```
main (stable beta)
  └── develop (active development)
       └── feature/* (for significant changes)
```

- `main`: Represents the stable beta version
- `develop`: Contains ongoing development work
- `feature/*`: Used for significant changes or new features

### Workflow

1. **For Small Changes** (bug fixes, documentation):
   ```bash
   git checkout develop
   # make changes
   git commit -m "fix: description"
   ```

2. **For Larger Changes** (new features, refactoring):
   ```bash
   git checkout develop
   git checkout -b feature/description
   # make changes
   git commit -m "feat: description"
   git checkout develop
   git merge feature/description
   ```

3. **For Beta Releases**:
   ```bash
   git checkout main
   git merge develop
   git tag -a v0.x.0-beta.y -m "Beta release x.y"
   ```

### Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or modifying tests
- `chore:` - Maintenance tasks

Example:
```
feat: add support for Map serialization

- Implement MapProcessor for handling Map objects
- Add tests for Map serialization/deserialization
- Update documentation with Map examples
```

## Code Style

1. **TypeScript**:
   - Use TypeScript for all new code
   - Include comprehensive type definitions
   - Avoid `any` type unless absolutely necessary

2. **Documentation**:
   - Add TSDoc comments for all public APIs
   - Include examples in documentation
   - Keep documentation up to date with code changes

3. **Testing**:
   - Write tests for all new features
   - Maintain existing test coverage
   - Include edge cases in tests

## Pull Request Process

1. Create a new branch from `develop` for your changes
2. Make your changes following our code style guidelines
3. Write/update tests as needed
4. Update documentation as needed
5. Ensure all tests pass
6. Submit a pull request to the `develop` branch
7. Wait for review and address any feedback

## Setting Up Development Environment

1. Fork and clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run tests:
   ```bash
   npm test
   ```

## Project Structure

```
src/
├── decorators/     # TypeScript decorators
├── engine/         # Core serialization engine
│   └── processors/ # Value processors
├── index.ts       # Public API exports
└── types/         # Type definitions
```

## Questions or Problems?

- File an issue for bugs or feature requests
- Ask questions in GitHub Discussions
- Check existing issues and discussions before creating new ones

## License

By contributing to Morphio, you agree that your contributions will be licensed under its MIT license.
