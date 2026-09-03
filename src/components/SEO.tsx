import React, { useEffect } from 'react';

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  keywords?: string;
  author?: string;
  noindex?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
}

const DEFAULT_TITLE = 'Outbid by IndiHunt — Live Attention Marketplace & Category Leaderboards';
const DEFAULT_DESCRIPTION =
  'Every category has its own ranking. Pick one to see who leads it. Claim your spot, outbid competitors, and capture high-intent backlink traffic and verified clicks.';
const DEFAULT_KEYWORDS =
  'outbid, indihunt, startup leaderboard, product ranking, backlink marketplace, attention economy, live bids, saas directory, indie hackers, product promotion';
const SITE_NAME = 'Outbid by IndiHunt';
const DEFAULT_OG_IMAGE = '/og-image.svg';

export const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalUrl,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  keywords = DEFAULT_KEYWORDS,
  author = 'IndiHunt',
  noindex = false,
  breadcrumbs,
  jsonLd,
}) => {
  const fullTitle = title
    ? `${title} | Outbid by IndiHunt`
    : DEFAULT_TITLE;

  const currentUrl =
    canonicalUrl || (typeof window !== 'undefined' ? window.location.href : 'https://outbid.indihunt.in');

  const absoluteOgImage =
    ogImage.startsWith('http://') || ogImage.startsWith('https://')
      ? ogImage
      : typeof window !== 'undefined'
      ? `${window.location.origin}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`
      : `https://outbid.indihunt.in${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;

  useEffect(() => {
    // 1. Title
    document.title = fullTitle;

    // Helper to set or create meta tag
    const setMetaTag = (attribute: 'name' | 'property', key: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'author', author);
    setMetaTag('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // OpenGraph
    setMetaTag('property', 'og:site_name', SITE_NAME);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:image', absoluteOgImage);
    setMetaTag('property', 'og:image:alt', fullTitle);

    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:site', '@IndiHunt');
    setMetaTag('name', 'twitter:creator', '@IndiHunt');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', absoluteOgImage);

    // Structured Data JSON-LD
    const jsonLdElements: HTMLScriptElement[] = [];

    // Helper to append JSON-LD
    const appendJsonLd = (id: string, data: object) => {
      let script = document.getElementById(id) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(data);
      jsonLdElements.push(script);
    };

    // Breadcrumb Schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: crumb.item.startsWith('http')
            ? crumb.item
            : typeof window !== 'undefined'
            ? `${window.location.origin}${crumb.item.startsWith('/') ? '' : '/'}${crumb.item}`
            : `https://outbid.indihunt.in${crumb.item.startsWith('/') ? '' : '/'}${crumb.item}`,
        })),
      };
      appendJsonLd('seo-breadcrumb-jsonld', breadcrumbData);
    }

    // Custom Page-Level Schema (Product, WebSite, etc.)
    if (jsonLd) {
      const schemaData = Array.isArray(jsonLd)
        ? {
            '@context': 'https://schema.org',
            '@graph': jsonLd,
          }
        : {
            '@context': 'https://schema.org',
            ...jsonLd,
          };
      appendJsonLd('seo-custom-jsonld', schemaData);
    }

    return () => {
      // Cleanup custom injected JSON-LD scripts on unmount if needed
      const breadcrumbScript = document.getElementById('seo-breadcrumb-jsonld');
      if (breadcrumbScript) breadcrumbScript.remove();
      const customScript = document.getElementById('seo-custom-jsonld');
      if (customScript) customScript.remove();
    };
  }, [
    fullTitle,
    description,
    currentUrl,
    ogType,
    absoluteOgImage,
    keywords,
    author,
    noindex,
    breadcrumbs,
    jsonLd,
  ]);

  return null;
};
