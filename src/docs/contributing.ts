/**
 * @packageDocumentation
 * @module Contributing
 */

/**
 * # Contributing to Morphio
 *
 * Thank you for your interest in contributing to Morphio! This guide will help you get started.
 *
 * ## Development Setup
 *
 * ```bash
 * # Clone the repository
 * git clone https://github.com/RPethani/Morphio.git
 * cd Morphio
 *
 * # Install dependencies
 * npm install
 *
 * # Run tests
 * npm test
 *
 * # Build the project
 * npm run build
 * ```
 *
 * ## Branching Strategy
 *
 * We use a simple but effective branching strategy:
 *
 * ```
 * main (stable beta)
 *   └── develop (active development)
 *        └── feature/* (for significant changes)
 * ```
 *
 * ### Branch Usage
 *
 * - `main`: Represents the stable beta version
 * - `develop`: Contains ongoing development work
 * - `feature/*`: Used for significant changes
 *
 * ## Workflow
 *
 * 1. **For Small Changes** (bug fixes, documentation):
 *    ```bash
 *    git checkout develop
 *    # make changes
 *    git commit -m "fix: description"
 *    ```
 *
 * 2. **For Larger Changes** (new features, refactoring):
 *    ```bash
 *    git checkout develop
 *    git checkout -b feature/description
 *    # make changes
 *    git commit -m "feat: description"
 *    git checkout develop
 *    git merge feature/description
 *    ```
 *
 * ## Commit Messages
 *
 * We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:
 *
 * - `feat:` - New features
 * - `fix:` - Bug fixes
 * - `docs:` - Documentation changes
 * - `style:` - Code style changes
 * - `refactor:` - Code refactoring
 * - `test:` - Adding or modifying tests
 * - `chore:` - Maintenance tasks
 *
 * ## Code Style
 *
 * 1. **TypeScript**:
 *    - Use TypeScript for all new code
 *    - Include comprehensive type definitions
 *    - Avoid `any` type unless absolutely necessary
 *
 * 2. **Documentation**:
 *    - Add TSDoc comments for all public APIs
 *    - Include examples in documentation
 *    - Keep documentation up to date with code changes
 *
 * 3. **Testing**:
 *    - Write tests for all new features
 *    - Maintain existing test coverage
 *    - Include edge cases in tests
 *
 * ## Project Structure
 *
 * ```
 * src/
 * ├── decorators/     # TypeScript decorators
 * ├── engine/         # Core serialization engine
 * │   └── processors/ # Value processors
 * ├── index.ts       # Public API exports
 * └── types/         # Type definitions
 * ```
 *
 * ## Pull Request Process
 *
 * 1. Create a new branch from `develop`
 * 2. Make your changes following our code style guidelines
 * 3. Write/update tests as needed
 * 4. Update documentation as needed
 * 5. Ensure all tests pass
 * 6. Submit a pull request to the `develop` branch
 *
 * @remarks
 * For more detailed information, please refer to our {@link https://github.com/RPethani/Morphio/blob/main/.github/CONTRIBUTING.md | GitHub Contributing Guidelines}.
 */
export const contributing = 'This file is for documentation purposes only.';
