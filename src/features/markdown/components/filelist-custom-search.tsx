import React, { useEffect, useState } from 'react';
import {
  AudioLines, FileIcon, Mic, SearchIcon,
} from 'lucide-react';
import { Button } from '../../../common/components/button';
import { ISearchFormProps } from '@/types/common.type';

const FileListCustomSearchForm: React.FC<ISearchFormProps> = ({ onSearch, searchQuery }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [recognizing, setRecognizing] = useState(false);
  const [finalText, setFinalText] = useState('');
  const [interimText, setInterimText] = useState('');

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;

      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        let final = '';
        let interim = '';
        for (let i = 0; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        setFinalText(final);
        setInterimText(interim);
        onSearch(final);
      };

      recognitionInstance.onend = () => {
        setRecognizing(false);
      };

      setRecognition(recognitionInstance);
    } else {
      console.error('SpeechRecognition is not supported in this browser.');
    }
  }, []);

  const toggleStartStop = () => {
    if (recognition) {
      if (recognizing) {
        recognition.stop();
        setRecognizing(false);
      } else {
        recognition.start();
        setRecognizing(true);
        setFinalText('');
        onSearch('');
        setInterimText('');
      }
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex items-center max-w-lg mx-auto"
    >

      <label className="sr-only">
        Search
      </label>
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

        <button
          type="button"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
          onClick={toggleStartStop}
        >
          {!recognizing ? <Mic />
            : <AudioLines />}

        </button>
      </div>
      <Button
        className="mx-3 flex
              bg-custom-primary
                 hover:bg-orange-600 text-white font-medium py-5 px-4 rounded"
      >
        <SearchIcon />
        <p className="hidden md:block"> Search</p>
      </Button>
    </form>
  );
};

export default FileListCustomSearchForm;
