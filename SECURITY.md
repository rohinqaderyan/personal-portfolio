# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within this portfolio project, please send an email to rohin.aryain@gmail.com. All security vulnerabilities will be promptly addressed.

Please include the following information in your report:

- Type of vulnerability
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

## Security Measures

This project implements several security measures:

### Content Security
- XSS protection headers
- Content-Type-Options set to nosniff
- Frame-Options configured
- Strict Transport Security enabled

### Dependency Security
- Regular dependency updates via Dependabot
- Automated security scanning in CI/CD pipeline
- No known high-severity vulnerabilities

### Data Protection
- Environment variables for sensitive data
- No hardcoded credentials or API keys
- Secure form submission handling

### Best Practices
- TypeScript for type safety
- Input validation with Zod
- Secure HTTP headers
- HTTPS enforcement in production

## Disclosure Policy

- Security issues will be acknowledged within 48 hours
- We aim to provide a fix within 7 days for critical issues
- You will be credited for your discovery (if desired)
- We ask that you do not publicly disclose the issue until we've addressed it

Thank you for helping keep this project secure!
