// Setup file for frontend tests.
import '@testing-library/jest-dom';
// import 'whatwg-fetch'; // Removed to avoid dependency issues

// Polyfill fetch for Node environment if missing
if (typeof global.fetch === 'undefined') {
  global.fetch = jest.fn() as jest.Mock;
}

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
  }),
}));

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));
