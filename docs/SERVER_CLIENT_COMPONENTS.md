# Server Components vs Client Components

## Server Components (Default)

- Render on server
- No JavaScript sent to client
- Can access backend resources
- Better performance

```typescript
// Default in app directory
export default function ServerComponent() {
  return <div>Server Component</div>
}
```

## Client Components

- Use 'use client' directive
- Interactive features
- React hooks
- Browser APIs

```typescript
'use client'

export default function ClientComponent() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```
