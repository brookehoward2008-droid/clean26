```markdown
# clean26 Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the `clean26` TypeScript repository. It covers file organization, import/export styles, commit message practices, and testing patterns. By following these guidelines, contributors can maintain consistency and readability throughout the codebase.

## Coding Conventions

### File Naming
- Use **camelCase** for file names.
  - Example: `userService.ts`, `dataParser.ts`

### Imports
- Use **relative import paths** for modules.
  - Example:
    ```typescript
    import { fetchData } from './apiClient';
    ```

### Exports
- Use **named exports** rather than default exports.
  - Example:
    ```typescript
    // In userService.ts
    export function getUser() { /* ... */ }
    export const USER_ROLE = 'admin';
    ```

### Commit Messages
- Freeform style, sometimes with prefixes.
- Average commit message length: ~60 characters.
  - Example: `Add user authentication logic and update tests`

## Workflows

### Adding a New Feature
**Trigger:** When implementing new functionality.
**Command:** `/add-feature`

1. Create a new file using camelCase naming.
2. Write your feature code, using named exports.
3. Use relative imports to include dependencies.
4. Add or update corresponding test files (`*.test.*`).
5. Commit changes with a descriptive message.

### Refactoring Existing Code
**Trigger:** When improving or restructuring code.
**Command:** `/refactor`

1. Identify the code to refactor.
2. Update file names to camelCase if necessary.
3. Ensure all imports remain relative.
4. Maintain named exports.
5. Update or add tests as needed.
6. Commit with a clear message describing the refactor.

### Writing and Running Tests
**Trigger:** When verifying code correctness.
**Command:** `/test`

1. Create or update test files matching the pattern `*.test.*`.
2. Write tests for all new or changed functionality.
3. Use the project's test runner (framework unknown; check project docs).
4. Ensure all tests pass before merging.

## Testing Patterns

- Test files use the `*.test.*` naming convention (e.g., `userService.test.ts`).
- The testing framework is not specified; check for scripts or documentation in the repository.
- Tests should cover all exported functions and logic.

  Example:
  ```typescript
  // userService.test.ts
  import { getUser } from './userService';

  test('getUser returns correct user', () => {
    expect(getUser()).toEqual({ name: 'Alice' });
  });
  ```

## Commands
| Command        | Purpose                                  |
|----------------|------------------------------------------|
| /add-feature   | Scaffold and implement a new feature     |
| /refactor      | Refactor existing code                   |
| /test          | Run or write tests for the codebase      |
```
