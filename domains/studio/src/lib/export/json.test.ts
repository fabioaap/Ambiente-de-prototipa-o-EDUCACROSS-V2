/**
 * Unit tests for JSON converter
 */

import { describe, it, expect } from 'vitest';
import { convertToJSON, parseJSON, generateJSONFilename } from './json';
import { ExportData } from './json';

describe('JSON Export/Import', () => {
  const mockPages: ExportData[] = [
    {
      id: 'page-1',
      title: 'Test Page 1',
      slug: '/test-1',
      status: 'published',
      owner: 'user-1',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-02T00:00:00.000Z',
    },
    {
      id: 'page-2',
      title: 'Test Page 2',
      slug: '/test-2',
      status: 'draft',
      owner: 'user-2',
      createdAt: '2024-01-03T00:00:00.000Z',
      updatedAt: '2024-01-04T00:00:00.000Z',
    },
  ];

  describe('convertToJSON', () => {
    it('should export pages to valid JSON', () => {
      const json = convertToJSON(mockPages);
      const parsed = JSON.parse(json);

      expect(parsed).toHaveProperty('exportedAt');
      expect(parsed).toHaveProperty('totalPages', 2);
      expect(parsed).toHaveProperty('pages');
      expect(parsed.pages).toHaveLength(2);
    });

    it('should include all page fields', () => {
      const json = convertToJSON(mockPages);
      const parsed = JSON.parse(json);
      const page = parsed.pages[0];

      expect(page).toHaveProperty('id', 'page-1');
      expect(page).toHaveProperty('title', 'Test Page 1');
      expect(page).toHaveProperty('slug', '/test-1');
      expect(page).toHaveProperty('status', 'published');
      expect(page).toHaveProperty('owner', 'user-1');
      expect(page).toHaveProperty('createdAt');
      expect(page).toHaveProperty('updatedAt');
    });

    it('should handle empty array', () => {
      const json = convertToJSON([]);
      const parsed = JSON.parse(json);

      expect(parsed.totalPages).toBe(0);
      expect(parsed.pages).toHaveLength(0);
    });
  });

  describe('parseJSON', () => {
    it('should parse valid JSON export', () => {
      const json = convertToJSON(mockPages);
      const result = parseJSON(json);

      expect(result.pages).toHaveLength(2);
      expect(result.totalPages).toBe(2);
      expect(result.exportedAt).toBeDefined();
    });

    it('should throw error for invalid JSON', () => {
      expect(() => parseJSON('invalid json')).toThrow();
    });

    it('should throw error for missing pages array', () => {
      const invalidJSON = JSON.stringify({ exportedAt: '2024-01-01' });
      expect(() => parseJSON(invalidJSON)).toThrow('Invalid JSON: missing "pages" array');
    });

    it('should throw error for page missing required fields', () => {
      const invalidJSON = JSON.stringify({
        exportedAt: '2024-01-01',
        totalPages: 1,
        pages: [{ id: 'page-1' }], // Missing other required fields
      });

      expect(() => parseJSON(invalidJSON)).toThrow(/missing required field/);
    });

    it('should validate all pages in array', () => {
      const invalidJSON = JSON.stringify({
        exportedAt: '2024-01-01',
        totalPages: 2,
        pages: [
          mockPages[0],
          { id: 'incomplete' }, // Invalid page
        ],
      });

      expect(() => parseJSON(invalidJSON)).toThrow();
    });
  });

  describe('generateJSONFilename', () => {
    it('should generate filename with .json extension', () => {
      const filename = generateJSONFilename();
      expect(filename).toMatch(/^pages-export-\d{4}-\d{2}-\d{2}\.json$/);
    });

    it('should include current date', () => {
      const filename = generateJSONFilename();
      const today = new Date().toISOString().split('T')[0];
      expect(filename).toContain(today);
    });
  });
});
