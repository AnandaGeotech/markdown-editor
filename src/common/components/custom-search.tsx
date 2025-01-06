import React, { useState } from 'react';
import { FileIcon, Mic, SearchIcon } from 'lucide-react';
import { Button } from './button';

interface SearchFormProps {
  onSearch: (query: string) => void;
}

const CustomSearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex items-center max-w-lg mx-auto"
    >
      <label htmlFor="voice-search" className="sr-only">
        Search
      </label>
      <div className="relative w-[600px]">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
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
          onClick={() => console.log('Voice search button clicked')}
        >
          <Mic />

        </button>
      </div>
      <Button
        className="mx-3 flex
              bg-[#e16841]
                 hover:bg-orange-600 text-white font-medium py-5 px-4 rounded"
      >
        <SearchIcon />
        <p className="hidden md:block"> Search</p>
      </Button>
    </form>
  );
};

export default CustomSearchForm;
