```markdown
# clean26 Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches you the core development patterns and conventions used in the `clean26` TypeScript codebase. You'll learn how to structure files, write imports and exports, follow commit practices, and implement and run tests. These conventions ensure consistency and maintainability throughout the project.

## Coding Conventions

### File Naming
- Use **camelCase** for all file names.
  - Example: `userService.ts`, `dataParser.ts`

### Import Style
- Use **relative imports** for modules within the project.
  - Example:
    ```typescript
    import { fetchData } from './apiClient';
    ```

### Export Style
- Use **named exports** for all modules.
  - Example:
    ```typescript
    // In userService.ts
    export function getUser(id: string) { ... }
    export const USER_ROLE = 'admin';
    ```

### Commit Patterns
- Commit messages are **freeform**, with no enforced prefixes.
- Average commit message length: ~61 characters.
  - Example:  
    ```
    Add user authentication middleware and update session logic
    ```

## Workflows

### Adding a New Module
**Trigger:** When you need to add a new feature or utility.
**Command:** `/add-module`

1. Create a new file using camelCase naming (e.g., `featureName.ts`).
2. Write your code using named exports.
3. Import dependencies using relative paths.
4. Add relevant tests in a corresponding `*.test.ts` file.

### Refactoring Existing Code
**Trigger:** When improving or restructuring existing logic.
**Command:** `/refactor`

1. Identify the module(s) to refactor.
2. Update code, maintaining camelCase file naming and relative imports.
3. Ensure all exports remain named.
4. Update or add tests as needed.
5. Commit changes with a clear, descriptive message.

### Writing and Running Tests
**Trigger:** When adding new features or fixing bugs.
**Command:** `/test`

1. Create or update a test file matching the pattern `*.test.ts`.
2. Write test cases for each exported function or constant.
3. Use the project's preferred testing framework (unknown; check project docs or package.json).
4. Run the tests using the appropriate command (e.g., `npm test` or similar).

## Testing Patterns

- Test files follow the `*.test.ts` naming convention.
- Each module should have a corresponding test file.
- Tests should cover all named exports.
- Example:
  ```typescript
  // userService.test.ts
  import { getUser } from './userService';

  test('getUser returns correct user', () => {
    expect(getUser('123')).toEqual({ id: '123', name: 'Alice' });
  });
  ```

## Commands

| Command        | Purpose                                      |
|----------------|----------------------------------------------|
| /add-module    | Scaffold a new module with tests             |
| /refactor      | Guide for refactoring existing code          |
| /test          | Instructions for writing and running tests   |
```
