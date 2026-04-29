#!/usr/bin/env sh
# Pre-push validation script
# This script runs comprehensive checks before pushing

set -e  # Exit on error

echo "Running pre-push validation..."

# Check if any staged changes exist
if [ -z "$(git diff --cached --name-only)" ]; then
    echo "  No staged changes. Running tests on current branch..."
fi

# Run type checking
echo " Checking types..."
npm run check-types

# Run linting
echo " Running linters..."
npm run lint

# Run tests
echo " Running tests..."
npm run test

echo " All pre-push checks passed!"
