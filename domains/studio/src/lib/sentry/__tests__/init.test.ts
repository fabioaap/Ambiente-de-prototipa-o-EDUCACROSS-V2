/**
 * Sentry Integration Tests
 * 
 * Sprint 6 (US2.2 - Monitoring): Verify Sentry error tracking
 * and error capture functionality
 * 
 * Run tests: pnpm -r test -- sentry
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as Sentry from '@sentry/nextjs';
import {
  initializeSentry,
  captureException,
  captureMessage,
  setUserContext,
  clearUserContext,
} from '@/lib/sentry/init';

// Mock Sentry
vi.mock('@sentry/nextjs', () => ({
  init: vi.fn(),
  captureException: vi.fn(),
  captureMessage: vi.fn(),
  setUser: vi.fn(),
  withScope: vi.fn((callback) => callback({ setContext: vi.fn() })),
  setContext: vi.fn(),
  Replay: vi.fn(),
  replayIntegration: vi.fn(() => ({})),
}));

describe('Sentry Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initializeSentry', () => {
    it('should skip initialization in test environment', () => {
      vi.stubEnv('NODE_ENV', 'test');

      initializeSentry();

      expect(Sentry.init).not.toHaveBeenCalled();

      vi.unstubAllEnvs();
    });

    it('should warn if DSN is not configured', () => {
      vi.stubEnv('NODE_ENV', 'development');
      vi.stubEnv('NEXT_PUBLIC_SENTRY_DSN', '');

      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      initializeSentry();

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('NEXT_PUBLIC_SENTRY_DSN not configured')
      );

      consoleSpy.mockRestore();
      vi.unstubAllEnvs();
    });

    it('should initialize Sentry with DSN configured', () => {
      vi.stubEnv('NODE_ENV', 'production');
      vi.stubEnv('NEXT_PUBLIC_SENTRY_DSN', 'https://example@sentry.io/123456');

      initializeSentry();

      expect(Sentry.init).toHaveBeenCalledWith(
        expect.objectContaining({
          dsn: 'https://example@sentry.io/123456',
          environment: 'production',
          tracesSampleRate: 0.2, // 20% in production
        })
      );

      vi.unstubAllEnvs();
    });
  });

  describe('captureException', () => {
    it('should capture exception without context', () => {
      const error = new Error('Test error');

      captureException(error);

      expect(Sentry.captureException).toHaveBeenCalledWith(error);
    });

    it('should capture exception with context', () => {
      const error = new Error('Test error');
      const context = { userId: '123', action: 'save' };

      captureException(error, context);

      expect(Sentry.captureException).toHaveBeenCalled();
    });

    it('should capture unknown error types', () => {
      const unknownError = 'string error';

      captureException(unknownError);

      expect(Sentry.captureException).toHaveBeenCalledWith(unknownError);
    });
  });

  describe('captureMessage', () => {
    it('should capture message with default level', () => {
      captureMessage('Test message');

      expect(Sentry.captureMessage).toHaveBeenCalledWith(
        'Test message',
        'info'
      );
    });

    it('should capture message with custom level', () => {
      captureMessage('Test warning', 'warning');

      expect(Sentry.captureMessage).toHaveBeenCalledWith(
        'Test warning',
        'warning'
      );
    });

    it('should capture message with context', () => {
      const context = { userId: '123' };

      captureMessage('Test message', 'error', context);

      expect(Sentry.captureMessage).toHaveBeenCalled();
    });
  });

  describe('setUserContext', () => {
    it('should set user information', () => {
      const user = {
        id: '123',
        email: 'user@example.com',
        name: 'Test User',
      };

      setUserContext(user);

      expect(Sentry.setUser).toHaveBeenCalledWith(user);
    });

    it('should set partial user information', () => {
      const user = { id: '123' };

      setUserContext(user);

      expect(Sentry.setUser).toHaveBeenCalledWith(user);
    });
  });

  describe('clearUserContext', () => {
    it('should clear user information', () => {
      clearUserContext();

      expect(Sentry.setUser).toHaveBeenCalledWith(null);
    });
  });
});
