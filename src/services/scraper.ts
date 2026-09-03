import type { ScrapedMetadata } from '../types';

export function sanitizeInput(input: string, maxLen = 500): string {
  if (!input) return '';
  return input
    .trim()
    .replace(/[<>]/g, '') // Strip angle brackets to prevent XSS injection
    .slice(0, maxLen);
}

export function isValidHttpUrl(input: string): boolean {
  if (!input) return false;
  const trimmed = input.trim().toLowerCase();
  if (trimmed.startsWith('javascript:') || trimmed.startsWith('data:') || trimmed.startsWith('vbscript:')) {
    return false;
  }
  try {
    const url = new URL(normalizeUrl(input));
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function normalizeUrl(input: string): string {
  let url = input.trim();
  if (!url) return '';
  // Block malicious protocols
  if (/^(javascript|data|vbscript):/i.test(url)) {
    return '';
  }
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }
  return url;
}

export function extractDomain(url: string): string {
  try {
    const parsed = new URL(normalizeUrl(url));
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return url.replace(/^https?:\/\//, '').split('/')[0];
  }
}

export function getFaviconUrl(domain: string): string {
  const cleanDomain = encodeURIComponent(domain.replace(/[^a-zA-Z0-9.-]/g, ''));
  return `https://www.google.com/s2/favicons?domain=${cleanDomain}&sz=128`;
}

export async function scrapeProductMetadata(rawUrl: string): Promise<ScrapedMetadata> {
  const url = normalizeUrl(rawUrl);
  const domain = extractDomain(url);
  const defaultFavicon = getFaviconUrl(domain);

  // Fallback baseline info
  const domainParts = domain.split('.');
  const primaryName = domainParts.length > 1 ? domainParts[0] : domain;
  const capitalizedName = primaryName.charAt(0).toUpperCase() + primaryName.slice(1);

  let scraped: ScrapedMetadata = {
    url,
    title: `${capitalizedName} — Innovation for modern teams`,
    description: `Official website of ${capitalizedName}. Discover features, integrations, and pricing.`,
    faviconUrl: defaultFavicon,
    siteName: capitalizedName
  };

  try {
    // Attempt to scrape via Microlink API (free public tier for metadata)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data.status === 'success' && data.data) {
        const item = data.data;
        scraped = {
          url,
          title: item.title || scraped.title,
          description: item.description || scraped.description,
          faviconUrl: item.logo?.url || item.image?.url || defaultFavicon,
          siteName: item.publisher || capitalizedName
        };
      }
    }
  } catch {
    // Graceful fallback to client domain generator
  }

  return scraped;
}
