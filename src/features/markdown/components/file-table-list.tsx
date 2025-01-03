import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/common/components/button';
import { FileInfo } from '@/types/file.type';

interface TableFileListProps {
  // eslint-disable-next-line no-unused-vars
  setseletedFileInfo: (file: FileInfo) => void; // Function to set selected file info
  openModal: () => void; // Function to open the modal
  dataResource: {
    read: () => FileInfo[]; // Function to read data, always returning FileInfo[]
  } | null; // dataResource can be null
}
const TableFileList :FC<TableFileListProps> = ({
  setseletedFileInfo, openModal, dataResource,
}) => {
  if (!dataResource) {
    // If dataResource is null, throw a promise to trigger Suspense or show a fallback
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    throw new Promise(() => {}); // Suspense fallback handling
  }

  const data = dataResource.read();
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th className="px-6 py-3">Name</th>
          <th className="px-6 py-3">Readme File</th>
          <th className="px-6 py-3 w-1">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr
            key={user.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td className="flex items-center px-6 py-4">
              <div className="ps-3">
                <div className="text-base font-semibold">{user.name}</div>
              </div>
            </td>
            <td className="px-6 py-4">
              {user.textFile.slice(0, 100)}
              {' '}
              {user.textFile.length > 100 ? '...' : ''}
            </td>
            <td className="flex gap-3 px-3">

              <Link to={`/markdown/markdown-edit/${user.id}`}>
                <Button
                  className="flex

                 hover:bg-gray-100 bg-white font-medium py-2 px-4 rounded"
                >

                  <p className=""> Edit</p>
                </Button>
              </Link>
              <Button
                className="bg-[#e16841]
         hover:bg-orange-600 text-white font-medium py-2 px-4 rounded"
                onClick={() => {
                  setseletedFileInfo(user);
                  openModal();
                }}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableFileList;
