# Contributing to Personal Portfolio

> 🌟 We welcome contributions of all sizes - from typo fixes to major features!

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

### Quick Start with Setup Scripts

```powershell
.\setup.ps1
```

**macOS/Linux (Bash):**

```bash
chmod +x setup.sh
./setup.sh
```

- Install dependencies
- Create `.env.local` from `.env.example`
- Run all quality checks

### Manual Setup

1. Fork and clone the repository:

   ```bash
   git clone https://github.com/yourusername/personal-portfolio.git
   cd personal-portfolio
   git remote add upstream https://github.com/rohinqaderyan/personal-portfolio.git
   ```

2. Verify Node.js version:
3. Install dependencies:

   ```bash
   npm install
   ```

4. Create environment file:

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

5. Create your feature branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

6. Make your changes and test:
   ```bash
   npm run dev          # Start dev server (http://localhost:3000)
   npm run type-check   # TypeScript type checking
   npm run lint         # ESLint code quality check
   npm run format       # Prettier code formatting
   npm run test -- --run         # Run unit tests
   npm run build        # Production build
   ```

### TypeScript & Type Safety

- Use TypeScript for all new files (strict mode enabled)
- Define proper types/interfaces; avoid `any` type
- Add JSDoc comments for complex functions
  **Good Examples:**

```typescript
// ✅ Explicit types
interface ProjectCardProps {

function useProjects(): Project[] {
  return [];
}

}
```

### React Components

- Use proper prop types with TypeScript interfaces
- Memoize components if needed with `React.memo`

**Good Examples:**

```typescript
// ✅ Small, focused component
interface CardProps {
  title: string;
  onClick: () => void;
}

export function Card({ title, onClick }: CardProps) {
  return (
    <button onClick={onClick} className="card">
      {title}
    </button>
  );
}

// ❌ Avoid - too many concerns
function Card(props: any) {
  const [state, setState] = useState();
  // 20+ lines of unrelated logic
}
```

### Styling with Tailwind CSS

- Use Tailwind utility classes for styling
- Keep responsive design in mind
- Use semantic color classes
- Use `clsx` for conditional classes
- Never use inline styles or CSS-in-JS

**Good Examples:**

```typescript
// ✅ Tailwind classes
<div className={clsx("px-4 py-2 rounded", {
  "bg-blue-500": isActive,
  "bg-gray-200": !isActive
})}>
  Button
  Button
```

### File Naming

- Components: PascalCase (e.g., `ProjectCard.tsx`)
- Utilities: camelCase (e.g., `stringUtils.ts`)
- Tests: Match component name + `.test.tsx/ts` (e.g., `ProjectCard.test.tsx`)
- Types: `types.ts` or inline in component file

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification with detailed descriptions:

```
<type>(<scope>): <subject> -> <detail>

<body>

<footer>
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD configuration changes
- `perf`: Performance improvements

**Examples:**

```
feat(projects): Add project filtering by tags -> Implement tag-based filtering with search

- Add ProjectFilter component
- Update ProjectGrid with filter state
- Add filtering utility function

Closes #123

---

fix(card): Fix overflow on mobile screens -> Apply responsive padding and truncate text

- Reduce padding on sm breakpoint
- Truncate long titles with ellipsis
- Add mobile test case

Closes #456

---

docs(readme): Add deployment guide -> Cover Vercel setup and environment variables

- Add step-by-step Vercel instructions
- Document required environment variables
- Include troubleshooting section
```

## Testing Guidelines

### Why Testing Matters

- Ensures code works as expected
- Prevents regressions when refactoring
- Documents component behavior
- Improves code quality
- Current: **142 tests passing** with comprehensive coverage

### Unit Testing

**Location:** `src/tests/unit/`

- Write tests for all new components and utilities
- Aim for high coverage on critical paths (80%+ for components, 90%+ for utilities)
- Use descriptive test names that explain behavior
- Test accessibility with `@testing-library/react`

**Test Coverage:**

- Components: ProjectCard (12), Card (22), Navigation (4), Hero (5)
- Utilities: string (39), validation (26), array (34)
- Total: 142 tests, 100% pass rate

**Unit Test Example:**

```typescript
// src/tests/unit/ProjectCard.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectCard } from '@/components/ProjectCard';

describe('ProjectCard', () => {
  it('renders project title and description', () => {
    const project = {
      id: '1',
      title: 'My Project',
      year: 2024,
      description: 'Project description'
    };

    render(<ProjectCard project={project} />);

    expect(screen.getByText('My Project')).toBeInTheDocument();
    expect(screen.getByText('Project description')).toBeInTheDocument();
  });

  it('handles missing image gracefully', () => {
    const project = {
      id: '1',
      title: 'No Image Project',
      year: 2024
    };

    render(<ProjectCard project={project} />);

    const image = screen.queryByRole('img');
    expect(image).not.toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', async () => {
    const onDelete = vi.fn();
    const project = { id: '1', title: 'Test', year: 2024 };

    const { getByText } = render(
      <ProjectCard project={project} onDelete={onDelete} />
    );

    fireEvent.click(getByText('Delete'));
    expect(onDelete).toHaveBeenCalledWith('1');
  });
});
```

**Utility Test Example:**

```typescript
// src/tests/unit/string.test.ts
import { describe, it, expect } from 'vitest';
import { capitalize, truncate } from '@/utils/string';

describe('String utilities', () => {
  it('capitalizes first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('hELLO')).toBe('Hello');
  });

  it('truncates long strings with ellipsis', () => {
    const text = 'This is a very long text that needs truncating';
    const result = truncate(text, 20);

    expect(result).toHaveLength(20);
    expect(result.endsWith('...')).toBe(true);
  });

  it('handles edge cases', () => {
    expect(capitalize('')).toBe('');
    expect(truncate('short', 20)).toBe('short');
  });
});
```

### Running Tests

```bash
# Run all tests
npm run test -- --run

