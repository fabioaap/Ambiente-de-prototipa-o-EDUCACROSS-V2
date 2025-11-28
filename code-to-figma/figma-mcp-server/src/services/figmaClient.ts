/**
 * Figma REST API Client
 * 
 * Handles communication with Figma API including:
 * - File and node fetching
 * - Image rendering
 * - Retry logic with exponential backoff
 * - Rate limit handling
 */

import { request } from 'undici';
import { getConfig } from '../config.js';

const FIGMA_API_BASE = 'https://api.figma.com/v1';
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000; // 1 second

export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
  [key: string]: any;
}

export interface FigmaFileResponse {
  name: string;
  lastModified: string;
  document: FigmaNode;
  components: Record<string, any>;
  styles: Record<string, any>;
}

export interface FigmaImageResponse {
  err: string | null;
  images: Record<string, string>;
}

export class FigmaClient {
  private token: string;

  constructor(token?: string) {
    const config = getConfig();
    this.token = token || config.FIGMA_PERSONAL_TOKEN;
  }

  private async retryWithBackoff<T>(
    fn: () => Promise<T>,
    retries = MAX_RETRIES,
    delay = INITIAL_RETRY_DELAY
  ): Promise<T> {
    try {
      return await fn();
    } catch (error: any) {
      if (retries === 0 || error.statusCode === 401 || error.statusCode === 403) {
        throw error;
      }

      // Retry on rate limit or server errors
      if (error.statusCode === 429 || error.statusCode >= 500) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.retryWithBackoff(fn, retries - 1, delay * 2);
      }

      throw error;
    }
  }

  async getFile(fileId: string): Promise<FigmaFileResponse> {
    return this.retryWithBackoff(async () => {
      const response = await request(`${FIGMA_API_BASE}/files/${fileId}`, {
        headers: {
          'X-Figma-Token': this.token,
        },
      });

      if (response.statusCode !== 200) {
        throw new Error(`Figma API error: ${response.statusCode}`);
      }

      return await response.body.json() as FigmaFileResponse;
    });
  }

  async getNodes(fileId: string, nodeIds: string[]): Promise<any> {
    const ids = nodeIds.join(',');
    
    return this.retryWithBackoff(async () => {
      const response = await request(
        `${FIGMA_API_BASE}/files/${fileId}/nodes?ids=${encodeURIComponent(ids)}`,
        {
          headers: {
            'X-Figma-Token': this.token,
          },
        }
      );

      if (response.statusCode !== 200) {
        throw new Error(`Figma API error: ${response.statusCode}`);
      }

      return await response.body.json();
    });
  }

  /**
   * Get specific frame nodes with their children
   * Convenience method for getNodes that returns structured response
   */
  async getFrameNodes(fileId: string, frameId: string): Promise<any> {
    return this.getNodes(fileId, [frameId]);
  }

  async getImages(
    fileId: string,
    nodeIds: string[],
    options: { format?: 'jpg' | 'png' | 'svg'; scale?: number } = {}
  ): Promise<FigmaImageResponse> {
    const ids = nodeIds.join(',');
    const format = options.format || 'png';
    const scale = options.scale || 2;

    return this.retryWithBackoff(async () => {
      const response = await request(
        `${FIGMA_API_BASE}/images/${fileId}?ids=${encodeURIComponent(ids)}&format=${format}&scale=${scale}`,
        {
          headers: {
            'X-Figma-Token': this.token,
          },
        }
      );

      if (response.statusCode !== 200) {
        throw new Error(`Figma API error: ${response.statusCode}`);
      }

      return await response.body.json() as FigmaImageResponse;
    });
  }
}

export const createFigmaClient = (token?: string) => new FigmaClient(token);

// Default singleton instance
export const figmaClient = new FigmaClient();
