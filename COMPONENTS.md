# Component Documentation 

> 🧩 50+ reusable React components with TypeScript

## Overview

This document provides detailed documentation for all React components in the portfolio application.

## Component Architecture

### Component Structure

```
src/components/
├── layout/          # Layout components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Navigation.tsx
├── ui/              # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Modal.tsx
├── sections/        # Page sections
│   ├── Hero.tsx
│   ├── About.tsx
│   └── Projects.tsx
└── features/        # Feature-specific components
    ├── ContactForm.tsx
    └── ProjectCard.tsx
```

## Layout Components

### Header

Main navigation header component.

**Location:** `src/components/layout/Header.tsx`

**Props:**

```typescript
interface HeaderProps {
  sticky?: boolean
  transparent?: boolean
}
```

**Usage:**

```typescript
import { Header } from '@/components/layout/Header';

<Header sticky={true} transparent={false} />
```

**Features:**

- Responsive navigation
- Mobile menu toggle
- Scroll-based styling
- Active link highlighting

**Example:**

```typescript
export const Header = ({ sticky = true, transparent = false }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'transition-all duration-300',
        sticky && 'sticky top-0 z-50',
        transparent && !isScrolled ? 'bg-transparent' : 'bg-white shadow-md'
      )}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <NavigationLinks />
          <MobileMenuButton onClick={() => setIsOpen(!isOpen)} />
        </div>
        {isOpen && <MobileMenu />}
      </nav>
    </header>
  );
};
```

### Footer

Site footer with links and information.

**Location:** `src/components/layout/Footer.tsx`

**Props:** None (static component)

**Usage:**

```typescript
import { Footer } from '@/components/layout/Footer';

<Footer />
```

**Features:**

- Social media links
- Copyright information
- Quick links navigation
- Contact information

### Navigation

Navigation menu component.

**Location:** `src/components/layout/Navigation.tsx`

**Props:**

```typescript
interface NavigationProps {
  items: NavigationItem[]
  orientation?: 'horizontal' | 'vertical'
}

interface NavigationItem {
  label: string
  href: string
  icon?: React.ReactNode
}
```

**Usage:**

```typescript
const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

<Navigation items={navItems} orientation="horizontal" />
```

## UI Components

### Button

Reusable button component with variants.

**Location:** `src/components/ui/Button.tsx`

**Props:**

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ReactNode
  fullWidth?: boolean
}
```

**Usage:**

```typescript
import { Button } from '@/components/ui/Button';

<Button variant="primary" size="lg" loading={false}>
  Click Me
</Button>

<Button variant="outline" icon={<Icon />}>
  With Icon
</Button>
```

**Variants:**

```typescript
const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700',
  outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
  ghost: 'text-blue-600 hover:bg-blue-50',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}
```

**Example:**

```typescript
export const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  fullWidth = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2',
        'rounded-lg font-medium transition-all',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner />}
      {icon && !loading && icon}
      {children}
    </button>
  );
};
```

### Card

Container component for content.

**Location:** `src/components/ui/Card.tsx`

**Props:**

```typescript
interface CardProps {
  title?: string
  description?: string
  image?: string
  footer?: React.ReactNode
  variant?: 'default' | 'outlined' | 'elevated'
  hoverable?: boolean
  children: React.ReactNode
}
```

**Usage:**

```typescript
<Card
  title="Card Title"
  description="Card description"
  image="/image.jpg"
  variant="elevated"
  hoverable
>
  <p>Card content goes here</p>
</Card>
```

### Modal

Modal dialog component.

**Location:** `src/components/ui/Modal.tsx`

**Props:**

```typescript
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
}
```

**Usage:**

```typescript
const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="md"
>
  <p>Modal content</p>
</Modal>
```

**Features:**

- Backdrop overlay
- Click outside to close
- ESC key to close
- Focus trap
- Scroll lock

## Section Components

### Hero

Homepage hero section.

**Location:** `src/components/sections/Hero.tsx`

**Props:**

```typescript
interface HeroProps {
  title: string
  subtitle: string
  cta?: {
    label: string
    href: string
  }
  image?: string
}
```

**Usage:**

```typescript
<Hero
  title="Ahmad Rohin Qaderyan"
  subtitle="Senior Full Stack Developer & Data Scientist"
  cta={{ label: 'View Projects', href: '/projects' }}
  image="/hero.jpg"
