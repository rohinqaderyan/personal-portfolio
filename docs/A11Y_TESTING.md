# Accessibility Testing

<!-- Last reviewed: 2026-04-02 -->

## Manual Testing

- Keyboard navigation test
- Screen reader test (NVDA, JAWS, VoiceOver)
- Color contrast check
- Text resize test (up to 200%)
- Focus indicators visible

## Automated Tools

- Lighthouse accessibility audit
- axe DevTools
- WAVE browser extension
- Pa11y CI

## Common Issues

- Missing alt text
- Low contrast ratios
- Missing ARIA labels
- Improper heading hierarchy
- Non-keyboard accessible elements

## Testing Checklist

- [ ] All images have alt text
- [ ] Focus order is logical
- [ ] Forms are properly labeled
- [ ] Error messages are clear
- [ ] Color is not the only indicator
      Note (2026-03-10): Pair automated accessibility checks with manual screen-reader spot checks.

<!-- reviewed 2026-03-21 -->
