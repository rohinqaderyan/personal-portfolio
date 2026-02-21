# Error Handling Best Practices

## Try-Catch Blocks

```typescript
try {
  await fetchData();
} catch (error) {
  console.error('Error fetching data:', error);
  // Handle error appropriately
}
```

## Error Boundaries

```typescript
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Log error
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />
    }
    return this.props.children
  }
}
```

## API Error Handling

- Return appropriate status codes
- Provide clear error messages
- Log errors for debugging
- Don't expose sensitive info
<!-- Reviewed 2026-02-21 -->
