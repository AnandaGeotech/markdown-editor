import MarkdownIt from 'markdown-it';
import { COPY_TYPE_HTML } from '../constant/markdown.contant';

const md = new MarkdownIt();
export const handleCopyFn = ({ textFile, name }:{ name: string, textFile: string }) => {
  if (name === COPY_TYPE_HTML) {
    const renderedHTML = md.render(textFile);
    return navigator.clipboard.writeText(renderedHTML);
  }

  return navigator.clipboard.writeText(textFile);
};
