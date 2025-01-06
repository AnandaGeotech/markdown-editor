import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { SELECTED_SERVICE_TYPE } from '../constant/markdown.contant';
import { useItemContext, validateMarkdown } from '@/common/contexts/markdown.context';
import { useToast } from '@/common/hooks/use-toast';

import markdownService from '@/features/markdown/services/markdown.service';

const { getSingleFileDataFn } = markdownService(SELECTED_SERVICE_TYPE);

const useMarkdownUpsert = () => {
  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  const { id: editFileId } = useParams();
  const { toast } = useToast();
  const {
    setToglleInput, settextFile, setfileName,
    customErrors, setcustomErrors,
  } = useItemContext();

  async function getFileDataFn(fileId:string) {
    try {
      const data = await getSingleFileDataFn(fileId);
      if (!data || !data.id) {
        toast({
          title: 'File not found!',
          variant: 'destructive',
        });
        return;
      }
      settextFile(data.textFile);
      setfileName(data.name);
    } catch (error) {
      toast({
        title: 'File not found!',
        variant: 'destructive',
      });
      navigate(`${pathname}?file-not-found`, { replace: true });
    }
  }

  useEffect(() => {
    setToglleInput(true);
    if (editFileId) {
      getFileDataFn(editFileId);
    } else {
      setfileName('');
      settextFile('# Welcome to Markdown');
    }
  }, [editFileId, setToglleInput, setfileName, settextFile]);

  const [showMobileEditor, setshowMobileEditor] = useState(true);

  const isFileNotFound = search.includes('file-not-found');
  function handleChangeMarkdownFn(e: React.ChangeEvent<HTMLTextAreaElement>) {
    // setcustomErrors({});
    settextFile(e.target.value);
    // const errors = validateMarkdown(e.target.value);
    // setcustomErrors(errors);
  }

  return {
    showMobileEditor,
    setshowMobileEditor,
    isFileNotFound,
    validateMarkdown,
    handleChangeMarkdownFn,
  };
};

export default useMarkdownUpsert;
