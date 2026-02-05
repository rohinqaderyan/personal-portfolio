# Routing Guide

<!-- Last updated: 2026-02-05 -->

## File-based Routing

- `app/page.tsx` → `/`
- `app/about/page.tsx` → `/about`
- `app/blog/[slug]/page.tsx` → `/blog/:slug`

## Dynamic Routes

```typescript
// app/blog/[slug]/page.tsx
export default function BlogPost({
  params
}: {
  params: { slug: string }
}) {
  return <div>{params.slug}</div>
}
```

## Navigation

```typescript
import Link from 'next/link'

<Link href="/about">About</Link>
```

## Programmatic Navigation

```typescript
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push('/about');
```
