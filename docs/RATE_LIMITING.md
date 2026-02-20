# API Rate Limiting

## Implementation

- Use express-rate-limit
- Redis for distributed systems
- Token bucket algorithm

## Configuration

- Set reasonable limits
- Different tiers per user
- Graceful degradation

## Headers

- X-RateLimit-Limit
- X-RateLimit-Remaining
- X-RateLimit-Reset

## Error Handling

- Return 429 status
- Provide retry information
<!-- Reviewed 2026-02-20 -->
