/**
 * MarkdownRenderer Component
 * Renders markdown content with GitHub-style formatting and syntax highlighting
 *
 * Props:
 * @param {string} content - Raw markdown string
 * @param {string} className - Additional CSS classes
 */
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function MarkdownRenderer({ content, className = '' }) {
  if (!content) return null;

  return (
    <div className={`prose prose-sm max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom code block rendering with syntax highlighting
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';

            // Inline code
            if (inline) {
              return (
                <code
                  className="px-1.5 py-0.5 bg-gray-100 text-appverse-red rounded text-sm font-mono"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            // Code blocks with syntax highlighting
            return (
              <SyntaxHighlighter
                style={oneDark}
                language={language || 'text'}
                PreTag="div"
                className="rounded-appverse text-sm"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            );
          },
          // Style links
          a({ node, children, href, ...props }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-appverse-blue hover:text-appverse-red transition-colors"
                {...props}
              >
                {children}
              </a>
            );
          },
          // Style images (for badges, etc.)
          img({ node, src, alt, ...props }) {
            return (
              <img
                src={src}
                alt={alt || ''}
                className="inline-block h-5 my-0"
                {...props}
              />
            );
          },
          // Headings
          h1({ node, children, ...props }) {
            return (
              <h1 className="text-2xl font-bold text-appverse-black border-b border-appverse-gray pb-2 mb-4" {...props}>
                {children}
              </h1>
            );
          },
          h2({ node, children, ...props }) {
            return (
              <h2 className="text-xl font-bold text-appverse-black border-b border-appverse-gray pb-2 mb-3 mt-6" {...props}>
                {children}
              </h2>
            );
          },
          h3({ node, children, ...props }) {
            return (
              <h3 className="text-lg font-bold text-appverse-black mb-2 mt-4" {...props}>
                {children}
              </h3>
            );
          },
          // Lists
          ul({ node, children, ...props }) {
            return (
              <ul className="list-disc list-inside space-y-1 my-3" {...props}>
                {children}
              </ul>
            );
          },
          ol({ node, children, ...props }) {
            return (
              <ol className="list-decimal list-inside space-y-1 my-3" {...props}>
                {children}
              </ol>
            );
          },
          // Paragraphs
          p({ node, children, ...props }) {
            return (
              <p className="my-3 leading-relaxed" {...props}>
                {children}
              </p>
            );
          },
          // Blockquotes
          blockquote({ node, children, ...props }) {
            return (
              <blockquote
                className="border-l-4 border-appverse-gray pl-4 my-4 italic text-gray-600"
                {...props}
              >
                {children}
              </blockquote>
            );
          },
          // Tables (GFM)
          table({ node, children, ...props }) {
            return (
              <div className="overflow-x-auto my-4">
                <table className="min-w-full border border-appverse-gray" {...props}>
                  {children}
                </table>
              </div>
            );
          },
          th({ node, children, ...props }) {
            return (
              <th className="border border-appverse-gray px-3 py-2 bg-gray-100 text-left font-semibold" {...props}>
                {children}
              </th>
            );
          },
          td({ node, children, ...props }) {
            return (
              <td className="border border-appverse-gray px-3 py-2" {...props}>
                {children}
              </td>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

