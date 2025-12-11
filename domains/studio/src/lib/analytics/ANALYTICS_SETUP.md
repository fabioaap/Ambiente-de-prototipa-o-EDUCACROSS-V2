# GA4 Analytics Setup Guide

**Last Updated:** 2025-12-09  
**Sprint:** Sprint 6 (US2.3 - Analytics)

## Quick Start

### 1. Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com)
2. Click **Create** → **Property**
3. Property name: `EDUCACROSS-Studio-Dev` or `EDUCACROSS-Studio-Prod`
4. Reporting time zone: Brazil (UTC-3)
5. Currency: USD
6. Data stream name: `Studio Web`
7. Website URL: `http://localhost:3000` (development)
8. Copy **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Configure Environment Variables

```bash
# .env.local (development)
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX

# .env.production (if deploying)
NEXT_PUBLIC_GA4_ID=G-YYYYYYYYYY
```

### 3. Verify Initialization

1. Start development server: `pnpm dev:studio`
2. Open DevTools Console
3. Look for message: `[Analytics] GA4 initialized`
4. Go to GA4 DebugView: https://analytics.google.com → Admin → DebugView
5. Confirm `session_start` and `page_view` events appear in real-time

## Tracked Events

### Automatic (GA4 Default)

| Event | Trigger | Parameters |
|-------|---------|------------|
| `session_start` | Session begins | `session_id` |
| `page_view` | Route change | `page_path`, `page_title` |
| `first_visit` | User's first session | — |

### Custom Events (EDUCACROSS Studio)

| Event | Trigger | Parameters | Example |
|-------|---------|------------|---------|
| `dashboard_load` | Dashboard page renders with data | `pages_count`, `domains_count` | `{pages_count: 12, domains_count: 3}` |
| `page_create` | User creates new page | `page_type`, `domain` | `{page_type: 'blank', domain: 'FrontOffice'}` |
| `page_edit` | User edits existing page | `page_id`, `changes_count` | `{page_id: 'uuid123', changes_count: 5}` |
| `csv_export` | User exports data | `format`, `rows_count` | `{format: 'csv', rows_count: 100}` |
| `exception` | Error or exception | `description`, `fatal` | `{description: 'API Error', fatal: false}` |

## Implementation Examples

### Track Dashboard Load

**File:** `domains/studio/src/app/dashboard/page.tsx`

```typescript
'use client';

import React from 'react';
import { trackEvent } from '@/lib/analytics/init';

export default function DashboardPage() {
  const { data, isLoading } = useDashboardData();

  // Track dashboard load when data is ready
  React.useEffect(() => {
    if (data && !isLoading) {
      trackEvent('dashboard_load', {
        pages_count: data.recentPages?.length || 0,
        domains_count: data.domains?.length || 0,
      });
    }
  }, [data, isLoading]);

  // ... rest of component
}
```

### Track Custom Event

```typescript
import { trackEvent } from '@/lib/analytics/init';

// In your handler
function handlePageCreate(pageType: string, domain: string) {
  // ... create page logic
  
  trackEvent('page_create', {
    page_type: pageType,
    domain: domain,
  });
}

// In CSV export button
function handleCSVExport() {
  const data = exportToCSV();
  
  trackEvent('csv_export', {
    format: 'csv',
    rows_count: data.rows.length,
  });
  
  // ... download file
}
```

### Set User Tracking

```typescript
import { setUserId, setUserProperties } from '@/lib/analytics/init';

// After login
function onUserLogin(userId: string, userInfo: any) {
  setUserId(userId);
  
  setUserProperties({
    user_segment: userInfo.isPremium ? 'premium' : 'free',
    plan_type: userInfo.plan,
    created_date: userInfo.createdAt,
  });
}

// On logout
function onUserLogout() {
  clearUserId();
}
```

### Track Exceptions

```typescript
import { trackException } from '@/lib/analytics/init';

try {
  // risky operation
} catch (error) {
  trackException(
    `API Error: ${error.message}`,
    false // not fatal
  );
}
```

## Testing Analytics

### Local Testing with DebugView

1. **Enable Debug Mode:**
   - Start dev server (debug mode auto-enabled in development)
   - Open DevTools Console → See `[Analytics] GA4 initialized`

