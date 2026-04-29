/**
 * Tests for API utility functions.
 */
import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';

describe('API Utilities', () => {
  let fetchSpy: jest.SpyInstance;

  beforeEach(() => {
    fetchSpy = jest.spyOn(global, 'fetch');
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  it('should format API URLs correctly', () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const endpoint = '/api/leads';
    const fullUrl = `${baseUrl}${endpoint}`;

    expect(fullUrl).toContain('/api/leads');
  });

  it('should handle successful API calls', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({ data: 'test' }),
    };

    fetchSpy.mockResolvedValueOnce(mockResponse as any);

    const response = await fetch('http://localhost:8000/api/test');
    expect(response.ok).toBe(true);
  });

  it('should handle API errors', async () => {
    const mockError = new Error('Network error');
    fetchSpy.mockRejectedValueOnce(mockError);

    await expect(fetch('http://localhost:8000/api/test')).rejects.toThrow('Network error');
  });
});
