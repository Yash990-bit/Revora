#!/usr/bin/env sh
# Run all tests with detailed output

set -e

echo " Running All Tests\n"

# Frontend tests
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " Frontend Tests (Jest)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd apps/web
npm run test:coverage || true
cd ../..

# Backend tests
echo "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " Backend Tests (Pytest)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd apps/api
pytest tests/ -v --cov=app --cov-report=html --cov-report=term-missing || true
cd ../..

echo "\n Test run complete!"
echo "\n Coverage reports:"
echo "  - Frontend: open apps/web/coverage/lcov-report/index.html"
echo "  - Backend: open apps/api/htmlcov/index.html"
