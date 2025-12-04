# Testing Guide

## Overview

This project uses **Vitest** for unit testing and **Playwright** for end-to-end testing.

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
import { test, expect } from '@playwright/test'

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Portfolio/)
})
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
