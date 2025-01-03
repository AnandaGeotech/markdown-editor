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
import { DB_TYPE_NAME } from '@/features/markdown/constant/markdown.contant';

const { upsertDataToDBFn } = markdownService(DB_TYPE_NAME);

interface Item {
  id: number;
  name: string;
  textFile: string;
}

interface ItemContextProps {
  toggleInput: boolean;
  setToglleInput: Dispatch<SetStateAction<boolean>>;
  fileName: string;
  setfileName: Dispatch<SetStateAction<string>>;
  handleFileUpsertFn: (
    // eslint-disable-next-line no-unused-vars
    data: Partial<Item> & { fileId?: string }
  ) => Promise<void>;
  textFile: string;
  settextFile: Dispatch<SetStateAction<string>>;
}

const ItemContext = createContext<ItemContextProps | undefined>(undefined);

interface ItemProviderProps {
  children: ReactNode;
}

export const ItemProvider: FC<ItemProviderProps> = ({ children }) => {
  const [textFile, settextFile] = useState('# Welcome to Markdown');
  const { toast } = useToast();

  const [toggleInput, setToglleInput] = useState(true);
  const [fileName, setfileName] = useState('');

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

    try {
      const resData = await upsertDataToDBFn({
        name: fileName,
        textFile,
        ...(fileId ? { id: fileId } : {}),
      });
      toast({
        title: `File is ${fileId ? 'updated' : 'added'} successfully!`,
      });

      navigate(`/markdown/markdown-edit/${resData}`, { replace: true });
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
