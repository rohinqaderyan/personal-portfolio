# Component Patterns

<!-- Last reviewed: 2026-04-23 -->

## Functional Components

```typescript
export function Component({ prop }: Props) {
  return <div>{prop}</div>
}
```

## Props Interface

```typescript
interface ComponentProps {
  title: string;
  onClick?: () => void;
  children?: React.ReactNode;
}
```

## Custom Hooks

```typescript
export function useCustomHook() {
  const [state, setState] = useState();
  return { state, setState };
}
```

## Context Pattern

- Create context
- Provide context value
- Consume with useContext
<!-- reviewed 2026-04-19 -->