2. **View Events in Real-time:**
   - Go to: https://analytics.google.com
   - Left sidebar → **Admin** → **DebugView**
   - Perform actions in Studio
   - See events appear in real-time

3. **Verify Event Parameters:**
   - Click event name to expand
   - View all parameters (e.g., `pages_count: 12`)
   - Confirm timing and sequence

4. **Test Custom Events:**
   - Open Dashboard → See `dashboard_load` with `pages_count`
   - Create page → See `page_create` with `page_type`
   - Export data → See `csv_export` with `rows_count`

### Console Commands (Development Only)

```javascript
// Check if GA4 is initialized
window.gtag ? 'GA4 initialized' : 'GA4 not found'

// Manually track event (testing)
window.gtag('event', 'test_event', { test_param: 'value' })

// View GA4 configuration
window.gtag('get', 'G-XXXXXXXXXX', (value) => console.log(value))
```

## Configuration

### GA4 Dashboard Setup

1. **Data Collection:**
   - Admin → Data Collection → Web → View Stream Details
   - Confirm JavaScript Tag installed ✓
   - Enable Enhanced Measurement ✓

2. **Data Retention:**
   - Admin → Data Settings → Data Retention
   - Set to "14 months" (default for compliance)

3. **User Properties:**
   - Admin → User Properties
   - Auto-collected: browser, OS, device, geographic data
   - Custom: user_segment, plan_type (set in `setUserProperties`)

4. **Event Configuration:**
   - Admin → Custom Definitions
   - Define event parameters for filtering/segmentation

## Privacy & Compliance

### GDPR Compliance

- ✓ Google Analytics already anonymizes IPs
- ✓ No PII collected (user_id is hashed)
- ✓ Data retention set to 14 months (configurable)
- Cookie consent banner: Optional for EU users

### Cookie Consent

```typescript
// Show banner before GA4 initialization
const hasConsent = localStorage.getItem('analytics_consent');
if (!hasConsent) {
  // Show consent banner
  // Only initialize GA4 after user consent
}
```

## Common Issues

### GA4 Not Tracking Events

1. **Check Measurement ID:**
   - Verify `NEXT_PUBLIC_GA4_ID` is set
   - Format: `G-XXXXXXXXXX`
   - No typos

2. **Check Debug Mode:**
   - Open DevTools Console
   - Look for `[Analytics] GA4 initialized`
   - If not present, check environment variable

3. **Check DebugView:**
   - https://analytics.google.com → Admin → DebugView
   - Confirm events appear in real-time
   - If not, GA4 initialization may have failed

4. **Browser Extensions:**
   - Some ad blockers block GA4
   - Test with extensions disabled
   - Check in DebugView with and without extensions

### Events Delayed in Dashboard

- DebugView shows events in real-time (1-2 seconds)
- Main dashboard updates every 24 hours
- Reports available in "Realtime" section immediately

## Advanced Features

### Conversion Tracking

```typescript
// Mark important user actions as conversions
trackEvent('conversion_purchase', {
  value: 99.99,
  currency: 'USD',
  items: [{ name: 'Premium Plan', price: 99.99 }],
});
```

### E-commerce Tracking

```typescript
trackEvent('purchase', {
  transaction_id: 'uuid123',
  affiliation: 'educacross_store',
  value: 99.99,
  currency: 'USD',
  shipping: 0,
  tax: 15.98,
  items: [
    {
      item_id: 'SKU001',
      item_name: 'Premium Plan',
      item_category: 'subscriptions',
      price: 99.99,
      quantity: 1,
    },
  ],
});
```

### Funnel Analysis

1. Define events as conversion steps:
   - `page_view` → `/dashboard`
   - `page_create` → Create page
   - `page_save` → Save changes
   - `page_publish` → Publish page

2. GA4 Dashboard → Analyze → Funnels
3. Select events in order to see drop-off rates

## References

- [GA4 Documentation](https://support.google.com/analytics/answer/10089681)
- [React GA4 Docs](https://react-ga4.web.app/)
- [GA4 Events Guide](https://support.google.com/analytics/answer/9267744)
- [Google Tag Manager](https://tagmanager.google.com)

---

**Questions?** Check `/specs/005-sprint6-execution/quickstart.md` for integration examples.
