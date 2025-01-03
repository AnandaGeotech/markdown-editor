import {
  File, FileChartColumn,
  Menu,
  Trash2Icon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Link, useLocation, useNavigate, useParams,
} from 'react-router-dom';
import { Button } from '@/common/components/button';
import { useToast } from '@/common/hooks/use-toast';
import { DB_TYPE_NAME } from '@/features/markdown/constant/markdown.contant';
import markdownService from '@/features/markdown/services/markdown.service';
import { useItemContext } from '@/common/contexts/markdown.context';
import { ConfirmModal } from '@/common/components/confirm-modal';

const { deleteDataFromDBFn } = markdownService(DB_TYPE_NAME);

export default function MarkdownHeader() {
  const { id: editFileId } = useParams();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const isFileNotFound = search.includes('file-not-found');

  const {
    handleFileUpsertFn,
    fileName,
    setfileName,
    toggleInput,
    setToglleInput,
  } = useItemContext();
  const { toast } = useToast();

  const [showOptionSection, setshowOptionSection] = useState(false);

  useEffect(() => {
    setshowOptionSection(false);

    if (!isFileNotFound) {
      setshowOptionSection(true);
    }
  }, [pathname, isFileNotFound, search]);

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleDelete = async (id: string) => {
    await deleteDataFromDBFn(id);
    closeModal();
    toast({
      title: 'File deleted successfully!',
    });
    navigate('/');
  };
  function handleSubmitFn(): void {
    if (editFileId) {
      handleDelete(editFileId);
    }
  }

  return (
    <>
      <header className="h-[80px] relative bg-[#2c2d31] text-white p-4 flex justify-between items-center">

        <div className="text-xl  font-bold flex gap-1 md:gap-4 items-center">
          <div className="w-[60px] h-[80px] bg-[#35383f] flex items-center justify-center text-9xl absolute top-0 left-0 bottom-0">
            <Link to="/" className="text-[#f2f3f7]">
              <Menu />
            </Link>
          </div>
          {showOptionSection && (
            <div className="ml-16 flex gap-3 items-center">
              {' '}
              <File className="text-[#feffff]" />
              <div className="">
                <p className="text-sm hidden md:block text-[#6f7075]">
                  Document name
                </p>
                <div className="flex items-center gap-1">
                  {toggleInput ? (
                    <p
                      onDoubleClick={() => setToglleInput(false)}
                      onTouchEnd={() => setToglleInput(false)}
                      className="text-sm text-[#f2f3f7]"
                    >
                      {fileName}
                      .md
                    </p>
                  ) : (
                    <input
                      onBlur={() => setToglleInput((prev) => !prev)}
                      value={fileName}
                      onChange={(e) => setfileName(e.target.value.trim())}
                      type="text"
                      className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  )}

                </div>
              </div>
            </div>
          )}
        </div>
        <div className="space-x-4 flex">
          {showOptionSection && pathname.includes('markdown/markdown-') && (
            <div className="flex gap-4 flex-row items-center">
              {pathname.includes('/markdown/markdown-edit') && (
              <Trash2Icon
                onClick={() => {
                  openModal();
                }}
                className="cursor-pointer text-[#7a7d82]"
              />
              )}
              <Button
                onClick={() => handleFileUpsertFn({ fileId: editFileId })}
                className="
                  bg-[#e16841]
                   hover:bg-orange-600 text-white font-medium py-2 px-4 rounded"
              >
                <FileChartColumn />

                <p className="hidden md:block">Save changes</p>
              </Button>
            </div>
          )}

        </div>
      </header>
      <ConfirmModal
        name={fileName}
        isOpen={isOpen}
        closeModal={closeModal}
        handleSubmitFn={handleSubmitFn}
        key="header"
      />
    </>
  );
}
