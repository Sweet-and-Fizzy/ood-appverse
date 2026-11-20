/**
 * Strip HTML tags from a string and collapse whitespace.
 * Defensive: returns '' for non-string input.
 *
 * @param {string} html - HTML (or plain) text
 * @returns {string} plain text
 */
export function stripHtml(html) {
  if (typeof html !== 'string') return '';
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}
