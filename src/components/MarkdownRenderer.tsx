'use client';

/**
 * MarkdownRenderer Component
 * @module MarkdownRenderer
 * @description Renders markdown with syntax highlighting
 */
import { useEffect } from 'react';
import hljs from 'highlight.js';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  useEffect(() => {
    // Highlight code blocks after content is rendered
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  }, [content]);

  return (
    <div
      className={`prose prose-slate dark:prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
