# Troubleshooting Guide

<!-- Common issues and solutions -->
<!-- Last updated: 2026-01-27 -->

> 🔧 Quick fixes for common development issues

## Common Issues and Solutions

This guide covers common issues you might encounter and how to resolve them.

## Build Issues

### Error: "Module not found"

**Problem:**

```
Error: Can't resolve '@/components/Header'
```

**Solutions:**

1. **Check import path:**

```typescript
// ✅ Correct
import { Header } from '@/components/Header';

// ❌ Incorrect
import { Header } from '@/components/header'; // Case sensitive
```

2. **Verify jsconfig.json:**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

3. **Restart dev server:**

```bash
npm run dev
```

### Error: "Type errors in Next.js build"

**Problem:**

```
Type error: Property 'x' does not exist on type 'Y'
```

**Solutions:**

1. **Run type check:**

```bash
npm run type-check
```

2. **Check TypeScript version:**

```bash
npm list typescript
```

3. **Update dependencies:**

```bash
npm update
```

4. **Clear cache:**

```bash
rm -rf .next
rm -rf node_modules
npm install
```

### Error: "Failed to compile"

**Problem:**

```
Failed to compile
./src/app/page.tsx
```

**Solutions:**

1. **Check for syntax errors:**

```typescript
// ❌ Bad - Missing closing tag
<div>
  <p>Text

// ✅ Good
<div>
  <p>Text</p>
</div>
```

2. **Restart dev server:**

```bash
# Kill the process
# Windows
taskkill /F /IM node.exe
# Mac/Linux
pkill node

# Restart
npm run dev
```

3. **Clear Next.js cache:**

```bash
rm -rf .next
npm run dev
```

## Runtime Issues

### Error: "Hydration mismatch"

**Problem:**

```
Error: Hydration failed because the initial UI does not match what was rendered on the server
```

**Solutions:**

1. **Check for server/client differences:**

```typescript
// ❌ Bad - Different on server and client
<div>{new Date().toString()}</div>

// ✅ Good - Consistent
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return null;
```

2. **Use suppressHydrationWarning for dynamic content:**

```typescript
<div suppressHydrationWarning>
  {new Date().toString()}
</div>
```

3. **Ensure proper component structure:**

```typescript
// ❌ Bad - Invalid nesting
<p>
  <div>Content</div>
</p>

// ✅ Good
<div>
  <div>Content</div>
</div>
```

### Error: "useEffect runs twice"

**Problem:**

```typescript
useEffect(() => {
  console.log('Running'); // Logs twice
}, []);
```

**Cause:**
React 18 Strict Mode runs effects twice in development.

**Solutions:**

1. **This is expected in development** - won't happen in production
2. **Handle cleanup properly:**

```typescript
useEffect(() => {
  let cancelled = false;

  fetchData().then((data) => {
    if (!cancelled) {
      setData(data);
    }
  });

  return () => {
    cancelled = true;
  };
}, []);
```

### Error: "useState not updating"

**Problem:**

```typescript
const [count, setCount] = useState(0);
setCount(count + 1);
console.log(count); // Still shows old value
```

**Solution:**

State updates are asynchronous:

```typescript
const [count, setCount] = useState(0);
setCount(count + 1); // Async

// Use useEffect to see updated value
useEffect(() => {
  console.log(count); // Shows new value
}, [count]);

// Or use functional update
setCount((prevCount) => {
  console.log('Previous:', prevCount);
  return prevCount + 1;
});
```

## Style Issues

### Issue: Tailwind classes not working

**Problem:**

```typescript
<div className="custom-class"> // Not styled
```

**Solutions:**

1. **Check Tailwind config:**

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
};
```

2. **Ensure globals.css is imported:**

```typescript
// app/layout.tsx
import '@/styles/globals.css';
```

3. **Restart dev server:**

```bash
npm run dev
```

4. **Don't use string interpolation:**

```typescript
// ❌ Bad - Won't work
const color = 'red';
<div className={`text-${color}-500`}>

// ✅ Good - Use full class names
const classes = color === 'red' ? 'text-red-500' : 'text-blue-500';
<div className={classes}>
```

### Issue: Styles not applying in production

**Problem:**
Styles work in dev but not in production build.

**Solutions:**

1. **Purge CSS properly:**

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
};
```

2. **Check for dynamic classes:**

```typescript
// ❌ Bad - May be purged
<div className={`text-${color}-500`}>

// ✅ Good - Safe from purging
<div className={color === 'red' ? 'text-red-500' : 'text-blue-500'}>
```

3. **Safelist dynamic classes:**

```javascript
// tailwind.config.js
module.exports = {
  safelist: ['text-red-500', 'text-blue-500', 'text-green-500'],
};
```

## API Issues

### Error: "CORS error"

**Problem:**

```
Access to fetch at 'https://api.example.com' has been blocked by CORS policy
```

**Solutions:**

1. **Use Next.js API routes as proxy:**

```typescript
// app/api/proxy/route.ts
export async function GET(request: Request) {
  const response = await fetch('https://external-api.com/data');
  const data = await response.json();
  return Response.json(data);
}
```

2. **Configure headers in next.config.js:**

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
        ],
      },
    ];
  },
};
```

### Error: "API route not found"

**Problem:**

```
404 | This page could not be found
```

**Solutions:**

1. **Check file structure:**

```
app/
  api/
    contact/
      route.ts  ← Must be named 'route.ts'
```

2. **Verify export:**

```typescript
// ✅ Correct
export async function POST(request: Request) {
  // ...
}

