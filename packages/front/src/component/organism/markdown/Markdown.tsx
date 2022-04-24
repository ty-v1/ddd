import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

type Props = {
  readonly children: string;
};

export const Markdown: React.FC<Props> = ({ children }) => {
  return (
    <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]} className="markdown-body">
      {children}
    </ReactMarkdown>
  );
};
