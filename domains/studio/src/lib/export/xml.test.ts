/**
 * Unit tests for XML converter
 */

import { describe, it, expect } from 'vitest';
import { convertToXML, parseXML, generateXMLFilename } from './xml';
import { ExportData } from './json';

describe('XML Export/Import', () => {
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
      title: 'Test & Special <Characters>',
      slug: '/test-2',
      status: 'draft',
      owner: 'user-2',
      createdAt: '2024-01-03T00:00:00.000Z',
      updatedAt: '2024-01-04T00:00:00.000Z',
    },
  ];

  describe('convertToXML', () => {
    it('should export pages to valid XML', () => {
      const xml = convertToXML(mockPages);

      expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(xml).toContain('<export>');
      expect(xml).toContain('</export>');
      expect(xml).toContain('<metadata>');
      expect(xml).toContain('<pages>');
    });

    it('should include all page fields', () => {
      const xml = convertToXML(mockPages);

      expect(xml).toContain('<id>page-1</id>');
      expect(xml).toContain('<title>Test Page 1</title>');
      expect(xml).toContain('<slug>/test-1</slug>');
      expect(xml).toContain('<status>published</status>');
      expect(xml).toContain('<owner>user-1</owner>');
    });

    it('should escape XML special characters', () => {
      const xml = convertToXML(mockPages);

      expect(xml).toContain('&amp;'); // & escaped
      expect(xml).toContain('&lt;'); // < escaped
      expect(xml).toContain('&gt;'); // > escaped
    });

    it('should handle empty array', () => {
      const xml = convertToXML([]);

      expect(xml).toContain('<totalPages>0</totalPages>');
      expect(xml).toContain('<pages>');
      expect(xml).toContain('</pages>');
    });
  });

  describe('parseXML', () => {
    it('should parse valid XML export', () => {
      const xml = convertToXML(mockPages);
      const pages = parseXML(xml);

      expect(pages).toHaveLength(2);
      expect(pages[0]).toMatchObject({
        id: 'page-1',
        title: 'Test Page 1',
        slug: '/test-1',
        status: 'published',
      });
    });

    it('should unescape XML special characters', () => {
      const xml = convertToXML(mockPages);
      const pages = parseXML(xml);

      expect(pages[1].title).toBe('Test & Special <Characters>');
    });

    it('should throw error for invalid XML', () => {
      expect(() => parseXML('invalid xml')).toThrow();
    });

    it('should throw error for missing required tags', () => {
      const invalidXML = `<?xml version="1.0"?>
<export>
  <pages>
    <page>
      <id>page-1</id>
    </page>
  </pages>
</export>`;

      expect(() => parseXML(invalidXML)).toThrow(/missing required tag/);
    });

    it('should throw error when no pages found', () => {
      const emptyXML = `<?xml version="1.0"?>
<export>
  <metadata>
    <exportedAt>2024-01-01</exportedAt>
    <totalPages>0</totalPages>
  </metadata>
  <pages></pages>
</export>`;

      expect(() => parseXML(emptyXML)).toThrow('Invalid XML: no pages found');
    });
  });

  describe('generateXMLFilename', () => {
    it('should generate filename with .xml extension', () => {
      const filename = generateXMLFilename();
      expect(filename).toMatch(/^pages-export-\d{4}-\d{2}-\d{2}\.xml$/);
    });

    it('should include current date', () => {
      const filename = generateXMLFilename();
      const today = new Date().toISOString().split('T')[0];
      expect(filename).toContain(today);
    });
  });
});
