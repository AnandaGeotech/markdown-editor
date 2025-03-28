import { FC } from 'react';
import { SearchIcon } from 'lucide-react';
import CustomSearchForm from '@/common/components/custom-search';
import { Button } from '@/common/components/button';
import { ISearchFormProps } from '@/types/common.type';

const FileListCustomSearch: FC<ISearchFormProps> = ({ searchQuery, onSearch }) => (
  <CustomSearchForm
    searchQuery={searchQuery}
    onSearch={onSearch}
  >
    <CustomSearchForm.Input />
    {/* <CustomSearchForm.Button /> */}
    <Button className="mx-3 flex bg-custom-primary hover:bg-orange-600 text-white font-medium py-5 px-4 rounded">
      <SearchIcon />
      <p className="hidden md:block">Search</p>
    </Button>
  </CustomSearchForm>
);

export default FileListCustomSearch;
