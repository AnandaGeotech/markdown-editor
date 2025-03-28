/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from 'react';
import markdownService from '../services/markdown.service';
import { useToast } from '@/common/hooks/use-toast';
import { IFileInfo, IFileListRes } from '@/types/file.type';
import { createResource, delay } from '@/lib/utils';
import useDebounce from '@/common/hooks/use-debounce';

const { getAllDataFromDBFn, deleteDataFromDBFn } = markdownService();

const useMarkdownList = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const [limitperPage, setlimitperPage] = useState(3);
  const [searchTerm, setsearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce for 500ms

  const openModalFn = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const [currentPage, setCurrentPage] = useState(1);
  const [listData, setlistData] = useState<IFileListRes|null>(null);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const [dataResource, setdataResource] = useState< {
    read:() => IFileListRes; // Function to read data, always returning IFileInfo[]
      } | null>(null);

  const loadData = async () => {
    setdataResource(null);
    await delay(1000);

    const allDataPromise = getAllDataFromDBFn({
      currentPage, limitperPage, searchTerm: debouncedSearchTerm,
    });
    allDataPromise.then((res) => setlistData(res));

    const resource = createResource(() => allDataPromise);
    setdataResource(resource);
  };
  const [seletedIFileInfo, setseletedIFileInfo] = useState<IFileInfo | null>(null);
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
    if (seletedIFileInfo && seletedIFileInfo.id) {
      handleDelete(seletedIFileInfo.id);
    }
  }, [seletedIFileInfo, handleDelete]);

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

  // State for selected rows
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Handler for individual row selection
  const handleRowSelect = (id: string) => {
    setSelectedRows((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  // Handler for "select all" functionality
  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      const allIds = listData?.data?.map((IFileInfo) => IFileInfo.id) || [];
      if (allIds?.length > 0) {
        setSelectedRows(new Set(allIds as string[]));
      }
    } else {
      setSelectedRows(new Set());
    }
  };

  return {

    openModalFn,
    setseletedIFileInfo,
    seletedIFileInfo,
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
    handleSelectAll,
    selectedRows,
    handleRowSelect,
  };
};

export default useMarkdownList;
