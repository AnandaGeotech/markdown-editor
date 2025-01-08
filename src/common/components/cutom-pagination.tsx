/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/common/components/pagination';
import { PaginationProps } from '@/types/common.type';

const CustomPagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    onPageChange?.(page);
  };

  const renderPageLinks = () => {
    const links = [];

    // Always show the first two pages
    for (let i = 1; i <= 2; i++) {
      links.push(
        <PaginationItem key={i}>
          <PaginationLink
            size=""
            href="#"
            isActive={currentPage === i}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    // Add ellipsis if currentPage is far from the beginning
    if (currentPage > 4) {
      links.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    // Show the current page and nearby pages
    const start = Math.max(3, currentPage - 1);
    const end = Math.min(totalPages - 2, currentPage + 1);

    for (let i = start; i <= end; i++) {
      links.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            size=""
            isActive={currentPage === i}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    // Add ellipsis if currentPage is far from the end
    if (currentPage < totalPages - 3) {
      links.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    // Always show the last two pages
    for (let i = totalPages - 1; i <= totalPages; i++) {
      if (i > 2) {
        links.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              size=""
              isActive={currentPage === i}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    }

    return links;
  };

  return (
    <ShadcnPagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            size=""
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage - 1);
            }}
            isActive={currentPage === 1}
          >
            Previous
          </PaginationPrevious>
        </PaginationItem>
        {renderPageLinks()}
        <PaginationItem>
          <PaginationNext
            href="#"
            size=""
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage + 1);
            }}
            isActive={currentPage === totalPages}
          >
            Next
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
};

export default CustomPagination;
