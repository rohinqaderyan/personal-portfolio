# Developer Setup Guide

Quick setup guide for new contributors to get the project running locally.

## Prerequisites

### Required

- **Node.js**: v18.x or v20.x (LTS)
  ```bash
  node --version  # Should show v18.x or v20.x
  ```
- **npm**: v9.x or newer

  ```bash
  npm --version  # Should show v9.x+
  ```

- **Git**: Latest version
  ```bash
  git --version  # Should show 2.x+
  ```

### Recommended

- **VS Code**: Latest version with extensions:
  - ESLint
  - Prettier
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
- **PowerShell** (Windows) or **Bash** (macOS/Linux)

## Quick Setup

### Windows (PowerShell)

```powershell
# Run automated setup script
.\setup.ps1
```

### macOS/Linux (Bash)

```bash
# Make executable
chmod +x setup.sh

# Run setup
./setup.sh
```

The automated scripts will:

1. Check Node.js version
2. Install dependencies
3. Create environment file
4. Run quality checks
5. Execute test suite

## Manual Setup

If you prefer manual setup or automated scripts fail:

### 1. Clone Repository

```bash
# Clone from GitHub
git clone https://github.com/rohinqaderyan/personal-portfolio.git
cd personal-portfolio

# Add upstream remote (for updates)
git remote add upstream https://github.com/rohinqaderyan/personal-portfolio.git
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages defined in `package.json`.

### 3. Create Environment File

```bash
# Windows
copy .env.example .env.local

# macOS/Linux
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```
FLASK_API_URL=http://localhost:5000
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX (optional)
```

### 4. Run Quality Checks

```bash
# Type-check
npm run type-check

# Linting
npm run lint

# Tests
npm run test -- --run

# All checks should PASS ✅
```

### 5. Start Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Development Workflow

### Daily Workflow

```bash
# 1. Update from main
git fetch upstream
git rebase upstream/main

# 2. Create feature branch
git checkout -b feature/my-feature

# 3. Make changes
# Edit files...

# 4. Run checks before committing
npm run type-check
npm run lint
npm run test -- --run

# 5. Commit changes
git add .
git commit -m "feat: Add feature description"

# 6. Push to your fork
git push origin feature/my-feature

# 7. Create Pull Request on GitHub
```

### Commit Message Format

Follow conventional commit format:

```
<type>(<scope>): <subject> -> <detail>

<body>

<footer>
```

**Examples:**

```bash
git commit -m "feat(projects): Add project filtering -> Implement tag-based filtering with search"
git commit -m "fix(card): Fix overflow on mobile -> Apply responsive padding"
git commit -m "docs(readme): Add deployment section -> Cover Vercel setup"
git commit -m "test(string): Add truncate tests -> Cover edge cases"
```

### Pre-commit Hooks

Husky automatically runs these checks before commit:

- ✅ **ESLint**: Code quality
- ✅ **Prettier**: Code formatting
- ✅ **TypeScript**: Type checking

If checks fail, fix errors before committing:

```bash
# Fix linting
npm run lint -- --fix

# Format code
npm run format

# Type-check
npm run type-check
```

## Available Scripts

### Development

```bash
# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Code Quality

```bash
# TypeScript type-checking
npm run type-check

# ESLint code quality
npm run lint
npm run lint -- --fix  # Auto-fix issues

# Prettier code formatting
npm run format

# Run all quality checks
npm run type-check && npm run lint && npm run test -- --run
```

### Testing

```bash
# Run all tests (watch mode)
npm run test

# Run tests once
npm run test -- --run

# Run specific test file
npm run test -- --run src/tests/unit/Card.test.tsx

# Run with coverage
npm run test -- --run --coverage
```

**Current Test Stats:**

- **182 tests** across 9 test files
- **100% pass rate**
- Files tested: ProjectCard, Card, Hero, Navigation, string, validation, array, errorHandler, contact API

### Build Analysis

```bash
# Production build with stats
npm run build

# Build output shows:
# - Page sizes
# - First Load JS
# - Static vs. Dynamic pages
```

## Project Structure

```
portfolio/
├── src/
│   ├── app/            # Next.js app directory
│   │   ├── page.tsx    # Home page
│   │   ├── about/      # About page
│   │   ├── projects/   # Projects page
│   │   └── api/        # API routes
│   ├── components/     # React components
│   ├── lib/            # Utility functions
│   │   ├── string.ts   # String utilities
│   │   ├── array.ts    # Array utilities
│   │   ├── validation.ts # Form validation
│   │   └── api/        # API utilities
│   ├── styles/         # Global styles
│   └── tests/          # Test files
│       └── unit/       # Unit tests
├── public/             # Static assets
├── docs/               # Documentation
├── .env.example        # Environment variables template
├── .env.local          # Local environment (gitignored)
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
├── next.config.js      # Next.js config
└── vitest.config.ts    # Test config
```

## Common Issues & Solutions

### Node.js Version Mismatch

**Error:**

```
The engine "node" is incompatible with this module
```

**Solution:**

```bash
# Install Node v18 or v20 from https://nodejs.org
# Or use nvm
nvm install 20
nvm use 20
```

### Port 3000 Already in Use

**Error:**

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <pid> /F

# macOS/Linux
lsof -ti:3000 | xargs kill
```

### Installation Failures

**Error:**

```
npm ERR! code ERESOLVE
```

**Solution:**

```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Pre-commit Hook Failures

**Error:**

```
husky - pre-commit hook failed
```

**Solution:**

```bash
# Fix linting errors
npm run lint -- --fix

# Fix formatting
npm run format

# Check for type errors
npm run type-check

# Commit again
git commit
```

### Tests Failing

**Error:**

```
Test failed: expected X to equal Y
```

**Solution:**

```bash
# Run tests in watch mode to debug
npm run test

# Check specific test file
npm run test -- --run src/tests/unit/[filename].test.tsx

# Update snapshots if needed (carefully)
npm run test -- --run -u
```

## Getting Help

### Resources

- **Documentation**: Check `CONTRIBUTING.md`, `TESTING.md`, `SECURITY.md`
- **GitHub Issues**: Search existing issues before opening new ones
- **Code**: Read inline comments and JSDoc comments
- **Tests**: Examples in `src/tests/unit/`

### Asking for Help

1. **Search First**: GitHub Issues, CONTRIBUTING.md
2. **Provide Context**:
   - What you're trying to do
   - What error you're getting
   - What you've already tried
   - Relevant code snippets
   - Environment (OS, Node version)

3. **Create Issue** (if no solution found):
   - Use descriptive title
   - Include reproduction steps
   - Attach screenshots if UI-related
   - Mention relevant files/components

## Next Steps

After setup:

1. ✅ Read `CONTRIBUTING.md` for detailed guidelines
2. ✅ Browse `src/components/` to understand structure
3. ✅ Check `src/tests/unit/` for testing examples
4. ✅ Look at recent commits for code style
5. ✅ Find "good first issue" labels on GitHub
6. ✅ Start with small contributions (docs, tests)
7. ✅ Ask questions in discussions

---

**Welcome to the project! Happy coding! 🎉**