# Run specific test file
npm run test -- --run src/tests/unit/Card.test.tsx

# Run with coverage report
npm run test -- --run --coverage

# Watch mode (re-run on file changes)
npm run test
```

### Best Practices

1. **Test behavior, not implementation** - Focus on what the component does, not how it does it
2. **Use descriptive names** - Test names should explain the scenario: "should show error message when email is invalid"
3. **Arrange-Act-Assert pattern** - Setup (arrange) → action (act) → verify (assert)
4. **Keep tests isolated** - Each test should be independent
5. **Mock external dependencies** - Use `vi.fn()` to mock functions and `vi.mock()` for modules
6. **Test accessibility** - Use `screen.getByRole()` to test like a user
7. **Avoid testing implementation details** - Test public APIs, not internal state

### Adding New Tests

When adding a new feature:

1. **Create test file** in `src/tests/unit/[Feature].test.tsx`
2. **Write tests first** (optional, but recommended)
3. **Implement feature** to make tests pass
4. **Ensure coverage** is 80%+ for components
5. **Run full test suite** before committing:
   ```bash
   npm run test -- --run
   ```

## Documentation

- Update README.md for significant changes
- Add JSDoc comments for complex functions
- Update content schema docs if changing JSON structure
- Include inline comments for non-obvious code

## Pre-commit Checks

Before each commit, these checks run automatically:

✅ **ESLint** - Code quality and best practices
✅ **Prettier** - Code formatting consistency
✅ **TypeScript** - Type safety verification

If checks fail, fix them before committing:

```bash
# Fix linting issues
npm run lint -- --fix

# Format code
npm run format

# Type-check
npm run type-check
```

## Pull Request Process

### Before Creating a PR

1. **Update your branch** with latest main:

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run all checks locally**:

   ```bash
   npm run type-check
   npm run lint
   npm run test -- --run
   npm run build
   ```

3. **Fix any issues** before pushing

### Creating a PR

1. **Push your branch**:

   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create PR** on GitHub with:
   - Clear title following commit message format
   - Description of changes
   - Reference to related issues: `Closes #123`
   - Screenshots for UI changes
   - Testing instructions if applicable

3. **PR Checklist**:
   - [ ] Tests added/updated
   - [ ] All checks passing locally
   - [ ] Code follows style guidelines
   - [ ] No console errors/warnings
   - [ ] Documentation updated
   - [ ] No breaking changes

### During Review

- Respond to feedback professionally
- Request changes if you disagree, don't dismiss
- Update PR based on feedback
- Re-request review after updates
- Keep commits organized (squash if needed)

### After Approval

Once approved and checks pass:

- Review workflow merges the PR automatically
- Branch is deleted after merge
- Thank reviewers for their time!

## Questions?

Feel free to open an issue with the `question` label or reach out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Documentation

- Update README.md for significant changes
- Add JSDoc comments for complex functions and components
- Update TESTING.md if adding new test patterns
- Update CONTRIBUTING.md if changing contribution guidelines
- Include inline comments for non-obvious code
- Document breaking changes in changelog

Example JSDoc:

````typescript
/**
 * Formats a number as currency
 * @param amount - The amount to format
 * @param currency - The currency code (default: USD)
 * @returns Formatted currency string
 * @example
 * ```typescript
 * formatCurrency(1234.56) // '$1,234.56'
 * ```
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}
````

## Common Issues & Solutions

### Tests Failing

**Issue:** Tests fail locally but pass in CI

- Solution: Update dependencies with `npm install`
- Check Node version: `node --version` (should be v18 or v20)
- Clear cache: `npm run test -- --run --no-cache`

### Linting Errors

**Issue:** ESLint reports errors

- Solution: Run `npm run lint -- --fix` to auto-fix many issues
- Remaining issues need manual fixes
- Check eslintrc.json for rule configuration

### Type Errors

**Issue:** TypeScript type checking fails

- Solution: Run `npm run type-check` for detailed errors
- Add explicit type annotations
- Avoid `any` type

### Pre-commit Failures

**Issue:** Git commit fails due to pre-commit checks

- Solution: Follow guidance in error message
- Run checks locally first: `npm run lint`, `npm run type-check`
- Use `git commit --no-verify` only if you know what you're doing

## Branching Strategy

### Main Branch (`main`)

- Always stable and deployable
- Protected: requires PR review and passing checks
- Deployed to production on every merge

### Feature Branches

```bash
# Create feature branch from main
git checkout main
git pull upstream main
git checkout -b feature/my-feature

# Work on feature
# ...

# Push to your fork
git push origin feature/my-feature

# Create PR on GitHub
```

### Branch Cleanup

After merging:

```bash
# Delete local branch
git branch -d feature/my-feature

# Delete remote branch
git push origin --delete feature/my-feature
```

## Getting Help

Need assistance? Here's how to get help:

1. **Check existing issues** - Search before opening a new issue
2. **Read documentation** - README.md, TESTING.md, CONTRIBUTING.md
3. **Open a discussion** - For questions and ideas
4. **Open an issue** - For bugs with details and reproduction steps
5. **Email maintainer** - For security concerns: ahmad.qaderyan@pfizer.com

## Questions or Issues?

Feel free to:

- 🐛 Open an issue for bugs (include reproduction steps)
- 💡 Open a discussion for feature ideas
- 📚 Check documentation in this repository
- 🔒 Email maintainers for security issues

---

**Thank you for contributing! Your efforts help make this project better for everyone.** 🎉
