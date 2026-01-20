# Code Style Guide

<!-- Coding standards and style guidelines -->
<!-- Last reviewed: 2026-01-20 -->

> ✨ Enforced by ESLint + Prettier | Pre-commit hooks via Husky

## Overview

This project follows industry-standard code style conventions to maintain consistency and readability.

## TypeScript & JavaScript

### Naming Conventions

```typescript
// PascalCase for components, classes, types
export const ProjectCard: React.FC<ProjectCardProps> = () => {};
interface ProjectCardProps {}
type Status = 'active' | 'inactive';

// camelCase for variables, functions, methods
const userName = 'John';
function getUserData() {}

// UPPER_SNAKE_CASE for constants
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_ATTEMPTS = 3;

// kebab-case for file names
project - card.tsx;
user - profile.ts;
```

### Function Style

```typescript
// Prefer arrow functions for callbacks
const handleClick = () => {};

// Use function declarations for top-level functions
export function calculateTotal(items: Item[]) {}

// Async functions
async function fetchData(): Promise<Data> {}
```

### Import Order

```typescript
// 1. React and Next.js
import { useState } from 'react';
import Link from 'next/link';

// 2. External libraries
import { motion } from 'framer-motion';
import clsx from 'clsx';

// 3. Internal components
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

// 4. Utils and hooks
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

// 5. Types
import type { Project } from '@/types';

// 6. Styles
import styles from './styles.module.css';
```

### Component Structure

```typescript
'use client' // If needed

import statements

// Types
interface ComponentProps {}

// Component
export const Component = ({ prop }: ComponentProps) => {
  // Hooks
  const [state, setState] = useState()

  // Handlers
  const handleClick = () => {}

  // Effects
  useEffect(() => {}, [])

  // Render
  return <div>...</div>
}
```

## React Best Practices

### Props

```typescript
// Destructure props
const Button = ({ children, onClick, disabled }: ButtonProps) => {};

// Provide default values
const Button = ({ size = 'medium', variant = 'primary' }: ButtonProps) => {};

// Use TypeScript for prop validation
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}
```

### State Management

```typescript
// Group related state
const [formData, setFormData] = useState({
  name: '',
  email: '',
});

// Use updater function for state based on previous value
setCount((prev) => prev + 1);
```

### Conditional Rendering

```typescript
// Ternary for simple conditions
{isLoading ? <Spinner /> : <Content />}

// Logical AND for single condition
{error && <ErrorMessage />}

// Early returns for complex logic
if (isLoading) return <Spinner />
if (error) return <ErrorMessage />
return <Content />
```

## CSS & Tailwind

### Class Organization

```tsx
// Group related classes
<div className="
  flex items-center justify-between
  px-4 py-2
  bg-white dark:bg-gray-900
  rounded-lg shadow-md
  hover:shadow-lg transition-shadow
">
```

### Use cn() Utility

```tsx
import { cn } from '@/lib/utils'

<div className={cn(
  'base-classes',
  isActive && 'active-classes',
  className // Allow prop override
)}>
```

## Comments

### When to Comment

```typescript
// Good: Explain WHY, not WHAT
// Fallback to system locale if user preference not set
const locale = userLocale || navigator.language;

// Good: Complex business logic
// Calculate discount: 10% for orders > $100, 20% for > $500
const discount = total > 500 ? 0.2 : total > 100 ? 0.1 : 0;

// Bad: Obvious comments
// Set the name to John
const name = 'John';
```

### JSDoc for Functions

```typescript
/**
 * Formats a date string to a human-readable format
 * @param date - ISO date string
 * @param format - Desired output format
 * @returns Formatted date string
 */
export function formatDate(date: string, format: 'short' | 'long'): string {}
```

## File Organization

```
src/
├── app/              # Next.js pages
├── components/       # Reusable components
│   ├── ui/          # Basic UI components
│   └── features/    # Feature-specific components
├── lib/             # Utilities
├── hooks/           # Custom hooks
├── types/           # TypeScript types
└── styles/          # Global styles
```

## Formatting Rules

### Prettier Configuration

- **Print width**: 100
- **Tab width**: 2 spaces
- **Semi-colons**: Required
- **Quotes**: Single
- **Trailing commas**: ES5
- **Arrow parens**: Always

### Line Length

- Max 100 characters per line
- Break long chains into multiple lines
- Use prettier for automatic formatting

## Git Commit Messages

### Format

```
type(scope): subject

body

footer
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation
- **style**: Formatting changes
- **refactor**: Code restructure
- **perf**: Performance improvement
- **test**: Add tests
- **chore**: Maintenance

### Examples

```bash
feat(auth): add social login support

- Implement Google OAuth
- Add Facebook login
- Update user model

Closes #123
```

## Testing

### Test File Naming

```
component.tsx
component.test.tsx  # Unit tests
component.spec.tsx  # Integration tests
```

### Test Structure

```typescript
describe('Component', () => {
  it('renders correctly', () => {
    // Arrange
    const props = { ... }

    // Act
    render(<Component {...props} />)

    // Assert
    expect(screen.getByText('...')).toBeInTheDocument()
  })
})
```

## Performance Best Practices

```typescript
// Memoize expensive components
export const ExpensiveComponent = memo(({ data }: Props) => {});

// Memoize expensive calculations
const result = useMemo(() => expensiveOperation(data), [data]);

// Memoize callbacks
const handleClick = useCallback(() => {}, []);

// Dynamic imports for code splitting
const HeavyComponent = dynamic(() => import('./HeavyComponent'));
```

## Accessibility

```tsx
// Always include alt text
<img src="..." alt="Descriptive text" />

// Use semantic HTML
<button>Click me</button>  // Not <div onClick={}>

// Include ARIA labels when needed
<button aria-label="Close menu" onClick={closeMenu}>
  <X />
</button>
```

## Tools

- **ESLint**: Linting
- **Prettier**: Formatting
- **TypeScript**: Type checking
- **Husky**: Pre-commit hooks
- **lint-staged**: Run linters on staged files

## Resources

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Tailwind CSS Best Practices](https://tailwindcss.com/docs/reusing-styles)
