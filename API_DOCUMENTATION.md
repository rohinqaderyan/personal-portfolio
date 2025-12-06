# API Documentation

Documentation for all API endpoints in this portfolio application.

## Base URL

```
Local: http://localhost:3000/api
Production: https://rqdev.vercel.app/api
```

## Endpoints

### POST /api/contact

Submit contact form to send email via Flask backend.

#### Request

**Headers:**

```
Content-Type: application/json
```

**Body:**

```json
{
  "name": "string (2-100 characters)",
  "email": "string (valid email format)",
  "message": "string (10-5000 characters)"
}
```

**Example:**

```bash
curl -X POST https://rqdev.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello, I would like to discuss a potential project collaboration."
  }'
```

#### Response

**Success (200 OK):**

```json
{
  "message": "Email sent successfully",
  "data": {
    "messageId": "abc123",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

**Validation Error (400 Bad Request):**

```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email address",
      "code": "invalid_string"
    }
  ],
  "timestamp": "2024-01-15T10:30:00Z",
  "path": "/api/contact"
}
```

**Missing Field (400 Bad Request):**

```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "name",
      "message": "Required",
      "code": "invalid_type"
    }
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Server Error (500 Internal Server Error):**

```json
{
  "error": "Internal server error",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Service Unavailable (503 Service Unavailable):**

```json
{
  "error": "Email service temporarily unavailable",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### Status Codes

| Code | Description                                     |
| ---- | ----------------------------------------------- |
| 200  | Success - Email sent                            |
| 400  | Bad Request - Invalid input or validation error |
| 500  | Internal Server Error - Unexpected error        |
| 503  | Service Unavailable - Backend service down      |

#### Validation Rules

**Name:**

- Required field
- Minimum length: 2 characters
- Maximum length: 100 characters
- Must contain at least one non-whitespace character

**Email:**

- Required field
- Must be valid email format (RFC 5322)
- Examples:
  - ✅ Valid: `john@example.com`, `user.name@company.co.uk`
  - ❌ Invalid: `notanemail`, `@example.com`, `user@`

**Message:**

- Required field
- Minimum length: 10 characters
- Maximum length: 5000 characters
- Must contain at least one non-whitespace character

#### Error Handling

The API uses standardized error responses:

**Development Environment:**

- Detailed error messages
- Stack traces
- Field-level validation errors

**Production Environment:**

- Generic error messages (no sensitive details)
- No stack traces
- Field-level validation errors (safe)

#### Rate Limiting

**Current:** No rate limiting implemented

**Recommended for Production:**

- 5 requests per 15 minutes per IP
- 429 Too Many Requests response when exceeded
- Retry-After header with wait time

```typescript
// Example rate limiting implementation
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests
  message: {
    error: 'Too many requests, please try again later',
    retryAfter: '15 minutes',
  },
})
```

## Error Response Format

All errors follow this structure:

```typescript
interface ErrorResponse {
  error: string // Human-readable error message
  details?: Array<ValidationError> | object // Optional validation details
  timestamp?: string // ISO 8601 timestamp
  path?: string // API endpoint path
}

interface ValidationError {
  field: string // Name of invalid field
  message: string // Description of error
  code: string // Error code (e.g., 'invalid_type', 'too_small')
}
```

## Testing API Endpoints

### Using cURL

**Valid Request:**

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message for the contact form."
  }'
```

**Invalid Email:**

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "not-an-email",
    "message": "This is a test message."
  }'
```

**Missing Field:**

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com"
  }'
```

### Using Postman

1. Create new POST request
2. URL: `http://localhost:3000/api/contact`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "message": "Test message here"
   }
   ```
5. Send request

### Using JavaScript Fetch

```typescript
async function sendContactForm(data: ContactFormData) {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to send message')
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Contact form error:', error)
    throw error
  }
}

// Usage
const formData = {
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello, I would like to connect.',
}

sendContactForm(formData)
  .then((result) => console.log('Success:', result))
  .catch((error) => console.error('Error:', error))
```

## Environment Variables

### Required

```
FLASK_API_URL=https://your-flask-backend.com
```

Backend URL for email service. Must be set or API will return 500 error.

### Optional

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Google Analytics tracking ID (public variable).

## Backend Integration

### Flask Backend Requirements

The contact API forwards requests to a Flask backend with this spec:

**Endpoint:** `POST /send-email`

**Headers:**

```
Content-Type: application/json
```

**Body:**

```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```

**Expected Response:**

```json
{
  "success": true,
  "messageId": "abc123"
}
```

### Timeout Configuration

Requests to Flask backend have a 10-second timeout:

```typescript
const controller = new AbortController()
const timeoutId = setTimeout(() => controller.abort(), 10000)

try {
  const response = await fetch(`${flaskUrl}/send-email`, {
    method: 'POST',
    signal: controller.signal,
    // ...
  })
} finally {
  clearTimeout(timeoutId)
}
```

If timeout occurs, API returns 503 Service Unavailable.

## Security

### Input Validation

All inputs validated server-side using Zod schemas:

```typescript
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})
```

### CORS

Same-origin policy enforced. Cross-origin requests rejected.

**To enable CORS:**

```typescript
// Add OPTIONS handler in route.ts
export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://trusted-domain.com',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
```

### Content-Type Enforcement

Only `application/json` accepted:

```typescript
const contentType = request.headers.get('content-type')
if (!contentType?.includes('application/json')) {
  throw new ApiError(400, 'Content-Type must be application/json')
}
```

### Error Information Disclosure

Production errors are sanitized to prevent information leakage:

**Development:**

```json
{
  "error": "Database connection failed at line 42 in db.connect()",
  "details": { "stack": "..." }
}
```

**Production:**

```json
{
  "error": "Internal server error"
}
```

## Testing

### Unit Tests

API endpoints have comprehensive test coverage:

- `src/tests/unit/contact.test.ts` - 15 tests
- `src/tests/unit/errorHandler.test.ts` - 25 tests

**Run tests:**

```bash
npm run test -- --run src/tests/unit/contact.test.ts
npm run test -- --run src/tests/unit/errorHandler.test.ts
```

**Test coverage:**

- ✅ Valid requests
- ✅ Validation errors (name, email, message)
- ✅ Invalid JSON
- ✅ Missing Content-Type
- ✅ Backend service errors
- ✅ Environment configuration
- ✅ Timeout handling

## Common Issues

### 500: Required environment variable not configured

**Error:**

```json
{
  "error": "Required environment variable FLASK_API_URL is not configured"
}
```

**Solution:**
Set `FLASK_API_URL` in Vercel environment variables or `.env.local`.

### 503: Email service temporarily unavailable

**Error:**

```json
{
  "error": "Email service temporarily unavailable"
}
```

**Causes:**

- Flask backend is down
- Network connectivity issues
- Request timeout (> 10 seconds)

**Solution:**
Check Flask backend is running and accessible.

### 400: Content-Type must be application/json

**Error:**

```json
{
  "error": "Content-Type must be application/json"
}
```

**Solution:**
Add `Content-Type: application/json` header to request.

## Changelog

### v1.2.0 (Current)

- ✅ Comprehensive error handling
- ✅ Zod validation
- ✅ Timeout support (10 seconds)
- ✅ Standardized error responses
- ✅ Environment variable validation
- ✅ 40 test cases for error handling

### v1.1.0

- Initial contact API implementation
- Basic validation
- Flask backend integration

---

**Last Updated:** January 2024
**API Version:** 1.2.0
**Maintained By:** Ahmad Rohin Qaderyan
