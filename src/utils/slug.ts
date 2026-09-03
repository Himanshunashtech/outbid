/**
 * Utility functions for generating URL-safe slugs for categories and products.
 */

export function slugify(text: string): string {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start
    .replace(/-+$/, ''); // Trim - from end
}

export function getProductSlug(title: string, id?: string): string {
  const baseTitle = title.split('—')[0].split('|')[0].trim();
  const slug = slugify(baseTitle || title);
  return slug || id || 'product';
}
