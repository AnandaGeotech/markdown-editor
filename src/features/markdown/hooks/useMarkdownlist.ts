import { useCallback, useEffect, useState } from 'react';
import markdownService from '../services/markdown.service';
import { SELECTED_SERVICE_TYPE } from '../constant/markdown.contant';
import { useToast } from '@/common/hooks/use-toast';
import { FileInfo } from '@/types/file.type';
import { createResource, delay } from '@/lib/utils';

const { getAllDataFromDBFn, deleteDataFromDBFn } = markdownService(SELECTED_SERVICE_TYPE);

const useMarkdownList = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const [dataResource, setdataResource] = useState< {
    read:() => FileInfo[]; // Function to read data, always returning FileInfo[]
      } | null>(null);

  const loadData = async () => {
    await delay(1000);

    const allDataPromise : Promise<FileInfo[]> = getAllDataFromDBFn();
    allDataPromise.then((res) => {
      console.log(res, 'allDataPromise', SELECTED_SERVICE_TYPE);
    });
    const resource = createResource(() => allDataPromise);

    setdataResource(resource);
  };
  const [seletedFileInfo, setseletedFileInfo] = useState<FileInfo | null>(null);
  const handleDelete = async (id: string) => {
    await deleteDataFromDBFn(id);
    setdataResource(null);
    closeModal();
    toast({
      title: 'File deleted successfully!',
    });
    loadData();
  };
  // Load data from IndexedDB

  const handleSubmitFn = useCallback(() => {
    if (seletedFileInfo && seletedFileInfo.id) {
      handleDelete(seletedFileInfo.id);
    }
  }, [seletedFileInfo, handleDelete]);

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page: number) => {
    console.log('Current Page:', page);
  };
  const handleSearch = (query: string) => {
    console.log('Search Query:', query);
    // Add your search logic here
  };
  useEffect(() => {
    loadData();
  }, []);
  return {

    openModal,
    setseletedFileInfo,
    seletedFileInfo,
    isOpen,
    closeModal,
    handleSubmitFn,
    dataResource,
    setdataResource,
    handlePageChange,
    currentPage,
    setCurrentPage,
    handleSearch,
  };
};

export default useMarkdownList;
