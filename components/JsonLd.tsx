import React from 'react';

/**
 * Emits one schema.org block as JSON-LD.
 *
 * Google reads structured data from a script tag, not from the rendered DOM,
 * so this has to be `dangerouslySetInnerHTML` rather than a text child — React
 * would HTML-escape the quotes and the block would not parse.
 *
 * `<` is escaped on the way out so a stray "</script>" inside any string — a
 * project title, an editor's description — cannot close the tag early and turn
 * the rest of the payload into markup.
 */
export const JsonLd: React.FC<{ data: Record<string, unknown> }> = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data).replace(/</g, '\\u003c'),
    }}
  />
);
