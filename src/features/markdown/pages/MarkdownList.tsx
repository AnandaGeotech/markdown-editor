import { FC, Suspense } from 'react';
import useMarkdownList from '../hooks/useMarkdownlist';
import TableFileList from '../components/file-table-list';
import { FILE_TABLE_HEADER_LIST } from '../constant/markdown.contant';
import { ConfirmModal } from '@/common/components/confirm-modal';
import Header from '@/common/components/header';
import TableSkeleton from '@/common/components/table-skeleton';
import FilelistCustomSearch from '@/features/markdown/components/filelist-custom-search';

const MarkdownList: FC = () => {
  const {

    openModalFn,
    setseletedIFileInfo,
    seletedIFileInfo,
    isOpen,
    closeModal,
    handleSubmitFn,
    dataResource,
    handlePageChange,
    currentPage,
    handleSearch,
    searchTerm, handleSelectAll,
    selectedRows, handleRowSelect,
  } = useMarkdownList();

  return (
    <>
      <Header />
      <div className="relative overflow-x-auto  py-10 px-4">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 ">

          <FilelistCustomSearch
            searchQuery={searchTerm}
            onSearch={handleSearch}
          />
        </div>
        <Suspense fallback={<TableSkeleton />}>

          <div className="overflow-x-auto">
            <TableFileList
              handlePageChange={handlePageChange}
              dataResource={dataResource}
              setSelectedItem={setseletedIFileInfo}
              openModalFn={openModalFn}
              currentPage={currentPage}
              selectedRows={selectedRows}
              handleRowSelect={handleRowSelect}
              handleSelectAll={handleSelectAll}
              headers={FILE_TABLE_HEADER_LIST}

            />

          </div>
        </Suspense>
      </div>

      <ConfirmModal
        name={seletedIFileInfo?.name || ''}
        isOpen={isOpen}
        closeModal={closeModal}
        handleSubmitFn={handleSubmitFn}
      />
    </>
  );
};

export default MarkdownList;
