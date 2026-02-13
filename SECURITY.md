# Security Best Practices & Policy

<!-- Security documentation and reporting -->
<!-- Last updated: 2026-02-13 -->

## Table of Contents

- [Security Policy](#security-policy)
- [Supported Versions](#supported-versions)
- [Reporting Vulnerabilities](#reporting-vulnerabilities)
- [Security Measures](#security-measures)
- [Environment Variables](#environment-variables)
- [Input Validation](#input-validation)
- [API Security](#api-security)
- [Content Security Policy](#content-security-policy)
- [CORS Configuration](#cors-configuration)
- [Deployment Security](#deployment-security)

## Security Policy

This project is maintained with security as a top priority. We follow industry best practices and implement multiple layers of protection to keep user data safe.

## Supported Versions

| Version | Supported          | Status                        |
| ------- | ------------------ | ----------------------------- |
| 1.3.x   | :white_check_mark: | Current - Actively maintained |
| 1.2.x   | :white_check_mark: | Supported until v1.4          |
| 1.0.x   | :white_check_mark: | Legacy support                |
| < 1.0   | :x:                | No longer supported           |

## Reporting Vulnerabilities

If you discover a security vulnerability, **DO NOT** open a public GitHub issue.

**Instead, please:**

1. **Email**: ahmad.qaderyan@pfizer.com
2. **Include in report**:
   - Type of vulnerability
   - Full paths of affected source files
   - Location of code (file:line, branch, or commit hash)
   - Steps to reproduce the issue
   - Proof-of-concept code (if possible)
   - Potential impact and exploitation method

3. **What to expect**:
   - Acknowledgment within 24 hours
   - Status updates every 3-5 days
   - Notification when fixed
   - Credit for responsible disclosure (if desired)

4. **Please DO NOT**:
   - Disclose publicly before fix is released
   - Share vulnerability with others
   - Exploit the vulnerability beyond testing

## Security Measures

### Application-Level Security

#### Input Validation

All user inputs are validated using Zod schemas:

```typescript
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});
```

**Server-side validation** prevents attackers from bypassing client checks:

```typescript
try {
  const body = await parseJsonBody(request);
  const validatedData = contactSchema.parse(body);
  // Process valid data only
} catch (error) {
  return handleApiError(error);
}
```

#### Error Handling

Standardized error responses prevent information leakage:

**Development:**

```json
{
  "error": "Detailed error for debugging",
  "details": { "field": "name", "message": "too short" }
}
```

**Production:**

```json
{
  "error": "Internal server error"
}
```

This ensures sensitive implementation details aren't exposed to attackers.

### Content Security

**Content Security Policy (CSP)** headers prevent XSS attacks:

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
```

**Additional Headers:**

- `X-Content-Type-Options: nosniff` - Prevent MIME sniffing
- `X-Frame-Options: DENY` - Prevent clickjacking
- `Referrer-Policy: strict-origin-when-cross-origin` - Control referrer
- `Strict-Transport-Security: max-age=31536000` - HTTPS enforcement

### Dependency Security

**Automated Security:**

- Dependabot configured for automated updates
- GitHub Security Dashboard monitoring
- Regular vulnerability scans in CI/CD

**Manual Audits:**

```bash
# Check for vulnerabilities
npm audit

# Update all packages
npm update

# Update major versions (review breaking changes)
npm update --save major
```

**Vulnerable Package Response:**

1. Run `npm audit` to identify issues
2. Update affected packages
3. Run full test suite: `npm run test -- --run`
4. Verify build: `npm run build`
5. Deploy fix promptly

### Data Protection

#### Environment Variables

Never commit sensitive data:

**Sensitive Variables (no `NEXT_PUBLIC_` prefix):**

- `FLASK_API_URL` - Backend URL
- Database credentials
- API keys
- Auth tokens
- Private configuration

**Public Variables (with `NEXT_PUBLIC_` prefix):**

- `NEXT_PUBLIC_GA_ID` - Google Analytics
- Public API endpoints
- Feature flags safe to expose

**Setup:**

```bash
# Create local environment file
cp .env.example .env.local

# .env.local is gitignored
# Add to .gitignore:
.env.local
.env.*.local
```

**Vercel Deployment:**

1. Go to Project Settings → Environment Variables
2. Set production variables
3. Select environments: Production, Preview, Development
4. Redeploy to apply changes

#### Source Maps

Source maps are disabled in production:

```javascript
// next.config.js
const config = {
  productionBrowserSourceMaps: false,
};
```

This prevents exposing original source code in browser tools.

## Environment Variables

### Contact Form API

```
FLASK_API_URL=https://your-flask-backend.com
```

Validate at startup:

```typescript
const flaskUrl = checkEnvVariable('FLASK_API_URL');
if (!flaskUrl) {
  throw new Error('FLASK_API_URL not configured');
}
```

### Analytics (Optional)

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Safe to expose since it's public tracking.

## Input Validation

### Contact Form Validation

All contact form submissions are validated:

**Rules:**

- Name: 2-100 characters
- Email: Valid RFC 5322 format
- Message: 10-5000 characters
- All fields required

**Example:**

```bash
# ✅ Valid
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "This is a message about your work"
  }'

# ❌ Invalid - missing field
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "John"}'

# ❌ Invalid - email format
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "not-an-email",
    "message": "test message here"
  }'
```

## API Security

### HTTP Status Codes

| Code | Usage               | Example                          |
| ---- | ------------------- | -------------------------------- |
| 200  | Success             | Valid form submission accepted   |
| 400  | Bad Request         | Invalid JSON or validation error |
| 405  | Method Not Allowed  | POST required, got GET           |
| 500  | Server Error        | Unhandled exception              |
| 503  | Service Unavailable | Backend service down             |

### Rate Limiting

Consider implementing rate limiting for production:

```typescript
// Example using next-rate-limit
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: 'Too many requests, please try again later',
});

export async function POST(request, res) {
  return limiter(request, res, () => {
    /* handler */
  });
}
```

## Content Security Policy

### What CSP Does

Prevents inline script injection and controls resource loading:

```
default-src 'self';         // Only same-origin resources
script-src 'unsafe-inline'; // Allow inline scripts (Tailwind)
img-src https:;             // HTTPS images only
```

### Configuring CSP

In `next.config.js`:

```javascript
headers: [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      font-src 'self' data:;
      connect-src 'self' https://www.google-analytics.com;
    `
      .trim()
      .replace(/\n/g, ' '),
  },
];
```

### CSP Best Practices

1. Start with `default-src 'self'`
2. Whitelist external resources explicitly
3. Avoid `'unsafe-eval'` for scripts
4. Use nonces for inline scripts when possible
5. Monitor CSP violations

## CORS Configuration

### Same-Origin Policy

By default, browsers enforce same-origin policy for XHR and Fetch API.

**Current Setup:**

- Contact form: Same-origin (Flask backend)
- API routes: Same-origin
- External requests: Explicitly configured

### Adding CORS

For cross-origin requests, explicitly configure:

```typescript
// src/app/api/route.ts
export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://trusted-domain.com',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}
```

**⚠️ Important:**

- Never use `'*'` in production
- Whitelist specific trusted domains only
- Validate request origins server-side
- Use credentials carefully

## Deployment Security

### Pre-Deployment Checklist

- [ ] No secrets in source code
- [ ] Environment variables configured on Vercel
- [ ] `.env.local` in `.gitignore`
- [ ] `npm audit` shows no high-severity vulnerabilities
- [ ] All tests passing: `npm run test -- --run`
- [ ] ESLint passing: `npm run lint`
- [ ] TypeScript strict mode: `npm run type-check`
- [ ] Build successful: `npm run build`
- [ ] No console.log with sensitive data
- [ ] Source maps disabled in production
- [ ] CSP headers configured
- [ ] HTTPS enabled (automatic with Vercel)

### Vercel Production Configuration

1. **Environment Variables**:

   ```
   FLASK_API_URL = https://your-backend.com
   ```

2. **Deployment Branch**: `main` only

3. **Auto-Deploy**: On push to `main`

4. **Preview Deployments**: Enabled for PRs

5. **Security Headers**: Configured in `next.config.js`

### Monitoring

- Monitor error logs regularly
- Review failed authentication attempts
- Track API response times
- Alert on unusual traffic patterns
- Review security audit logs

## Security Testing

### Local Testing

```bash
# Type safety
npm run type-check

# Code quality
npm run lint

# Unit tests
npm run test -- --run

# Build verification
npm run build
```

### Automated Testing

GitHub Actions runs security checks on every push:

1. **Type checking**: TypeScript strict mode
2. **Linting**: ESLint rules
3. **Tests**: 182 unit tests
4. **Build**: Production build verification

### Manual Security Testing

```bash
# Test invalid input
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"invalid": "data"}'

# Test missing fields
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{}'

# Test large payloads
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"'$(printf 'a%.0s' {1..10000})'","email":"test@test.com","message":"test"}'
```

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Common vulnerabilities
- [Node.js Security](https://nodejs.org/en/docs/guides/security/) - Node.js best practices
- [Next.js Security](https://nextjs.org/docs/going-to-production/security) - Next.js security
- [CSP Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) - Content Security Policy
- [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) - Cross-Origin Resource Sharing

---

**Last Updated:** January 2024
**Maintained By:** Ahmad Rohin Qaderyan
**Security Contact:** ahmad.qaderyan@pfizer.com

- HTTPS enforcement in production

## Disclosure Policy

- Security issues will be acknowledged within 48 hours
- We aim to provide a fix within 7 days for critical issues
- You will be credited for your discovery (if desired)
- We ask that you do not publicly disclose the issue until we've addressed it

Thank you for helping keep this project secure!

<!-- Reviewed 2026-01-26 -->
