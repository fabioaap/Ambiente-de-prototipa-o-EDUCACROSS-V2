/**
 * Schema Validation for Export/Import
 * Manual validation without external dependencies (ajv can be added later for production)
 */

import { ExportData as _ExportData, JSONExportResult as _JSONExportResult } from './json';

/**
 * Validate JSON export data against schema
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validateJSONExport(data: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (typeof data !== 'object' || data === null) {
    return { valid: false, errors: ['Root must be an object'] };
  }

  const obj = data as Record<string, unknown>;

  // Validate required fields
  if (!obj.exportedAt || typeof obj.exportedAt !== 'string') {
    errors.push('exportedAt: must be a string');
  } else if (!validateDateFormat(obj.exportedAt)) {
    errors.push('exportedAt: must be a valid ISO 8601 date-time');
  }

  if (typeof obj.totalPages !== 'number' || obj.totalPages < 0) {
    errors.push('totalPages: must be a non-negative number');
  }

  if (!Array.isArray(obj.pages)) {
    errors.push('pages: must be an array');
  } else {
    // Validate each page
    obj.pages.forEach((page: Record<string, unknown>, index: number) => {
      const pageErrors = validatePage(page);
      if (!pageErrors.valid) {
        pageErrors.errors.forEach(err => {
          errors.push(`pages[${index}].${err}`);
        });
      }
    });
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validate a single page object
 * @param page - Page data to validate
 * @returns Validation result
 */
export function validatePage(page: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (typeof page !== 'object' || page === null) {
    return { valid: false, errors: ['must be an object'] };
  }

  const obj = page as Record<string, unknown>;

  // Required string fields
  const stringFields = ['id', 'title', 'slug', 'owner'];
  for (const field of stringFields) {
    if (!obj[field] || typeof obj[field] !== 'string') {
      errors.push(`${field}: required string field is missing or invalid`);
    }
  }

  // Status enum validation
  if (!obj.status || typeof obj.status !== 'string') {
    errors.push('status: required string field is missing');
  } else if (!validateStatus(obj.status)) {
    errors.push('status: must be one of "published", "draft", or "archived"');
  }

  // Date fields
  const dateFields = ['createdAt', 'updatedAt'];
  for (const field of dateFields) {
    if (!obj[field] || typeof obj[field] !== 'string') {
      errors.push(`${field}: required string field is missing`);
    } else if (!validateDateFormat(obj[field])) {
      errors.push(`${field}: must be a valid ISO 8601 date-time`);
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validate CSV status enum
 */
export function validateStatus(status: string): boolean {
  const validStatuses = ['published', 'draft', 'archived'];
  return validStatuses.includes(status);
}

/**
 * Validate date format (ISO 8601)
 */
export function validateDateFormat(dateString: string): boolean {
  try {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) && date.toISOString() === dateString;
  } catch {
    return false;
  }
}

