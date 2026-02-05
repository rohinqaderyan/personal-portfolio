# Environment Setup Guide

<!-- Environment configuration guide -->
<!-- Version: 1.2.9 -->
<!-- Last reviewed: 2026-02-05 -->

> ⚙️ Node.js 18+ | npm 9+ | TypeScript 5.4

## Prerequisites

### Required Software

1. **Node.js** (v18.0.0 or higher)
   - Download: https://nodejs.org/
   - Verify: `node --version`

2. **npm** (v9.0.0 or higher)
   - Comes with Node.js
   - Verify: `npm --version`

3. **Git** (v2.30.0 or higher)
   - Download: https://git-scm.com/
   - Verify: `git --version`

4. **VS Code** (recommended)
   - Download: https://code.visualstudio.com/
   - Or use your preferred editor

## Initial Setup

### 1. Clone Repository

```bash
git clone https://github.com/rohinqaderyan/personal-portfolio.git
cd personal-portfolio
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Testing libraries
- Development tools

### 3. Environment Variables

Create `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Your Portfolio

# Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_id

# Contact Form (Optional)
CONTACT_EMAIL=your-email@example.com
```

### 4. Verify Setup

```bash
# Run development server
npm run dev

# In another terminal, run tests
npm test

# Check linting
npm run lint

# Check formatting
npm run format:check
```

## VS Code Setup

### Recommended Extensions

Install these extensions:

1. **ESLint** (`dbaeumer.vscode-eslint`)
   - Linting support

2. **Prettier** (`esbenp.prettier-vscode`)
   - Code formatting

3. **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
   - Tailwind class suggestions

4. **TypeScript Vue Plugin (Volar)** (`Vue.vscode-typescript-vue-plugin`)
   - Enhanced TypeScript support

5. **Error Lens** (`usernamehw.errorlens`)
   - Inline error highlighting

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

### VS Code Snippets

Create `.vscode/snippets.code-snippets`:

```json
{
  "React Component": {
    "prefix": "rfc",
    "body": [
      "interface ${1:Component}Props {",
      "  $2",
      "}",
      "",
      "export const ${1:Component} = ({ $3 }: ${1:Component}Props) => {",
      "  return (",
      "    <div>$4</div>",
      "  )",
      "}"
    ]
  }
}
```

## Git Configuration

### Configure User

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Setup Git Hooks

Husky hooks are automatically installed with `npm install`. They will:

- Lint staged files before commit
- Format code before commit
- Run type checking

## Development Workflow

### Start Development Server

```bash
npm run dev
```

Navigate to `http://localhost:3000`

### Run Tests

```bash
# Unit tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# E2E tests
npm run e2e
```

### Build for Production

```bash
# Create production build
npm run build

# Test production build locally
npm run start
```

### Linting & Formatting

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Check formatting
npm run format:check

# Format all files
npm run format
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000 (Windows)
npx kill-port 3000

# Or change port
PORT=3001 npm run dev
```

### Node Modules Issues

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Build Cache Issues

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### TypeScript Errors

```bash
# Rebuild TypeScript
npm run type-check
```

### Git Issues

```bash
# Reset local changes
git reset --hard HEAD
git clean -fd

# Update from remote
git fetch origin
git reset --hard origin/main
```

## Platform-Specific Notes

### Windows

- Use PowerShell or Git Bash
- Line endings: Set `core.autocrlf=true`
- Path length: Enable long paths in Git

```bash
git config --global core.autocrlf true
git config --system core.longpaths true
```

### macOS

- Install Xcode Command Line Tools
- May need to use `sudo` for global npm packages

```bash
xcode-select --install
```

### Linux

- May need build tools:

```bash
sudo apt-get install build-essential
```

## Database Setup (If Needed)

### PostgreSQL

```bash
# Install PostgreSQL
# Create database
createdb portfolio

# Update DATABASE_URL in .env.local
DATABASE_URL=postgresql://username:password@localhost:5432/portfolio
```

## Deployment Setup

### Vercel

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Login:

```bash
vercel login
```

3. Deploy:

```bash
vercel
```

### Environment Variables on Vercel

Add all variables from `.env.local` to Vercel dashboard:

- Project Settings → Environment Variables

## Next Steps

1. ✅ Verify all tests pass
2. ✅ Check localhost:3000 loads correctly
3. ✅ Make a test commit
4. ✅ Read CONTRIBUTING.md
5. ✅ Start developing!

## Getting Help

- **Issues**: https://github.com/rohinqaderyan/personal-portfolio/issues
- **Discussions**: https://github.com/rohinqaderyan/personal-portfolio/discussions
- **Email**: ahmad.qaderyan@pfizer.com

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
<!-- Reviewed 2026-01-26 -->
