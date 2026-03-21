# API Documentation

<!-- API endpoints and usage -->
<!-- Last updated: 2026-03-12 -->

> 📡 API Version: v1 | Next.js App Router

## Contact Form API

### Endpoint

`POST /api/contact`

### Request Body

```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```

### Response

```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message"
}
```

## Rate Limiting

- 5 requests per minute per IP
- Returns 429 if exceeded

## CORS

- Allowed origins: Same origin only
- Methods: POST only

## Security

- Input validation
- XSS prevention
- CSRF protection
<!-- Reviewed 2026-01-26 -->

Note (2026-03-10): Keep example payload fields in sync with current schema names.

<!-- reviewed 2026-03-21 -->
