#!/bin/bash
# Development Environment Setup Script for Linux/macOS
# This script sets up the development environment for the portfolio project

set -e  # Exit on error

echo "🚀 Portfolio Development Environment Setup"
echo "=========================================="
echo ""

# Check Node.js installation
echo "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "✗ Node.js not found. Please install Node.js 18+"
    exit 1
fi

NODE_VERSION=$(node --version)
NPM_VERSION=$(npm --version)
echo "✓ Node.js $NODE_VERSION installed"
echo "✓ npm $NPM_VERSION installed"

# Install dependencies
echo ""
echo "Installing dependencies..."
npm install
echo "✓ Dependencies installed"

# Create .env.local if it doesn't exist
echo ""
echo "Setting up environment variables..."
if [ ! -f ".env.local" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env.local
        echo "✓ Created .env.local from .env.example"
    else
        echo "⚠ .env.example not found"
    fi
else
    echo "✓ .env.local already exists"
fi

# Run linting and type checks
echo ""
echo "Running code quality checks..."

echo "  - TypeScript type checking..."
npm run type-check || echo "⚠ TypeScript errors found"

echo "  - ESLint linting..."
npm run lint || echo "⚠ ESLint warnings found"

# Run tests
echo ""
echo "Running test suite..."
npm run test -- --run || echo "⚠ Some tests failed"

# Show next steps
echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Edit content files in ./content directory"
echo "  2. Update ./content/site.config.json with your information"
echo "  3. Run 'npm run dev' to start development server"
echo "  4. Visit http://localhost:3000 in your browser"
echo ""
echo "For more information, see README.md"
echo ""
