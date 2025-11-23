export interface PageMetadata {
  slug: string;
  title: string;
  domain: 'BackOffice' | 'FrontOffice' | 'Game' | 'Geral';
  status: 'draft' | 'published';
  lastModified: string;
}

export interface PagesResponse {
  pages: PageMetadata[];
}
