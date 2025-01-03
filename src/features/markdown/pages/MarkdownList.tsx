import { FC, Suspense } from 'react';
import useMarkdownList from '../hooks/useMarkdownlist';
import TableFileList from '../components/file-table-list';
import { ConfirmModal } from '@/common/components/confirm-modal';
import Header from '@/common/components/header';
import TableSkeleton from '@/common/components/table-skeleton';

const MarkdownList: FC = () => {
  const {

    openModal,
    setseletedFileInfo,
    seletedFileInfo,
    isOpen,
    closeModal,
    handleSubmitFn,
    dataResource,
  } = useMarkdownList();

  return (
    <>
      <Header />
      <div className="relative overflow-x-auto  py-10 px-4">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 ">
          <div className="relative">
            <input
              type="text"
              id="table-search-users"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for filename"
            />
          </div>
        </div>
        <Suspense fallback={<TableSkeleton />}>

          <div className="overflow-x-auto">
            <TableFileList
              dataResource={dataResource}
              setseletedFileInfo={setseletedFileInfo}
              openModal={openModal}
            />

          </div>
        </Suspense>
      </div>

      <ConfirmModal
        name={seletedFileInfo?.name || ''}
        isOpen={isOpen}
        closeModal={closeModal}
        handleSubmitFn={handleSubmitFn}
      />
    </>
  );
};

export default MarkdownList;
