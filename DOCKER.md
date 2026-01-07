# Docker Deployment Guide

<!-- Docker container setup and deployment -->
<!-- Updated: 2026-01-07 -->

> 🐳 Compatible with Docker 20.10+ and Docker Compose v2

## Overview

This guide covers containerizing and deploying the portfolio application using Docker and Docker Compose.

## Prerequisites

- Docker 20.10 or later
- Docker Compose 2.0 or later
- 2GB RAM minimum
- 10GB disk space

## Quick Start

### 1. Build and Run

```bash
# Build image
docker build -t portfolio:latest .

# Run container
docker run -p 3000:3000 portfolio:latest
```

### 2. Using Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Dockerfile

Create `Dockerfile` in project root:

```dockerfile
# syntax=docker/dockerfile:1

# Base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Build application
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create system user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

## Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: portfolio-app
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_SITE_URL=http://localhost:3000
    restart: unless-stopped
    networks:
      - portfolio-network
    healthcheck:
      test: ['CMD', 'wget', '--quiet', '--tries=1', '--spider', 'http://localhost:3000/api/health']
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  # Optional: PostgreSQL database
  db:
    image: postgres:15-alpine
    container_name: portfolio-db
    environment:
      POSTGRES_DB: portfolio
      POSTGRES_USER: portfolio_user
      POSTGRES_PASSWORD: ${DB_PASSWORD:-changeme}
    volumes:
      - postgres-data:/var/lib/postgresql/data
    ports:
      - '5432:5432'
    networks:
      - portfolio-network
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U portfolio_user']
      interval: 10s
      timeout: 5s
      retries: 5

  # Optional: Redis cache
  redis:
    image: redis:7-alpine
    container_name: portfolio-redis
    ports:
      - '6379:6379'
    networks:
      - portfolio-network
    command: redis-server --appendonly yes
    volumes:
      - redis-data:/data
    healthcheck:
      test: ['CMD', 'redis-cli', 'ping']
      interval: 10s
      timeout: 5s
      retries: 5

  # Optional: Nginx reverse proxy
  nginx:
    image: nginx:alpine
    container_name: portfolio-nginx
    ports:
      - '80:80'
      - '443:443'
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - app
    networks:
      - portfolio-network
    restart: unless-stopped

networks:
  portfolio-network:
    driver: bridge

volumes:
  postgres-data:
  redis-data:
```

## Environment Variables

Create `.env.docker`:

```env
# Application
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=RQ Portfolio

# Database (if using)
DATABASE_URL=postgresql://portfolio_user:changeme@db:5432/portfolio
DB_PASSWORD=changeme

# Redis (if using)
REDIS_URL=redis://redis:6379

# Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=
```

Load environment:

```bash
docker-compose --env-file .env.docker up
```

## Multi-Stage Build Optimization

### Development Image

```dockerfile
# Dockerfile.dev
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

### Production Image with Caching

```dockerfile
# Use BuildKit for better caching
# syntax=docker/dockerfile:1

FROM node:18-alpine AS base

# Dependencies stage
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Build stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN --mount=type=cache,target=/app/.next/cache \
    npm run build

# Production stage
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

## Nginx Configuration

Create `nginx.conf`:

```nginx
events {
    worker_connections 1024;
}

http {
    upstream app {
        server app:3000;
    }

    server {
        listen 80;
        server_name localhost;

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;

        # Gzip compression
        gzip on;
        gzip_vary on;
        gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

        location / {
            proxy_pass http://app;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        # Static assets caching
        location /_next/static {
            proxy_pass http://app;
            proxy_cache_valid 200 365d;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

## Docker Commands

### Build

```bash
# Build with tag
docker build -t portfolio:v1.0.0 .

# Build with BuildKit
DOCKER_BUILDKIT=1 docker build -t portfolio:latest .

# Build specific stage
docker build --target builder -t portfolio:builder .

# Build with build args
docker build --build-arg NODE_ENV=production -t portfolio:latest .
```

### Run

```bash
# Run with port mapping
docker run -p 3000:3000 portfolio:latest

# Run with environment variables
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_SITE_URL=http://localhost:3000 \
  portfolio:latest

# Run with volume mount
docker run -p 3000:3000 \
  -v $(pwd)/data:/app/data \
  portfolio:latest

