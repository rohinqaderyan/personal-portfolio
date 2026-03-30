# API Design Principles

<!-- Last updated: 2026-03-30 -->

## RESTful Design

- Use HTTP methods correctly
- Consistent naming
- Proper status codes
- Pagination support

## Error Responses

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {}
}
```

## Versioning

- URL versioning: /api/v1
- Header versioning
- Backward compatibility

<!-- reviewed 2026-03-18 -->
