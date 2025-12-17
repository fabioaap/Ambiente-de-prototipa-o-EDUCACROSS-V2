/**
 * XML Export Converter
 * Converts dashboard data to XML format with optional XSD schema validation
 */

import { ExportData } from './json';

/**
 * Escape XML special characters
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Convert pages to XML format
 * @param pages - Array of page data to export
 * @returns Formatted XML string
 */
export function convertToXML(pages: ExportData[]): string {
  const exportedAt = new Date().toISOString();
  const totalPages = pages.length;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<export>
  <metadata>
    <exportedAt>${exportedAt}</exportedAt>
    <totalPages>${totalPages}</totalPages>
  </metadata>
  <pages>
${pages.map(page => `    <page>
      <id>${escapeXml(page.id)}</id>
      <title>${escapeXml(page.title)}</title>
      <slug>${escapeXml(page.slug)}</slug>
      <status>${escapeXml(page.status)}</status>
      <owner>${escapeXml(page.owner)}</owner>
      <createdAt>${page.createdAt}</createdAt>
      <updatedAt>${page.updatedAt}</updatedAt>
    </page>`).join('\n')}
  </pages>
</export>`;

  return xml;
}

/**
 * Parse XML import data (basic parser without external dependencies)
 * @param xmlString - XML string to parse
 * @returns Parsed pages array
 * @throws Error if XML is invalid or doesn't match schema
 */
export function parseXML(xmlString: string): ExportData[] {
  // Simple regex-based XML parser (for production, use a proper XML parser like fast-xml-parser)
  const pageMatches = xmlString.matchAll(/<page>([\s\S]*?)<\/page>/g);
  const pages: ExportData[] = [];

  for (const match of pageMatches) {
    const pageContent = match[1];

    const extractTag = (tag: string): string => {
      const tagMatch = pageContent.match(new RegExp(`<${tag}>(.*?)</${tag}>`));
      if (!tagMatch) {
        throw new Error(`Invalid XML: missing required tag "${tag}"`);
      }
      return unescapeXml(tagMatch[1]);
    };

    pages.push({
      id: extractTag('id'),
      title: extractTag('title'),
      slug: extractTag('slug'),
      status: extractTag('status'),
      owner: extractTag('owner'),
      createdAt: extractTag('createdAt'),
      updatedAt: extractTag('updatedAt'),
    });
  }

  if (pages.length === 0) {
    throw new Error('Invalid XML: no pages found');
  }

  return pages;
}

/**
 * Unescape XML special characters
 */
function unescapeXml(escaped: string): string {
  return escaped
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

/**
 * Generate filename for XML export
 */
export function generateXMLFilename(): string {
  const timestamp = new Date().toISOString().split('T')[0];
  return `pages-export-${timestamp}.xml`;
}

/**
 * XSD Schema for validation (optional)
 * In production, use this with a proper XML validator
 */
export const XSD_SCHEMA = `<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="export">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="metadata">
          <xs:complexType>
            <xs:sequence>
              <xs:element name="exportedAt" type="xs:dateTime"/>
              <xs:element name="totalPages" type="xs:integer"/>
            </xs:sequence>
          </xs:complexType>
        </xs:element>
        <xs:element name="pages">
          <xs:complexType>
            <xs:sequence>
              <xs:element name="page" maxOccurs="unbounded">
                <xs:complexType>
                  <xs:sequence>
                    <xs:element name="id" type="xs:string"/>
                    <xs:element name="title" type="xs:string"/>
                    <xs:element name="slug" type="xs:string"/>
                    <xs:element name="status" type="xs:string"/>
                    <xs:element name="owner" type="xs:string"/>
                    <xs:element name="createdAt" type="xs:dateTime"/>
                    <xs:element name="updatedAt" type="xs:dateTime"/>
                  </xs:sequence>
                </xs:complexType>
              </xs:element>
            </xs:sequence>
          </xs:complexType>
        </xs:element>
      </xs:sequence>
    </xs:complexType>
  </xs:element>
</xs:schema>`;
