import { marked } from 'marked';

function toHTML(markdown: string): string {
  const sanitizedText = markdown.replace(
    /^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, // sanitize zero width Unicode characters which interfere with parsing
    ''
  );
  return marked.parse(sanitizedText);
}

function parseMarkdownToHTML(content: string): string {
  const html = toHTML(content);
  return html;
}

export default parseMarkdownToHTML;
