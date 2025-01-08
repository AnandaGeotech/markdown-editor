import { TMarkdownError } from '../type/markdown.type';

export const validateMarkdownFn = (text: string): TMarkdownError[] => {
  const errors: TMarkdownError[] = [];

  const lines = text.split('\n');

  lines.forEach((line, index) => {
    if (/^(#{1,6})([^\s#].*)$/.test(line)) {
      errors.push({
        line: index + 1,
        message: 'Missing space between "#" and text in header.',
      });
    }

    if (/^>([^\s>].*)$/.test(line)) {
      errors.push({
        line: index + 1,
        message: 'Missing space between ">" and text in blockquote.',
      });
    }

    if (/^```.*[^`].*$/.test(line)) {
      errors.push({
        line: index + 1,
        message: 'Fenced code block syntax error: no text should follow the opening backticks.',
      });
    }
  });

  return errors;
};
