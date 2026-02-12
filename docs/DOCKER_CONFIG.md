# Docker Configuration

## Dockerfile Example

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
RUN npm ci --production
EXPOSE 3000
CMD ["npm", "start"]
```

## Docker Compose

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
```

## Commands

```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
docker-compose up
```
<!-- Reviewed: 2026-02-12 -->
