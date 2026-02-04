# Architecture Overview

<!-- Technical architecture documentation -->
<!-- Version: 1.3.12 -->
<!-- Last reviewed: 2026-02-04 -->

> 🏭️ Next.js 14 App Router | React Server Components | Edge Runtime

Technical architecture documentation for the Next.js portfolio application.

## Table of Contents

- [System Overview](#system-overview)
- [Directory Structure](#directory-structure)
- [Technology Stack](#technology-stack)
- [Data Flow](#data-flow)
- [Component Architecture](#component-architecture)
- [API Architecture](#api-architecture)
- [State Management](#state-management)
- [Styling Architecture](#styling-architecture)
- [Testing Strategy](#testing-strategy)
- [Performance Considerations](#performance-considerations)

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT BROWSER                            │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Next.js App (Static + Client Components)               │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │    │
│  │  │   Home   │ │  About   │ │ Projects │ │ Contact  │   │    │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     VERCEL EDGE NETWORK                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Static Pages │  │ API Routes   │  │ Image Optim  │          │
│  │  (CDN Edge)  │  │ (Serverless) │  │ (On-demand)  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     EXTERNAL SERVICES                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │Flask Backend │  │   GitHub     │  │  Analytics   │          │
│  │(Contact Form)│  │     API      │  │  (Optional)  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
personal-portfolio/
├── .github/                    # GitHub configuration
│   ├── workflows/              # CI/CD pipelines
│   └── ISSUE_TEMPLATE/         # Issue templates
├── public/                     # Static assets
│   ├── images/                 # Project images, icons
│   └── fonts/                  # Self-hosted fonts
├── src/                        # Source code
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── about/              # About page
│   │   ├── projects/           # Projects page
│   │   ├── contact/            # Contact page
│   │   └── api/                # API routes
│   │       └── contact/        # Contact form API
│   ├── components/             # React components
│   │   ├── ui/                 # Base UI components
│   │   ├── layout/             # Layout components
│   │   └── sections/           # Page sections
│   ├── lib/                    # Utility libraries
│   │   ├── api/                # API utilities
│   │   ├── validation.ts       # Validation helpers
│   │   ├── string.ts           # String utilities
│   │   ├── date.ts             # Date utilities
│   │   ├── number.ts           # Number utilities
│   │   ├── object.ts           # Object utilities
│   │   └── array.ts            # Array utilities
│   ├── hooks/                  # Custom React hooks
│   ├── styles/                 # Global styles
│   ├── types/                  # TypeScript types
│   └── tests/                  # Test files
│       ├── unit/               # Unit tests
│       └── e2e/                # E2E tests (Playwright)
├── content/                    # Content files (if using MDX)
├── scripts/                    # Build/setup scripts
└── docs/                       # Additional documentation
```

## Technology Stack

### Frontend

| Technology    | Version | Purpose                         |
| ------------- | ------- | ------------------------------- |
| Next.js       | 14.x    | React framework with App Router |
| React         | 18.x    | UI component library            |
| TypeScript    | 5.x     | Type-safe JavaScript            |
| Tailwind CSS  | 3.x     | Utility-first CSS framework     |
| Framer Motion | 11.x    | Animation library               |

### Backend (API Routes)

| Technology           | Purpose                      |
| -------------------- | ---------------------------- |
| Next.js API Routes   | Serverless functions         |
| Zod                  | Runtime validation           |
| Custom Error Handler | Standardized error responses |

### Development Tools

| Tool        | Purpose           |
| ----------- | ----------------- |
| ESLint      | Linting           |
| Prettier    | Code formatting   |
| Vitest      | Unit testing      |
| Playwright  | E2E testing       |
| Husky       | Git hooks         |
| lint-staged | Pre-commit checks |

### Infrastructure

| Service        | Purpose         |
| -------------- | --------------- |
| Vercel         | Hosting & CDN   |
| GitHub Actions | CI/CD           |
| GitHub         | Version control |

## Data Flow

### Static Page Generation

```
Build Time:
┌──────────┐    ┌───────────┐    ┌──────────────┐    ┌─────────┐
│ Markdown │───▶│  Next.js  │───▶│ Static HTML  │───▶│   CDN   │
│  /Data   │    │   Build   │    │   + Assets   │    │  Edge   │
└──────────┘    └───────────┘    └──────────────┘    └─────────┘

Runtime:
┌──────────┐    ┌───────────┐    ┌──────────────┐
│  Client  │───▶│    CDN    │───▶│ Cached Page  │
│ Request  │    │   Edge    │    │   Response   │
└──────────┘    └───────────┘    └──────────────┘
```

### Contact Form Submission

```
┌──────────┐    ┌───────────┐    ┌──────────────┐    ┌─────────────┐
│  Client  │───▶│  Zod      │───▶│ API Route    │───▶│   Flask     │
│   Form   │    │ Validate  │    │ /api/contact │    │  Backend    │
└──────────┘    └───────────┘    └──────────────┘    └─────────────┘
     ▲                                                      │
     │              ┌──────────────┐                        │
     └──────────────│   Response   │◀───────────────────────┘
                    └──────────────┘
```

## Component Architecture

### Component Hierarchy

```
App (Root Layout)
├── ThemeProvider
│   ├── Header
│   │   ├── Navigation
│   │   └── ThemeToggle
│   ├── Main Content
│   │   ├── Hero
│   │   ├── Section
│   │   │   ├── Card
│   │   │   └── ProjectCard
│   │   └── ContactForm
│   └── Footer
│       └── SocialIcons
```

### Component Categories

#### UI Components (`/components/ui/`)

- **Card**: Reusable card container
- **Button**: Styled button variants
- **Input**: Form input components
- **Badge**: Status/tag badges

#### Layout Components (`/components/layout/`)

- **Header**: Site header with navigation
- **Footer**: Site footer with links
- **Section**: Page section wrapper

#### Feature Components (`/components/`)

- **Hero**: Landing page hero section
- **ProjectCard**: Project showcase card
- **ContactForm**: Contact form with validation
- **Navigation**: Site navigation menu

### Component Patterns

#### Compound Components

```typescript
// Example: Card with sub-components
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

#### Render Props

```typescript
// Example: Data fetching component
<DataFetcher
  url="/api/data"
  render={({ data, loading, error }) => (
    loading ? <Spinner /> : <Content data={data} />
  )}
/>
```

## API Architecture

### Route Structure

```
/api
├── /contact
│   └── route.ts        # POST - Handle contact form
└── /health
    └── route.ts        # GET - Health check endpoint
```

### Error Handling

All API routes use centralized error handling:

```typescript
// lib/api/errorHandler.ts
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: ErrorCode,
    public details?: unknown
  ) {
    super(message);
  }
}

// Standard error response format
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
    timestamp: string;
  };
}
```

### Request Flow

1. **Request Received** → Validate headers
2. **Parse Body** → Safe JSON parsing
3. **Validate Input** → Zod schema validation
4. **Process Request** → Business logic
5. **Handle Errors** → Standardized error responses
6. **Return Response** → JSON with appropriate status

## State Management

### Client-Side State

This application uses minimal client-side state:

- **React useState/useReducer**: Component-local state
- **Context API**: Theme state (dark/light mode)
- **Form State**: react-hook-form for form management

### No External State Library Needed

Given the static nature of the portfolio:

- No global state management library (Redux, Zustand)
- Server state handled via React Server Components
- Form state handled via react-hook-form

### Theme State Example

```typescript
// contexts/ThemeContext.tsx
const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  setTheme: () => {},
})

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState<Theme>('system')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

## Styling Architecture

### Tailwind CSS Strategy

```
Global Styles (src/styles/globals.css)
        │
        ▼
Tailwind Base ──▶ Tailwind Components ──▶ Tailwind Utilities
        │                   │                      │
        ▼                   ▼                      ▼
   CSS Reset         Custom Classes          Inline Classes
```

### Naming Conventions

- **Component Classes**: Use semantic names via `@apply`
- **Utility Classes**: Inline in JSX
- **CSS Variables**: Theme tokens in `:root`

### Responsive Design

```css
/* Mobile-first approach */
.component {
  @apply w-full; /* Mobile */
  @apply sm:w-1/2; /* ≥640px */
  @apply md:w-1/3; /* ≥768px */
  @apply lg:w-1/4; /* ≥1024px */
}
```

## Testing Strategy

### Test Pyramid

```
         ▲
        /│\         E2E Tests (Playwright)
       / │ \        - Critical user flows
      /  │  \       - Cross-browser testing
     ────┼────
    /    │    \     Integration Tests
   /     │     \    - API route testing
  /      │      \   - Component integration
 ────────┼────────
/        │        \ Unit Tests (Vitest)
─────────┼─────────  - Utility functions
                     - Component rendering
                     - Error handling
```

### Test Categories

| Category    | Location                 | Tools        | Coverage Target |
| ----------- | ------------------------ | ------------ | --------------- |
| Unit        | `src/tests/unit/`        | Vitest       | 80%+            |
| Component   | `src/tests/unit/*.tsx`   | Vitest + RTL | 70%+            |
| Integration | `src/tests/integration/` | Vitest       | 60%+            |
| E2E         | `e2e/`                   | Playwright   | Critical paths  |

### Running Tests

```bash
# All unit tests
npm run test:run

# With coverage
npm run test:coverage

# Watch mode
npm run test:watch

# E2E tests
npm run e2e
```

## Performance Considerations

### Build Optimizations

- **Static Generation**: All pages pre-rendered at build
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Unused code eliminated
- **Image Optimization**: Automatic via `next/image`

### Runtime Optimizations

- **CDN Caching**: Static assets cached at edge
- **Lazy Loading**: Images below fold lazy-loaded
- **Font Optimization**: Self-hosted via `next/font`
- **Bundle Size**: < 90KB First Load JS target

### Current Metrics

| Metric        | Target  | Current   |
| ------------- | ------- | --------- |
| First Load JS | < 90KB  | 87.4KB ✅ |
| LCP           | < 2.5s  | < 1.5s ✅ |
| FID           | < 100ms | < 50ms ✅ |
| CLS           | < 0.1   | < 0.05 ✅ |
| Lighthouse    | ≥ 90    | 95+ ✅    |

---

**Document Version:** 1.0.0
**Last Updated:** December 2025
**Maintainer:** Ahmad Rohin Qaderyan

<!-- Reviewed 2026-01-26 -->
