import type { Meta } from '@storybook/react';

const meta = {
  title: 'Studio/PagesList',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

/**
 * # Studio PagesList Component
 * 
 * The `PagesList` component provides a sidebar interface for managing pages in the Studio application.
 * 
 * ## Features
 * 
 * ### 📋 List Pages
 * - Displays all pages loaded from the `/api/pages` endpoint
 * - Shows page title and slug for each page
 * - Highlights the currently active page
 * - Real-time updates when pages are created or deleted
 * 
 * ### ➕ Create Pages
 * - Input field at the top for entering new page slug
 * - Press Enter or click '+' button to create
 * - Automatically navigates to the new page in the editor
 * - Slug is sanitized (lowercase, hyphens only)
 * 
 * ### ✏️ Rename Pages (Planned)
 * - Edit button (✎) starts rename mode
 * - Currently shows placeholder - full implementation coming soon
 * - Will support keyboard shortcuts (Enter to confirm, Escape to cancel)
 * 
 * ### 🗑️ Delete Pages
 * - Delete button (✕) removes a page
 * - Requires confirmation dialog
 * - Automatically redirects if currently viewing deleted page
 * - Removes file from filesystem via API
 * 
 * ### 🎨 Responsive Design
 * - Full sidebar on desktop
 * - Collapsible on mobile with toggle button
 * - Overlay dismisses sidebar on mobile
 * - Accessible keyboard navigation
 * 
 * ## Integration
 * 
 * The PagesList is integrated into the Studio via `StudioLayout`:
 * 
 * \`\`\`tsx
 * import { StudioLayout } from '@/components/StudioLayout';
 * 
 * export default function StudioPage() {
 *   return (
 *     <StudioLayout>
 *       <Puck config={puckConfig} data={data} />
 *     </StudioLayout>
 *   );
 * }
 * \`\`\`
 * 
 * ## API Routes Used
 * 
 * - `GET /api/pages` - Lists all pages
 * - `POST /api/pages` - Creates a new page
 * - `PUT /api/pages/[slug]` - Updates a page
 * - `DELETE /api/pages/[slug]` - Deletes a page
 * 
 * ## Usage in Studio
 * 
 * To use this component:
 * 
 * 1. Start the Studio: `pnpm dev:studio`
 * 2. Navigate to: http://localhost:3000/studio
 * 3. The sidebar will automatically appear on the left
 * 4. Create, navigate, and manage pages from the sidebar
 * 
 * ## Accessibility
 * 
 * - ARIA labels on all interactive elements
 * - Keyboard navigation support
 * - Screen reader friendly
 * - Role attributes for semantic HTML
 * - Alert region for errors
 * 
 * ## Implementation Details
 * 
 * The component is a React client component (`'use client'`) that:
 * - Uses Next.js App Router hooks (`useRouter`, `useSearchParams`)
 * - Manages state with React hooks
 * - Makes fetch requests to API routes
 * - Integrates with Next.js Link for navigation
 * - Persists pages as JSON files in `data/pages/`
 * 
 * ## File Location
 * 
 * - Component: `apps/studio/src/components/PagesList.tsx`
 * - Layout: `apps/studio/src/components/StudioLayout.tsx`
 * - Styles: `apps/studio/src/components/PagesList.module.css`
 * - API: `apps/studio/src/app/api/pages/`
 * 
 * ## Testing
 * 
 * To test the PagesList component:
 * 
 * 1. **Create a page**: Enter a slug and press Enter
 * 2. **Navigate**: Click on different pages in the list
 * 3. **Delete**: Click the ✕ button and confirm
 * 4. **Mobile**: Resize browser to see responsive behavior
 * 
 * ## Future Enhancements
 * 
 * - [ ] Full rename functionality via API
 * - [ ] Drag-and-drop reordering
 * - [ ] Duplicate page feature
 * - [ ] Search/filter pages
 * - [ ] Folder organization
 * - [ ] Page templates
 * - [ ] Bulk operations
 */
export const Documentation = {
  render: () => {
    return (
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1>📄 PagesList Component</h1>
        <p>
          The PagesList component is integrated into the Studio application.
          To see it in action, run <code>pnpm dev:studio</code> and navigate
          to <strong>http://localhost:3000/studio</strong>.
        </p>
        <div style={{
          background: '#f5f5f5',
          padding: '1rem',
          borderRadius: '8px',
          marginTop: '1rem'
        }}>
          <h3>Quick Start</h3>
          <pre style={{ background: '#fff', padding: '1rem', borderRadius: '4px' }}>
            <code>{`pnpm dev:studio
# Visit: http://localhost:3000/studio`}</code>
          </pre>
        </div>
        <div style={{
          background: '#e3f2fd',
          padding: '1rem',
          borderRadius: '8px',
          marginTop: '1rem',
          border: '1px solid #2196f3'
        }}>
          <strong>ℹ️ Note:</strong> This component cannot be fully demonstrated
          in Storybook as it requires Next.js App Router, API routes, and
          filesystem access. See the full documentation above for details.
        </div>
      </div>
    );
  },
};
