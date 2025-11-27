import { describe, expect, it } from 'vitest';

import { normalizeRootAttributes } from '../normalizeRootAttributes';

describe('normalizeRootAttributes', () => {
    it('returns deterministic defaults when no overrides are provided', () => {
        const result = normalizeRootAttributes();

        expect(result.lang).toBe('pt-BR');
        expect(result.dataTheme).toBe('dark');
        expect(result.className).toBe('bg-neutral-950 text-neutral-50');
        expect(result.attributes).toEqual({
            class: 'bg-neutral-950 text-neutral-50',
            lang: 'pt-BR',
            'data-theme': 'dark',
        });
    });

    it('filters extension tokens while preserving approved utility classes', () => {
        const result = normalizeRootAttributes({
            className: 'bg-neutral-950 fusion-extension-loaded text-neutral-50 antialiased',
            allowList: ['antialiased'],
        });

        expect(result.className).toBe('bg-neutral-950 text-neutral-50 antialiased');
        expect(result.attributes.class?.includes('fusion')).toBe(false);
    });

    it('accepts language, theme, and allowlist overrides', () => {
        const result = normalizeRootAttributes({
            lang: 'en-US',
            theme: 'light',
            className: 'bg-neutral-950 text-neutral-50 outline-none',
            allowList: ['outline-none'],
        });

        expect(result.lang).toBe('en-US');
        expect(result.dataTheme).toBe('light');
        expect(result.attributes['data-theme']).toBe('light');
        expect(result.className.endsWith('outline-none')).toBe(true);
    });

    it('drops tokens that match custom blocklists', () => {
        const result = normalizeRootAttributes({
            className: 'bg-neutral-950 text-neutral-50 contest-mode',
            allowList: ['contest-mode'],
            blocklist: [/contest/],
        });

        expect(result.className).toBe('bg-neutral-950 text-neutral-50');
    });
});
