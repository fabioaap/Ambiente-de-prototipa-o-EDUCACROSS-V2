# Sentry Configuration

## Environment Variables

### Required (Production)
```
NEXT_PUBLIC_SENTRY_DSN=https://your-key@sentry.io/your-project-id
```

### Optional
```
SENTRY_RELEASE=1.0.0                  # Release version for tracking
SENTRY_AUTH_TOKEN=your-auth-token     # For source maps upload
```

## Setup Instructions

### 1. Create Sentry Project

1. Go to https://sentry.io
2. Create account if needed
3. Create new project:
   - Platform: Next.js
   - Alert threshold: 10 errors per minute

### 2. Get DSN

1. Project Settings → Client Keys (DSN)
2. Copy the DSN value

### 3. Configure Environment

Add to `.env.local`:
```
NEXT_PUBLIC_SENTRY_DSN=https://your-key@sentry.io/your-project-id
```

### 4. Optional: Source Maps

For production builds with source maps:

1. Get auth token:
   - Account Settings → Auth Tokens
   - Create new token with `project:releases` scope

2. Add to `.env.local`:
```
SENTRY_AUTH_TOKEN=your-token
SENTRY_RELEASE=1.0.0
```

3. Upload source maps during build:
```bash
pnpm build
sentry-cli releases files upload-sourcemaps ./out
```

## Verification

### Development

1. Start dev server:
```bash
pnpm dev:studio
```

2. Trigger test error (in browser console):
```javascript
throw new Error('Test error from Sentry');
```

3. Check Sentry dashboard for error (may take a moment)

### Production

1. Build app:
```bash
pnpm build
```

2. Deploy to production

3. Monitor Sentry dashboard for errors

## Error Types Captured

- ✅ Uncaught exceptions
- ✅ Promise rejections
- ✅ React component errors (via ErrorBoundary)
- ✅ API failures (4xx, 5xx responses)
- ✅ Performance issues
- ✅ Custom errors (via captureException/captureMessage)

## Error Types Ignored

- ❌ Chrome extensions
- ❌ Browser network timeouts
- ❌ User-cancelled requests (AbortError)

## Features Enabled

- ✅ Performance Monitoring (traces)
- ✅ Session Replay (videos of user sessions)
- ✅ Breadcrumbs (user actions, API calls)
- ✅ Release tracking
- ✅ Source maps (production)

## Dashboard

Access your errors at: https://sentry.io/organizations/your-org/issues/

### Key Sections

- **Issues**: All captured errors
- **Performance**: Page load times, API response times
- **Replays**: Video recordings of sessions with errors
- **Releases**: Error trends per release version

## Best Practices

1. **Set User Context**
   ```typescript
   setUserContext({ id: '123', email: 'user@example.com' });
   ```

2. **Add Custom Context**
   ```typescript
   captureException(error, { userId: '123', action: 'save' });
   ```

3. **Log Messages**
   ```typescript
   captureMessage('Important event', 'info', { data: '...' });
   ```

4. **Clear on Logout**
   ```typescript
   clearUserContext();
   ```

## Troubleshooting

### Errors not showing in Sentry

1. Check DSN is set:
   ```bash
   echo $NEXT_PUBLIC_SENTRY_DSN
   ```

2. Verify environment is not 'test':
   ```javascript
   console.log(process.env.NODE_ENV);
   ```

3. Check browser console for Sentry logs:
   ```javascript
   window.__SENTRY_DEBUG__ = true;
   ```

### Source Maps not uploading

1. Verify auth token:
   ```bash
   sentry-cli --version
   sentry-cli releases list
   ```

2. Check release matches package.json version

3. Manually upload:
   ```bash
   sentry-cli releases files upload-sourcemaps ./out --release=1.0.0
   ```

## Documentation

- https://docs.sentry.io/platforms/javascript/guides/nextjs/
- https://docs.sentry.io/product/releases/
- https://docs.sentry.io/product/session-replay/
- https://docs.sentry.io/platforms/javascript/enriching-events/

---

**Sprint 6 (US2.2)** - Error tracking and monitoring implementation
