'use client';
import { FC } from 'react';
import { Pagination as NextUIPagination } from '@nextui-org/react';

interface Props {
  page: number;
  perPage: number;
  setPage: (page: number) => void;
  totalPages: number;
  totalItems: number;
}

export const Pagination: FC<Props> = ({
  page,
  perPage,
  setPage,
  totalPages,
  totalItems,
}) => {
  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
        >
          Previous
        </a>
        <a
          href="#"
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Mostrando{' '}
            <span className="font-medium">{(page - 1) * perPage + 1}</span> a{' '}
            <span className="font-medium">
              {page === totalPages ? totalItems : page * perPage}
            </span>{' '}
            de <span className="font-medium">{totalItems}</span> resultados
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <NextUIPagination
              page={page}
              total={totalPages}
              onChange={setPage}
            />
          </nav>
        </div>
      </div>
    </div>
  );
};
