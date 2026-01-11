# Testing Guide

<!-- Testing setup and guidelines -->
<!-- Last reviewed: 2026-01-11 -->

## Overview

This project uses **Vitest** for unit testing and **Playwright** for end-to-end testing.

> 📊 **Current Coverage**: 400+ unit tests across 14 test files

## Unit Tests

### Running Tests

```bash
# Run all tests
npm test

# Run in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage

# Run with UI
npm run test:ui
```

### Writing Tests

Tests should be placed next to the files they test with a `.test.ts` or `.test.tsx` extension.

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/Button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
```

### Test Coverage

Current test coverage includes:

- **Components**: Card, ProjectCard, Hero (basic rendering tests)
- **Utilities**: String manipulation (capitalize, case conversion, truncation), validation (email, name, message, URL), array operations (unique, groupBy, chunk, flatten, etc.)
- **Navigation**: Layout structure and responsive design assertions

### Best Practices

1. **Test behavior, not implementation**: Focus on what users see and interact with
2. **Use descriptive test names**: Make it clear what is being tested
3. **Arrange-Act-Assert pattern**: Organize tests with setup, execution, and verification
4. **Keep tests isolated**: Each test should be independent
5. **Mock external dependencies**: Use `vi.mock()` for Next.js modules and APIs
6. **Test edge cases**: Empty inputs, null values, boundary conditions
7. **Use proper assertions**: Leverage vitest's rich assertion library

### Example: Testing Utilities

```typescript
import { formatNumber } from '@/lib/number';

describe('formatNumber', () => {
  it('formats numbers with commas', () => {
    expect(formatNumber(1234567)).toBe('1,234,567');
  });

  it('handles negative numbers', () => {
    expect(formatNumber(-1234567)).toBe('-1,234,567');
  });

  it('handles zero', () => {
    expect(formatNumber(0)).toBe('0');
  });
});
```

## E2E Tests

### Running E2E Tests

```bash
# Run all E2E tests
npm run e2e

# Run in UI mode
npm run e2e:ui

# Run in headed mode
npm run e2e:headed
```

### Writing E2E Tests

E2E tests are located in the `tests/` directory.

```typescript
import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Portfolio/);
});
```

## Test Coverage

Aim for:

- **80%+ line coverage**
- **70%+ branch coverage**
- **100% coverage for critical paths**

## CI/CD Integration

Tests run automatically on:

- Push to `main` or `develop`
- Pull requests
- Pre-commit hooks (unit tests only)

## Best Practices

1. **Write meaningful test descriptions**
2. **Test user behavior, not implementation**
3. **Keep tests isolated and independent**
4. **Use data-testid for reliable selectors**
5. **Mock external dependencies**
6. **Test accessibility**
