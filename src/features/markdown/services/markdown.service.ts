import { DB_CONNECT, SELECTED_SERVICE_TYPE } from '../constant/markdown.contant';
import { TMarkdownError } from '../type/markdown.type';

type IDBType = keyof typeof DB_CONNECT;

export const validateMarkdownFn = (text: string): TMarkdownError[] => {
  const errors: TMarkdownError[] = [];

  // Split into lines for processing
  const lines = text.split('\n');

  lines.forEach((line, index) => {
    // Check for header spacing (e.g., `#Header` should be `# Header`)
    if (/^(#{1,6})([^\s#].*)$/.test(line)) {
      errors.push({
        line: index + 1,
        message: 'Missing space between "#" and text in header.',
      });
    }

    // Check for blockquote spacing (e.g., `>blockquote` should be `> blockquote`)
    if (/^>([^\s>].*)$/.test(line)) {
      errors.push({
        line: index + 1,
        message: 'Missing space between ">" and text in blockquote.',
      });
    }

    // Check for fenced code block indentation or text after backticks
    if (/^```.*[^`].*$/.test(line)) {
      errors.push({
        line: index + 1,
        message: 'Fenced code block syntax error: no text should follow the opening backticks.',
      });
    }
  });

  return errors;
};
const markdownService = () => {
  if (SELECTED_SERVICE_TYPE in DB_CONNECT) {
    return DB_CONNECT[SELECTED_SERVICE_TYPE as IDBType];
  }

  window.alert('Invalid database type. Please choose either IndexDB or LocalStorage.');
  throw new Error('Invalid database type');
};

export default markdownService;
