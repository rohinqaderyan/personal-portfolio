# Contributing to Personal Portfolio

Thank you for considering contributing to this project! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the behavior
- **Expected behavior**
- **Actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node.js version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case** explaining why this would be useful
- **Proposed solution** if you have one in mind
- **Alternative solutions** you've considered

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following the code style guidelines
3. **Add tests** if you've added functionality
4. **Ensure tests pass**: `npm run test` and `npm run e2e`
5. **Run linting**: `npm run lint` and `npm run format`
6. **Update documentation** if needed
7. **Write a clear commit message** following our conventions
8. **Submit a pull request**

## Development Setup

1. Fork and clone the repository:

   ```bash
   git clone https://github.com/yourusername/personal-portfolio.git
   cd personal-portfolio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. Make your changes and test:
   ```bash
   npm run dev          # Start dev server
   npm run lint         # Check linting
   npm run format       # Format code
   npm run test         # Run unit tests
   npm run e2e          # Run E2E tests
   npm run type-check   # Type checking
   ```

## Code Style Guidelines

### TypeScript

- Use TypeScript for all new files
- Define proper types/interfaces; avoid `any`
- Use functional components with hooks
- Follow existing naming conventions

### React Components

- Use functional components
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper prop types with TypeScript

### File Naming

- Components: PascalCase (e.g., `ProjectCard.tsx`)
- Utilities: camelCase (e.g., `content.ts`)
- Types: PascalCase in `.types.ts` files

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Example:

```
feat(projects): add project filtering by tags

- Implement tag-based filtering
- Add search functionality
- Update ProjectGrid component

Closes #123
```

## Testing Guidelines

### Unit Tests

- Write tests for all new components and utilities
- Aim for high coverage on critical paths
- Use descriptive test names
- Test accessibility with `@testing-library/react`

Example:

```typescript
describe('ProjectCard', () => {
  it('renders project title and description', () => {
    // Test implementation
  })

  it('handles missing image gracefully', () => {
    // Test implementation
  })
})
```

### E2E Tests

- Test critical user flows
- Test on multiple browsers
- Include accessibility checks
- Test both light and dark modes

Example:

```typescript
test('user can filter projects by tag', async ({ page }) => {
  await page.goto('/projects')
  await page.click('[data-testid="tag-react"]')
  // Assert filtered results
})
```

## Documentation

- Update README.md for significant changes
- Add JSDoc comments for complex functions
- Update content schema docs if changing JSON structure
- Include inline comments for non-obvious code

## Review Process

1. Automated checks must pass (linting, tests, type checking)
2. At least one maintainer review is required
3. All feedback must be addressed
4. Squash commits before merging

## Questions?

Feel free to open an issue with the `question` label or reach out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
