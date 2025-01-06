import { FC, Suspense } from 'react';
import useMarkdownList from '../hooks/useMarkdownlist';
import TableFileList from '../components/file-table-list';
import { ConfirmModal } from '@/common/components/confirm-modal';
import Header from '@/common/components/header';
import TableSkeleton from '@/common/components/table-skeleton'; import CustomPagination from '@/common/components/cutom-pagination';
import CustomSearchForm from '@/common/components/custom-search';

const MarkdownList: FC = () => {
  const {

    openModal,
    setseletedFileInfo,
    seletedFileInfo,
    isOpen,
    closeModal,
    handleSubmitFn,
    dataResource,
    handlePageChange,
    currentPage, setCurrentPage,
    handleSearch,
  } = useMarkdownList();

  return (
    <>
      <Header />
      <div className="relative overflow-x-auto  py-10 px-4">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 ">

          <CustomSearchForm onSearch={handleSearch} />
        </div>
        <Suspense fallback={<TableSkeleton />}>

          <div className="overflow-x-auto">
            <TableFileList
              dataResource={dataResource}
              setseletedFileInfo={setseletedFileInfo}
              openModal={openModal}
            />
            <div className="mt-5">

              <CustomPagination totalPages={10} currentPage={currentPage} onPageChange={handlePageChange} setCurrentPage={setCurrentPage} />

            </div>
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
