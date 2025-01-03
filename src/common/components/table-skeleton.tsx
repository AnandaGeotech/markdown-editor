import React from 'react';

const TableSkeleton: React.FC = () => (
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th className="px-6 py-3">Name</th>
        <th className="px-6 py-3">Readme File</th>
        <th className="px-6 py-3 w-1">Action</th>
      </tr>
    </thead>
    <tbody>
      {Array.from({ length: 5 }).map((_, index) => (
        <tr
          key={index}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <td className="px-6 py-4">
            <div className="h-4 bg-gray-300 rounded dark:bg-gray-700 w-3/4 animate-pulse" />
          </td>
          <td className="px-6 py-4">
            <div className="h-4 bg-gray-300 rounded dark:bg-gray-700 w-full animate-pulse" />
          </td>
          <td className="px-6 py-4 flex gap-3">
            <div className="h-8 bg-gray-300 rounded dark:bg-gray-700 w-12 animate-pulse" />
            <div className="h-8 bg-gray-300 rounded dark:bg-gray-700 w-16 animate-pulse" />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TableSkeleton;
