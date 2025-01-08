import {
  createContext,
  FC,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/common/hooks/use-toast';
import markdownService, { validateMarkdownFn } from '@/features/markdown/services/markdown.service';
import { IMarkdownContextProps, IMarkdownProviderProps, TMarkdownError } from '@/features/markdown/type/markdown.type';

const serviceMethods = markdownService();

const MarkdownContext = createContext<IMarkdownContextProps | undefined>(undefined);

export const MarkdownProvider: FC<IMarkdownProviderProps> = ({ children }) => {
  const [textFile, settextFile] = useState('# Welcome to Markdown');
  const { toast } = useToast();

  const [toggleInput, setToglleInput] = useState(true);
  const [fileName, setfileName] = useState('');
  const [customErrors, setcustomErrors] = useState<TMarkdownError[]>([]);

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

    const customErrorss = validateMarkdownFn(textFile);
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
      const resData = await serviceMethods.upsertDataToDBFn({
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
    serviceMethods,
  }), [toggleInput, fileName, textFile]);

  return (
    <MarkdownContext.Provider value={value}>
      {children}
    </MarkdownContext.Provider>
  );
};

// Custom hook for consuming the context
export const useMarkdownContext = (): IMarkdownContextProps => {
  const context = useContext(MarkdownContext);
  if (!context) {
    throw new Error('useMarkdownContext must be used within an MarkdownProvider');
  }
  return context;
};
