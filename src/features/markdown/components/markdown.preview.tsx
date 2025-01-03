import MarkdownIt from 'markdown-it';
import { FC } from 'react';
import { MarkdownPreviewProps } from '../type/markdown.type';

const md = new MarkdownIt();

const MarkdownPreview: FC<MarkdownPreviewProps> = ({ content }:{content:string}) => {
  // Convert Markdown to HTML
  const renderedHTML = md.render(content);

  return (
    <div className="p-4 h-full bg-black overflow-auto">

      <div
        className="markdown-preview  custom-html-renderer"
        dangerouslySetInnerHTML={{ __html: renderedHTML }}
      />
    </div>
  );
};

export default MarkdownPreview;
