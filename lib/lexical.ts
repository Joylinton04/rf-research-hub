import type { Project } from '@/payload-types';

type LexicalNode = {
  text?: unknown;
  children?: unknown;
};

const isNode = (value: unknown): value is LexicalNode =>
  typeof value === 'object' && value !== null;

/** Depth-first concatenation of every text node beneath `node`. */
const collectText = (node: unknown): string => {
  if (!isNode(node)) return '';
  if (typeof node.text === 'string') return node.text;
  if (!Array.isArray(node.children)) return '';
  return node.children.map(collectText).join('');
};

/**
 * Flattens a Lexical document into one plain string per top-level block.
 *
 * Rich text is the editable source of truth, but the project cards need a short
 * excerpt and the client-side filter needs something to match against — markup
 * only gets in the way of both.
 */
export const lexicalToParagraphs = (content: Project['content']): string[] => {
  const children = content?.root?.children;
  if (!Array.isArray(children)) return [];
  return children.map(collectText).filter((text) => text.trim().length > 0);
};
