import { useCallback, useEffect, useState } from 'react';
import markdownService from '../services/markdown.service';
import { DB_TYPE_NAME } from '../constant/markdown.contant';
import { useToast } from '@/common/hooks/use-toast';
import { FileInfo } from '@/types/file.type';
import { createResource, delay } from '@/lib/utils';

const { getAllDataFromDBFn, deleteDataFromDBFn } = markdownService(DB_TYPE_NAME);

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
  };
};

export default useMarkdownList;
