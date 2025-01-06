/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from 'react';
import markdownService from '../services/markdown.service';
import { SELECTED_SERVICE_TYPE } from '../constant/markdown.contant';
import { useToast } from '@/common/hooks/use-toast';
import { FileInfo, IFileListRes } from '@/types/file.type';
import { createResource, delay } from '@/lib/utils';
import useDebounce from '@/common/hooks/use-debounce';

const { getAllDataFromDBFn, deleteDataFromDBFn } = markdownService(SELECTED_SERVICE_TYPE);

const useMarkdownList = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const [limitperPage, setlimitperPage] = useState(3);
  const [searchTerm, setsearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce for 500ms

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const [dataResource, setdataResource] = useState< {
    read:() => IFileListRes; // Function to read data, always returning FileInfo[]
      } | null>(null);

  const loadData = async () => {
    setdataResource(null);
    await delay(1000);

    const allDataPromise = getAllDataFromDBFn({
      currentPage, limitperPage, searchTerm: debouncedSearchTerm,
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleSearch = (query: string) => {
    setdataResource(null);
    setsearchTerm(query);
  };
  useEffect(() => {
    loadData();
  }, [debouncedSearchTerm, currentPage]);
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
    searchTerm,
    setsearchTerm,
    limitperPage,
    setlimitperPage,

  };
};

export default useMarkdownList;