// ❌ Wrong
export default async function handler(req, res) {
  // This is Pages Router syntax
}
```

3. **Check URL:**

```typescript
// If file is: app/api/contact/route.ts
// URL should be: /api/contact
fetch('/api/contact', { method: 'POST' });
```

## Database Issues

### Error: "Too many connections"

**Problem:**

```
Error: too many clients already
```

**Solutions:**

1. **Use connection pooling:**

```typescript
import { Pool } from 'pg';

const pool = new Pool({
  max: 20, // Maximum connections
  idleTimeoutMillis: 30000,
});

export const query = (text, params) => pool.query(text, params);
```

2. **Close connections properly:**

```typescript
const client = await pool.connect();
try {
  await client.query('SELECT * FROM users');
} finally {
  client.release(); // Always release
}
```

### Error: "Connection timeout"

**Problem:**

```
Error: Connection terminated unexpectedly
```

**Solutions:**

1. **Increase timeout:**

```typescript
const pool = new Pool({
  connectionTimeoutMillis: 5000,
});
```

2. **Check database status:**

```bash
# PostgreSQL
pg_isready

# Check logs
tail -f /var/log/postgresql/postgresql.log
```

3. **Verify connection string:**

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

## Deployment Issues

### Error: "Vercel build fails"

**Problem:**

```
Error: Build failed
```

**Solutions:**

1. **Check build locally:**

```bash
npm run build
```

2. **Verify environment variables:**

- Go to Vercel Dashboard → Project → Settings → Environment Variables
- Ensure all required variables are set

3. **Check Node version:**

```json
// package.json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

4. **Review build logs:**

- Vercel Dashboard → Deployments → Click deployment → View logs

### Error: "Environment variables not working"

**Problem:**

```
undefined when accessing process.env.VARIABLE
```

**Solutions:**

1. **Add NEXT*PUBLIC* prefix for client-side:**

```env
# ❌ Not accessible in browser
API_KEY=secret

# ✅ Accessible in browser
NEXT_PUBLIC_API_KEY=public-key
```

2. **Verify Vercel environment:**

```bash
vercel env ls
vercel env pull
```

3. **Redeploy after adding variables:**

```bash
vercel --prod
```

## Git Issues

### Error: "Commit failed"

**Problem:**

```
husky - pre-commit hook failed
```

**Solutions:**

1. **Fix lint errors:**

```bash
npm run lint:fix
```

2. **Format code:**

```bash
npm run format
```

3. **Check what failed:**

```bash
# Run manually
npm run lint
npm run type-check
npm test
```

4. **Skip hooks (not recommended):**

```bash
git commit --no-verify -m "message"
```

### Error: "Push rejected"

**Problem:**

```
! [rejected] main -> main (non-fast-forward)
```

**Solutions:**

1. **Pull first:**

```bash
git pull --rebase origin main
```

2. **Resolve conflicts:**

```bash
# After resolving conflicts
git add .
git rebase --continue
```

3. **Force push (careful!):**

```bash
git push --force-with-lease origin main
```

## Performance Issues

### Issue: Slow page load

**Solutions:**

1. **Check bundle size:**

```bash
npm run build
# Look for large chunks
```

2. **Use dynamic imports:**

```typescript
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
});
```

3. **Optimize images:**

```typescript
import Image from 'next/image';

<Image
  src="/large-image.jpg"
  width={800}
  height={600}
  quality={75}
  placeholder="blur"
/>
```

4. **Enable caching:**

```typescript
// app/api/data/route.ts
export async function GET() {
  const data = await fetchData();

  return Response.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
```

### Issue: High memory usage

**Solutions:**

1. **Check for memory leaks:**

```typescript
// Clean up subscriptions
useEffect(() => {
  const subscription = subscribe();

  return () => {
    subscription.unsubscribe(); // Cleanup
  };
}, []);
```

2. **Limit concurrent operations:**

```typescript
// Use Promise.all with batching
const chunks = chunkArray(items, 10);
for (const chunk of chunks) {
  await Promise.all(chunk.map((item) => processItem(item)));
}
```

3. **Optimize images:**

- Use appropriate formats (WebP, SVG)
- Compress images
- Lazy load off-screen images

## Testing Issues

### Error: "Tests failing"

**Solutions:**

1. **Clear test cache:**

```bash
npm test -- --clearCache
```

2. **Check test environment:**

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
  },
});
```

3. **Update snapshots:**

```bash
npm test -- -u
```

4. **Run specific test:**

```bash
npm test -- Header.test.tsx
```

## Getting Help

If you're still stuck:

1. **Check documentation:**
   - Next.js: https://nextjs.org/docs
   - React: https://react.dev/
   - Tailwind: https://tailwindcss.com/docs

2. **Search GitHub issues:**
   - https://github.com/vercel/next.js/issues
   - https://github.com/rohinqaderyan/personal-portfolio/issues

3. **Ask for help:**
   - GitHub Discussions
   - Email: ahmad.qaderyan@pfizer.com

## Debug Checklist

When encountering issues:

- [ ] Clear cache (rm -rf .next node_modules)
- [ ] npm install
- [ ] Restart dev server
- [ ] Check browser console for errors
- [ ] Run npm run lint
- [ ] Run npm run type-check
- [ ] Check environment variables
- [ ] Review recent changes
- [ ] Test in incognito mode
- [ ] Check Vercel logs (if deployed)
- [ ] Search error message online

## Additional Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev/)
- [Vercel Docs](https://vercel.com/docs)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)
- [GitHub Issues](https://github.com/vercel/next.js/issues)
