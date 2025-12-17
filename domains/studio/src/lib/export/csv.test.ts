/**
 * Unit tests for CSV converter
 */

import { describe, it, expect } from 'vitest';
import { convertToCSV, parseCSV, generateCSVFilename, CSV_HEADERS } from './csv';
import { ExportData } from './json';

describe('CSV Export/Import', () => {
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
      title: 'Test, with "quotes"',
      slug: '/test-2',
      status: 'draft',
      owner: 'user-2',
      createdAt: '2024-01-03T00:00:00.000Z',
      updatedAt: '2024-01-04T00:00:00.000Z',
    },
  ];

  describe('convertToCSV', () => {
    it('should export pages to valid CSV', () => {
      const csv = convertToCSV(mockPages);
      const lines = csv.split('\n');

      expect(lines[0]).toBe(CSV_HEADERS.join(','));
      expect(lines.length).toBe(3); // Header + 2 data rows
    });

    it('should include all page fields', () => {
      const csv = convertToCSV(mockPages);

      expect(csv).toContain('page-1');
      expect(csv).toContain('Test Page 1');
      expect(csv).toContain('/test-1');
      expect(csv).toContain('published');
      expect(csv).toContain('user-1');
    });

    it('should escape CSV special characters', () => {
      const csv = convertToCSV(mockPages);

      // Quotes should be escaped
      expect(csv).toContain('""quotes""');
    });

    it('should handle empty array', () => {
      const csv = convertToCSV([]);
      const lines = csv.split('\n');

      expect(lines.length).toBe(1); // Only header
      expect(lines[0]).toBe(CSV_HEADERS.join(','));
    });
  });

  describe('parseCSV', () => {
    it('should parse valid CSV export', () => {
      const csv = convertToCSV(mockPages);
      const pages = parseCSV(csv);

      expect(pages).toHaveLength(2);
      expect(pages[0]).toMatchObject({
        id: 'page-1',
        title: 'Test Page 1',
        slug: '/test-1',
        status: 'published',
      });
    });

    it('should handle quoted fields with commas', () => {
      const csv = convertToCSV(mockPages);
      const pages = parseCSV(csv);

      expect(pages[1].title).toBe('Test, with "quotes"');
    });

    it('should throw error for invalid CSV (no rows)', () => {
      expect(() => parseCSV('')).toThrow('Invalid CSV: file must contain headers and at least one data row');
    });

    it('should throw error for header mismatch', () => {
      const invalidCSV = 'Wrong,Headers\nvalue1,value2';

      expect(() => parseCSV(invalidCSV)).toThrow(/expected .* columns/);
    });

    it('should throw error for column count mismatch', () => {
      const invalidCSV = `${CSV_HEADERS.join(',')}\nvalue1,value2`;

      expect(() => parseCSV(invalidCSV)).toThrow(/has .* columns, expected/);
    });

    it('should throw error for missing required fields', () => {
      const invalidCSV = `${CSV_HEADERS.join(',')}\n"","","","","","",""`;

      expect(() => parseCSV(invalidCSV)).toThrow(/missing ID/);
    });

    it('should throw error for invalid status', () => {
      const invalidCSV = `${CSV_HEADERS.join(',')}\n"page-1","Title","/slug","invalid-status","owner","2024-01-01","2024-01-02"`;

      expect(() => parseCSV(invalidCSV)).toThrow(/invalid status/);
    });

    it('should validate all rows', () => {
      const csv = `${CSV_HEADERS.join(',')}\n"page-1","Title 1","/slug-1","published","owner","2024-01-01","2024-01-02"\n"","Title 2","/slug-2","draft","owner","2024-01-01","2024-01-02"`;

      expect(() => parseCSV(csv)).toThrow(/row 3 missing ID/);
    });
  });

  describe('generateCSVFilename', () => {
    it('should generate filename with .csv extension', () => {
      const filename = generateCSVFilename();
      expect(filename).toMatch(/^pages-export-\d{4}-\d{2}-\d{2}\.csv$/);
    });

    it('should include current date', () => {
      const filename = generateCSVFilename();
      const today = new Date().toISOString().split('T')[0];
      expect(filename).toContain(today);
    });
  });
});