# Run in detached mode
docker run -d -p 3000:3000 --name portfolio portfolio:latest

# Run with restart policy
docker run -d -p 3000:3000 \
  --restart unless-stopped \
  portfolio:latest
```

### Manage

```bash
# List containers
docker ps
docker ps -a

# View logs
docker logs portfolio
docker logs -f portfolio  # Follow
docker logs --tail 100 portfolio  # Last 100 lines

# Execute command
docker exec -it portfolio sh
docker exec portfolio npm run build

# Stop/Start
docker stop portfolio
docker start portfolio
docker restart portfolio

# Remove
docker rm portfolio
docker rm -f portfolio  # Force remove

# Clean up
docker system prune -a
docker volume prune
```

### Docker Compose Commands

```bash
# Start services
docker-compose up
docker-compose up -d  # Detached
docker-compose up --build  # Rebuild

# Stop services
docker-compose stop
docker-compose down  # Remove containers
docker-compose down -v  # Remove volumes too

# View logs
docker-compose logs
docker-compose logs -f app  # Follow app logs
docker-compose logs --tail=100  # Last 100 lines

# Scale services
docker-compose up -d --scale app=3

# Execute command
docker-compose exec app sh
docker-compose exec app npm run build

# Restart service
docker-compose restart app
```

## Health Checks

### Application Health Endpoint

Create `app/api/health/route.ts`:

```typescript
export async function GET() {
  return Response.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  });
}
```

### Docker Health Check

```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"
```

## Performance Optimization

### Layer Caching

```dockerfile
# ✅ Good - Separate layers
COPY package*.json ./
RUN npm ci
COPY . .

# ❌ Bad - Single layer
COPY . .
RUN npm ci
```

### Multi-Platform Build

```bash
# Build for multiple platforms
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t portfolio:latest \
  .
```

### Image Size Optimization

```dockerfile
# Use alpine base
FROM node:18-alpine

# Remove dev dependencies
RUN npm ci --production

# Use specific COPY
COPY package.json ./
COPY src/ ./src/

# Clean cache
RUN npm cache clean --force
```

## Deployment

### AWS ECS

```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin <account>.dkr.ecr.us-east-1.amazonaws.com

# Tag image
docker tag portfolio:latest <account>.dkr.ecr.us-east-1.amazonaws.com/portfolio:latest

# Push image
docker push <account>.dkr.ecr.us-east-1.amazonaws.com/portfolio:latest
```

### Google Cloud Run

```bash
# Build and push
gcloud builds submit --tag gcr.io/<project>/portfolio

# Deploy
gcloud run deploy portfolio \
  --image gcr.io/<project>/portfolio \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Azure Container Instances

```bash
# Login
az acr login --name <registry>

# Push image
docker tag portfolio:latest <registry>.azurecr.io/portfolio:latest
docker push <registry>.azurecr.io/portfolio:latest

# Deploy
az container create \
  --resource-group myResourceGroup \
  --name portfolio \
  --image <registry>.azurecr.io/portfolio:latest \
  --dns-name-label portfolio \
  --ports 3000
```

## Troubleshooting

### Build fails

```bash
# Clear build cache
docker builder prune

# Build without cache
docker build --no-cache -t portfolio:latest .
```

### Container crashes

```bash
# Check logs
docker logs portfolio

# Check exit code
docker inspect portfolio --format='{{.State.ExitCode}}'

# Interactive debug
docker run -it portfolio:latest sh
```

### Network issues

```bash
# List networks
docker network ls

# Inspect network
docker network inspect portfolio-network

# Connect container
docker network connect portfolio-network container-name
```

## Security Best Practices

1. **Use non-root user**
2. **Scan for vulnerabilities**: `docker scan portfolio:latest`
3. **Use specific versions**: `FROM node:18.17.0-alpine`
4. **Don't include secrets in image**
5. **Use .dockerignore**
6. **Keep images small**
7. **Regularly update base images**

## Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Docker Example](https://github.com/vercel/next.js/tree/canary/examples/with-docker)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

## Support

Docker deployment questions?

- **Email**: ahmad.qaderyan@pfizer.com
- **Issues**: https://github.com/rohinqaderyan/personal-portfolio/issues
