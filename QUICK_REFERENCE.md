# 🚀 Quick Command Reference

## Getting Started

```bash
# First time setup
npm install
npx husky install

# Start development
npm run dev

# Setup backend
cd apps/api && python -m venv venv
source venv/bin/activate  # macOS/Linux
pip install -r ../requirements.txt
```

## Daily Commands

| Command          | Purpose               |
| ---------------- | --------------------- |
| `npm run dev`    | Start all dev servers |
| `npm run build`  | Build all apps        |
| `npm run test`   | Run all tests         |
| `npm run lint`   | Check code style      |
| `npm run format` | Format code           |

## Testing

| Command                 | Purpose           |
| ----------------------- | ----------------- |
| `npm run test:frontend` | Jest tests only   |
| `npm run test:backend`  | Pytest tests only |
| `npm run test:watch`    | Watch mode        |
| `npm run test:coverage` | Coverage report   |

## Code Quality

| Command               | Purpose          |
| --------------------- | ---------------- |
| `npm run lint`        | Run all linters  |
| `npm run format`      | Auto-format code |
| `npm run check-types` | TypeScript check |

## Backend (Python)

```bash
cd apps/api

# Activate virtual environment
source venv/bin/activate

# Run tests
pytest tests/ -v

# Format code
black app/

# Lint code
flake8 app/
```

## Frontend (Node.js)

```bash
cd apps/web

# Run tests
npm test

# Run type check
npx tsc --noEmit

# Lint
npx eslint .

# Format
npx prettier --write .
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feat/my-feature

# Make changes
# ... edit files ...

# Stage changes
git add .

# Commit (Husky pre-commit hook runs)
git commit -m "feat: add new feature"

# Push (Husky pre-push hook runs tests)
git push origin feat/my-feature

# Create Pull Request on GitHub
```

## Debugging

```bash
# Frontend: Open browser DevTools
npm run dev
# Press F12 in browser

# Backend: Add breakpoints and debug
python -m pdb script.py
```

## Useful Scripts

```bash
# Validate entire setup
node scripts/validate-setup.js

# Run all tests with coverage
./scripts/run-all-tests.sh        # macOS/Linux
scripts\run-all-tests.bat         # Windows

# Pre-push validation
./scripts/pre-push-validation.sh  # macOS/Linux
scripts\pre-push-validation.bat   # Windows
```

## Troubleshooting

| Issue                      | Solution                                    |
| -------------------------- | ------------------------------------------- |
| Port in use                | `lsof -i :3000` then `kill -9 <PID>`        |
| Python venv not activating | `pip install --upgrade pip`                 |
| Modules not found          | Delete `node_modules` and run `npm install` |
| Husky hooks not running    | `npx husky install`                         |
| Tests failing              | `npm run test` to see details               |

## Environment Setup

Create `.env` files:

**Backend** (`apps/api/.env`):

```
DATABASE_URL=postgresql://user:pass@localhost/db
SECRET_KEY=your-secret
```

**Frontend** (`apps/web/.env.local`):

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Quick Links

- 📚 Full Testing Guide: [TESTING.md](TESTING.md)
- 👨‍💻 Developer Setup: [DEVELOPER_SETUP.md](DEVELOPER_SETUP.md)
- 🤝 Contributing: See CONTRIBUTING.md (if exists)
- 📖 Main README: [README.md](README.md)

## Common Scenarios

### Starting a new feature

```bash
git checkout -b feat/feature-name
npm run dev
npm run test:watch
```

### Before pushing code

```bash
npm run lint      # Check style
npm run format    # Auto-fix style
npm run test      # Run all tests
npm run check-types  # Type check
git push
```

### Running only changed tests

```bash
npm run test -- --onlyChanged
```

### Checking test coverage

```bash
npm run test:coverage
# View HTML reports:
# - Frontend: apps/web/coverage/lcov-report/index.html
# - Backend: apps/api/htmlcov/index.html
```

---

For more details, see [TESTING.md](TESTING.md) and [DEVELOPER_SETUP.md](DEVELOPER_SETUP.md)
