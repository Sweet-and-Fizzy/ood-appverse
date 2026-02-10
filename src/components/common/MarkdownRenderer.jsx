/**
 * MarkdownRenderer Component
 * Renders markdown content with GitHub-style formatting and syntax highlighting
 *
 * Props:
 * @param {string} content - Raw markdown string
 * @param {string} className - Additional CSS classes
 * @param {boolean} darkMode - Use dark theme styling
 */
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function MarkdownRenderer({ content, className = '', darkMode = false }) {
  if (!content) return null;

  // Dark mode color classes
  const colors = darkMode ? {
    text: 'text-gray-200',
    textMuted: 'text-gray-400',
    heading: 'text-white',
    border: 'border-gray-600',
    codeBg: 'bg-gray-800',
    codeText: 'text-pink-400',
    link: 'text-blue-400 hover:text-blue-300',
    blockquoteBorder: 'border-gray-500',
    blockquoteText: 'text-gray-400',
    tableBorder: 'border-gray-600',
    tableHeaderBg: 'bg-gray-800',
  } : {
    text: 'text-gray-800',
    textMuted: 'text-gray-600',
    heading: 'text-appverse-black',
    border: 'border-appverse-gray',
    codeBg: 'bg-gray-100',
    codeText: 'text-appverse-red',
    link: 'text-appverse-blue hover:text-appverse-red',
    blockquoteBorder: 'border-appverse-gray',
    blockquoteText: 'text-gray-600',
    tableBorder: 'border-appverse-gray',
    tableHeaderBg: 'bg-gray-100',
  };

  return (
    <div className={`prose prose-sm max-w-none ${darkMode ? 'prose-invert' : ''} ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypeSanitize, defaultSchema]]}
        components={{
          // Custom code block rendering with syntax highlighting
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';

            // Inline code
            if (inline) {
              return (
                <code
                  className={`px-1.5 py-0.5 ${colors.codeBg} ${colors.codeText} rounded text-sm font-mono`}
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
                className={`${colors.link} transition-colors`}
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
              <h1 className={`text-2xl font-bold ${colors.heading} border-b ${colors.border} pb-2 mb-4`} {...props}>
                {children}
              </h1>
            );
          },
          h2({ node, children, ...props }) {
            return (
              <h2 className={`text-xl font-bold ${colors.heading} border-b ${colors.border} pb-2 mb-3 mt-6`} {...props}>
                {children}
              </h2>
            );
          },
          h3({ node, children, ...props }) {
            return (
              <h3 className={`text-lg font-bold ${colors.heading} mb-2 mt-4`} {...props}>
                {children}
              </h3>
            );
          },
          // Lists
          ul({ node, children, ...props }) {
            return (
              <ul className={`list-disc list-inside space-y-1 my-3 ${colors.text}`} {...props}>
                {children}
              </ul>
            );
          },
          ol({ node, children, ...props }) {
            return (
              <ol className={`list-decimal list-inside space-y-1 my-3 ${colors.text}`} {...props}>
                {children}
              </ol>
            );
          },
          li({ node, children, ...props }) {
            return (
              <li className={colors.text} {...props}>
                {children}
              </li>
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
                className={`border-l-4 ${colors.blockquoteBorder} pl-4 my-4 italic ${colors.blockquoteText}`}
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
                <table className={`min-w-full border ${colors.tableBorder}`} {...props}>
                  {children}
                </table>
              </div>
            );
          },
          th({ node, children, ...props }) {
            return (
              <th className={`border ${colors.tableBorder} px-3 py-2 ${colors.tableHeaderBg} text-left font-semibold`} {...props}>
                {children}
              </th>
            );
          },
          td({ node, children, ...props }) {
            return (
              <td className={`border ${colors.tableBorder} px-3 py-2`} {...props}>
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

