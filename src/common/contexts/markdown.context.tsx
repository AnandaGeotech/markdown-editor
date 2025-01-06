import {
  createContext, Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/common/hooks/use-toast';
import markdownService from '@/features/markdown/services/markdown.service';
import { SELECTED_SERVICE_TYPE } from '@/features/markdown/constant/markdown.contant';
import { FileInfo } from '@/types/file.type';

type MarkdownError = {
  line: number;
  message: string;
};

const { upsertDataToDBFn } = markdownService(SELECTED_SERVICE_TYPE);

interface ItemContextProps {
  toggleInput: boolean;
  setToglleInput: Dispatch<SetStateAction<boolean>>;
  fileName: string;
  setfileName: Dispatch<SetStateAction<string>>;
  handleFileUpsertFn: (
    // eslint-disable-next-line no-unused-vars
    data: Partial<FileInfo> & { fileId?: string }
  ) => Promise<void>;
  textFile: string;
  settextFile: Dispatch<SetStateAction<string>>;
  customErrors: MarkdownError[];
  setcustomErrors: Dispatch<SetStateAction<MarkdownError[]>>;
}

const ItemContext = createContext<ItemContextProps | undefined>(undefined);

interface ItemProviderProps {
  children: ReactNode;
}

export const validateMarkdown = (text: string): MarkdownError[] => {
  const errors: MarkdownError[] = [];

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
export const ItemProvider: FC<ItemProviderProps> = ({ children }) => {
  const [textFile, settextFile] = useState('# Welcome to Markdown');
  const { toast } = useToast();

  const [toggleInput, setToglleInput] = useState(true);
  const [fileName, setfileName] = useState('');
  const [customErrors, setcustomErrors] = useState<MarkdownError[]>([]);

  const navigate = useNavigate();

  const handleFileUpsertFn = async ({ fileId }: { fileId?: string }) => {
    let errorMessage = 'Please enter';

    if (!fileName.trim()) {
      errorMessage += ' filename';
    }
    if (!textFile.trim()) {
      errorMessage += ' readme text';
    }
    errorMessage += ' !';
    if (!fileName.trim() || !textFile.trim()) {
      toast({
        title: errorMessage,
        variant: 'destructive',
      });
      return;
    }

    const customErrorss = validateMarkdown(textFile);
    if (customErrorss && customErrorss.length > 0) {
      let linesOfError = '';
      let messages = '';

      // Use one loop to build both strings
      for (let i = 0; i < customErrorss.length; i++) {
        const { line, message } = customErrorss[i];
        linesOfError += line + (i < customErrorss.length - 1 ? ', ' : '');
        messages += message + (i < customErrorss.length - 1 ? ' | ' : '');
      }

      toast({
        variant: 'destructive',
        title: `Lines of error:  ${linesOfError}`,
        description: messages,
      });
      return;
    }

    try {
      const resData = await upsertDataToDBFn({
        name: fileName,
        textFile,
        ...(fileId ? { id: fileId } : {}),
      });
      toast({
        title: `File is ${fileId ? 'updated' : 'added'} successfully!`,
      });

      navigate(`/markdown/markdown-edit/${resData?.id}`, { replace: true });
    } catch (error: any) {
      toast({
        title: error?.message || 'Something went wrong!',
        variant: 'destructive',
      });
    }
  };

  // Memoize the context value
  const value = useMemo(() => ({
    toggleInput,
    setToglleInput,
    fileName,
    setfileName,
    handleFileUpsertFn,
    textFile,
    settextFile,
    customErrors,
    setcustomErrors,
  }), [toggleInput, fileName, textFile]);

  return (
    <ItemContext.Provider value={value}>
      {children}
    </ItemContext.Provider>
  );
};

// Custom hook for consuming the context
export const useItemContext = (): ItemContextProps => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error('useItemContext must be used within an ItemProvider');
  }
  return context;
};
