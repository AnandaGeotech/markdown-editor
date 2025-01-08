import { TriangleAlert, X } from 'lucide-react';
import { FC, useEffect, useRef } from 'react';
import { IConfirmModalProps } from '@/types/modal.type';

export const ConfirmModal: FC<IConfirmModalProps> = ({
  isOpen,
  closeModal,
  handleSubmitFn,
  name,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on outside click
  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('mousedown', handleOutsideClick);
    } else {
      window.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className={`${
        isOpen ? 'flex' : 'hidden'
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div ref={modalRef} className="relative bg-white rounded-lg shadow dark:bg-gray-700">

          <X
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
            onClick={closeModal}
          />
          <div className="p-4 md:p-5 text-center">
            <TriangleAlert
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
            />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete
              {' '}
              {name}
              .md file?
            </h3>
            <button
              onClick={handleSubmitFn}
              type="button"
              className="bg-custom-primary  hover:bg-orange-600 text-white font-medium py-2 px-4 rounded"
            >
              Yes, I&rsquo;m sure
            </button>
            <button
              onClick={closeModal}
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
