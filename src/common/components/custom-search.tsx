/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-unused-vars */
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  AudioLines, FileIcon, Mic,
} from 'lucide-react';
import { Button } from '@/common/components/button';

interface ISearchFormProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  children?: ReactNode;
}

interface ISearchFormContext {
  searchQuery: string;
  onSearch: (query: string) => void;
  recognizing: boolean;
  toggleStartStop: () => void;
}

const SearchFormContext = createContext<ISearchFormContext | undefined>(undefined);

function useSearchFormContext() {
  const context = useContext(SearchFormContext);
  if (!context) {
    throw new Error('useSearchFormContext must be used within a CustomSearchForm');
  }
  return context;
}

const CustomSearchForm: React.FC<ISearchFormProps> & {
  Input: typeof SearchFormInput;
  Button: typeof SearchFormButton;
} = ({
  searchQuery, onSearch, children,
}) => {
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [recognizing, setRecognizing] = useState(false);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;

      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        const finalTranscript = Array.from(event.results)
          .filter((result) => result.isFinal)
          .map((result) => result[0].transcript)
          .join('');
        onSearch(finalTranscript);
      };

      recognitionInstance.onend = () => {
        setRecognizing(false);
      };

      setRecognition(recognitionInstance);
    } else {
      console.error('SpeechRecognition is not supported in this browser.');
    }
  }, [onSearch]);

  const toggleStartStop = () => {
    if (recognition) {
      if (recognizing) {
        recognition.stop();
        setRecognizing(false);
      } else {
        recognition.start();
        setRecognizing(true);
      }
    }
  };

  return (
    <SearchFormContext.Provider value={{
      searchQuery, onSearch, recognizing, toggleStartStop,
    }}
    >
      <form className="flex items-center max-w-lg mx-auto">
        {children}
      </form>
    </SearchFormContext.Provider>
  );
};

const SearchFormInput: React.FC = () => {
  const { searchQuery, onSearch } = useSearchFormContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="relative md:w-[600px]">
      <div className="absolute inset-y-0 start-0 flex items-center px-3 pointer-events-none">
        <FileIcon />
      </div>
      <input
        type="text"
        id="voice-search"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search for filename"
        value={searchQuery}
        onChange={handleInputChange}
        required
      />
    </div>
  );
};

const SearchFormButton: React.FC = () => {
  const { recognizing, toggleStartStop } = useSearchFormContext();

  return (
    <Button
      type="button"
      className="absolute inset-y-0 end-0 flex items-center pe-3 h-100"
      onClick={toggleStartStop}
    >
      {recognizing ? <AudioLines /> : <Mic />}
    </Button>
  );
};

CustomSearchForm.Input = SearchFormInput;
CustomSearchForm.Button = SearchFormButton;

export default CustomSearchForm;