/>
```

### About

About section component.

**Location:** `src/components/sections/About.tsx`

**Props:**

```typescript
interface AboutProps {
  bio: string
  skills: string[]
  experience: ExperienceItem[]
}

interface ExperienceItem {
  title: string
  company: string
  period: string
  description: string
}
```

### Projects

Projects showcase section.

**Location:** `src/components/sections/Projects.tsx`

**Props:**

```typescript
interface ProjectsProps {
  projects: Project[]
  limit?: number
  showFilters?: boolean
}

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  link?: string
  github?: string
}
```

**Usage:**

```typescript
<Projects
  projects={projectsList}
  limit={6}
  showFilters={true}
/>
```

## Feature Components

### ContactForm

Contact form with validation.

**Location:** `src/components/features/ContactForm.tsx`

**Props:**

```typescript
interface ContactFormProps {
  onSuccess?: (data: FormData) => void
  onError?: (error: Error) => void
}

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}
```

**Usage:**

```typescript
<ContactForm
  onSuccess={(data) => console.log('Form submitted:', data)}
  onError={(error) => console.error('Form error:', error)}
/>
```

**Features:**

- Real-time validation
- Error messages
- Loading states
- Success feedback
- Rate limiting

**Example:**

```typescript
export const ContactForm = ({ onSuccess, onError }: ContactFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Valid email is required';
    }

    if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send message');

      onSuccess?.(formData);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      onError?.(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
      />
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
      />
      <Input
        label="Subject"
        value={formData.subject}
        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        error={errors.subject}
      />
      <Textarea
        label="Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        error={errors.message}
      />
      <Button type="submit" loading={loading} fullWidth>
        Send Message
      </Button>
    </form>
  );
};
```

### ProjectCard

Individual project card component.

**Location:** `src/components/features/ProjectCard.tsx`

**Props:**

```typescript
interface ProjectCardProps {
  project: {
    id: string
    title: string
    description: string
    image: string
    tags: string[]
    link?: string
    github?: string
  }
  variant?: 'grid' | 'list'
}
```

**Usage:**

```typescript
<ProjectCard
  project={projectData}
  variant="grid"
/>
```

**Features:**

- Responsive layout
- Tag filtering
- External links
- Hover effects
- Image optimization

## Hooks

### useMediaQuery

Responsive design hook.

```typescript
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

// Usage
const isMobile = useMediaQuery('(max-width: 768px)')
```

### useDebounce

Debounce hook for performance.

```typescript
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

// Usage
const debouncedSearchTerm = useDebounce(searchTerm, 300)
```

### useLocalStorage

Persist state in localStorage.

```typescript
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue] as const
}

// Usage
const [theme, setTheme] = useLocalStorage('theme', 'light')
```

## Best Practices

### Component Organization

1. **Props interface first**
2. **Component function**
3. **Hooks at top**
4. **Helper functions**
5. **JSX return**

### Naming Conventions

- **Components**: PascalCase (`Button`, `ProjectCard`)
- **Props**: camelCase (`onClick`, `isLoading`)
- **Files**: PascalCase (`Button.tsx`, `Header.tsx`)
- **Hooks**: camelCase with `use` prefix (`useDebounce`)

### Type Safety

Always define props interfaces:

```typescript
interface ComponentProps {
  required: string
  optional?: number
  children?: React.ReactNode
}
```

### Performance

- Use `memo` for expensive components
- Use `useCallback` for callback functions
- Use `useMemo` for expensive calculations
- Lazy load heavy components

### Accessibility

- Use semantic HTML
- Add ARIA attributes
- Ensure keyboard navigation
- Provide alt text for images

## Testing Components

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

## Resources

- [React Documentation](https://react.dev/)
- [Next.js Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Tailwind Components](https://tailwindui.com/)
- [Radix UI](https://www.radix-ui.com/)

## Support

Questions about components?

- **Email**: ahmad.qaderyan@pfizer.com
- **Issues**: https://github.com/rohinqaderyan/personal-portfolio/issues
