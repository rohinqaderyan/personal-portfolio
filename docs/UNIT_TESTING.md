# Unit Testing Guide

<!-- Last reviewed: 2026-04-03 -->

## Test Structure

```typescript
describe('Component', () => {
  it('should render correctly', () => {
    // Arrange
    const props = { title: 'Test' }

    // Act
    render(<Component {...props} />)

    // Assert
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
```

## Testing Best Practices

- Test behavior, not implementation
- Use meaningful test descriptions
- Arrange-Act-Assert pattern
- Mock external dependencies

## Coverage Goals

- Aim for 80%+ coverage
- Focus on critical paths
- Test edge cases

<!-- reviewed 2026-03-21 -->
