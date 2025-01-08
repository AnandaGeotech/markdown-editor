/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-vars */
import { FC } from 'react';

import { Link } from 'react-router-dom';
import { TTableFileListProps } from '../type/markdown.type';
import { Button } from '@/common/components/button';
import CustomPagination from '@/common/components/cutom-pagination';
import { GlobalTable } from '@/common/components/global-table';

const TableFileList: FC<TTableFileListProps> = ({
  dataResource,
  currentPage,
  handlePageChange,
  ...restProps
}) => {
  if (!dataResource) {
    throw new Promise(() => {}); // Suspense fallback handling
  }

  const data = dataResource.read();

  return (
    <>

      <GlobalTable
        dataList={data?.data || []}
        {...restProps}
      />

      <div className="mt-5">
        <CustomPagination
          totalPages={data?.pages as number}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>

    </>
  );
};

export default TableFileList;
