/**
 * CSV Export Converter
 * Enhanced CSV converter with proper headers and validation
 */

import { ExportData } from './json';

/**
 * CSV headers definition
 */
export const CSV_HEADERS = [
  'ID',
  'Title',
  'Slug',
  'Status',
  'Owner',
  'Created At',
  'Updated At',
] as const;

/**
 * Convert pages to CSV format with headers
 * @param pages - Array of page data to export
 * @returns Formatted CSV string
 */
export function convertToCSV(pages: ExportData[]): string {
  const rows = pages.map((page) => [
    page.id,
    page.title,
    page.slug,
    page.status,
    page.owner,
    page.createdAt,
    page.updatedAt,
  ]);

  const csv = [
    CSV_HEADERS.join(','),
    ...rows.map((row) => row.map((cell) => `"${escapeCsvCell(cell)}"`).join(',')),
  ].join('\n');

  return csv;
}

/**
 * Parse CSV import data
 * @param csvString - CSV string to parse
 * @returns Parsed pages array
 * @throws Error if CSV is invalid or doesn't match schema
 */
export function parseCSV(csvString: string): ExportData[] {
  const lines = csvString.trim().split('\n');

  if (lines.length < 2) {
    throw new Error('Invalid CSV: file must contain headers and at least one data row');
  }

  // Validate headers
  const headers = parseCSVLine(lines[0]);
  const expectedHeaders = CSV_HEADERS as readonly string[];
  
  if (headers.length !== expectedHeaders.length) {
    throw new Error(`Invalid CSV: expected ${expectedHeaders.length} columns, got ${headers.length}`);
  }

  for (let i = 0; i < expectedHeaders.length; i++) {
    if (headers[i] !== expectedHeaders[i]) {
      throw new Error(`Invalid CSV: expected column "${expectedHeaders[i]}" at position ${i + 1}, got "${headers[i]}"`);
    }
  }

  // Parse data rows
  const pages: ExportData[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = parseCSVLine(lines[i]);

    if (row.length !== expectedHeaders.length) {
      throw new Error(`Invalid CSV: row ${i + 1} has ${row.length} columns, expected ${expectedHeaders.length}`);
    }

    // Validate required fields
    if (!row[0]) throw new Error(`Invalid CSV: row ${i + 1} missing ID`);
    if (!row[1]) throw new Error(`Invalid CSV: row ${i + 1} missing Title`);
    if (!row[2]) throw new Error(`Invalid CSV: row ${i + 1} missing Slug`);
    if (!row[3]) throw new Error(`Invalid CSV: row ${i + 1} missing Status`);

    // Validate status enum
    const validStatuses = ['published', 'draft', 'archived'];
    if (!validStatuses.includes(row[3])) {
      throw new Error(`Invalid CSV: row ${i + 1} has invalid status "${row[3]}" (must be one of: ${validStatuses.join(', ')})`);
    }

    pages.push({
      id: row[0],
      title: row[1],
      slug: row[2],
      status: row[3],
      owner: row[4],
      createdAt: row[5],
      updatedAt: row[6],
    });
  }

  return pages;
}

/**
 * Parse a single CSV line, handling quoted fields
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped quote
        current += '"';
        i++;
      } else {
        // Toggle quote mode
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}

/**
 * Escape CSV special characters
 */
function escapeCsvCell(value: string): string {
  // Escape double quotes by doubling them
  return value.replace(/"/g, '""');
}

/**
 * Generate filename for CSV export
 */
export function generateCSVFilename(): string {
  const timestamp = new Date().toISOString().split('T')[0];
  return `pages-export-${timestamp}.csv`;
}
