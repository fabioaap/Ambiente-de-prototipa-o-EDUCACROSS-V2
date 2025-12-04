/**
 * JSON Export Converter
 * Converts dashboard data to JSON format matching OpenAPI schema
 */

export interface ExportData {
  id: string;
  title: string;
  slug: string;
  status: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface JSONExportResult {
  exportedAt: string;
  totalPages: number;
  pages: ExportData[];
}

/**
 * Convert pages to JSON format
 * @param pages - Array of page data to export
 * @returns Formatted JSON string
 */
export function convertToJSON(pages: ExportData[]): string {
  const result: JSONExportResult = {
    exportedAt: new Date().toISOString(),
    totalPages: pages.length,
    pages,
  };

  return JSON.stringify(result, null, 2);
}

/**
 * Parse JSON import data
 * @param jsonString - JSON string to parse
 * @returns Parsed export data
 * @throws Error if JSON is invalid or doesn't match schema
 */
export function parseJSON(jsonString: string): JSONExportResult {
  const data = JSON.parse(jsonString);

  // Validate required fields
  if (!data.pages || !Array.isArray(data.pages)) {
    throw new Error('Invalid JSON: missing "pages" array');
  }

  // Validate each page
  data.pages.forEach((page: any, index: number) => {
    const requiredFields = ['id', 'title', 'slug', 'status', 'owner', 'createdAt', 'updatedAt'];
    for (const field of requiredFields) {
      if (!page[field]) {
        throw new Error(`Invalid JSON: page at index ${index} missing required field "${field}"`);
      }
    }
  });

  return data as JSONExportResult;
}

/**
 * Generate filename for JSON export
 */
export function generateJSONFilename(): string {
  const timestamp = new Date().toISOString().split('T')[0];
  return `pages-export-${timestamp}.json`;
}
