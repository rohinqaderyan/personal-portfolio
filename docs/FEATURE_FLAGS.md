# Feature Flags

## Implementation

```typescript
const features = {
  newDesign: process.env.FEATURE_NEW_DESIGN === 'true',
  betaFeatures: process.env.FEATURE_BETA === 'true',
  analytics: process.env.FEATURE_ANALYTICS === 'true',
};

export function useFeature(name: keyof typeof features) {
  return features[name];
}
```

## Usage

```typescript
function Component() {
  const showNewDesign = useFeature('newDesign')

  return showNewDesign ? <NewDesign /> : <OldDesign />
}
```

## Benefits

- Gradual rollout
- A/B testing
- Quick rollback
- Environment-specific features

## Best Practices

- Document all flags
- Remove old flags
- Use descriptive names
- Clean up unused flags
<!-- Reviewed: 2026-02-12 -->
