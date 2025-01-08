import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/common/components/table';
import { IGlobalTableProps, ITableCustomDesignProps } from '@/types/common.type';

export function GlobalTable<T extends { id: string }>({
  dataList,
  headers,
  selectedRows = new Set(),
  handleRowSelect,
  handleSelectAll,
  setSelectedItem,
  openModalFn,
  showCheckboxes = false,
  caption,
}: IGlobalTableProps<T>) {
  const isAllSelected = dataList ? selectedRows.size === dataList.length : false;
  console.log(headers, 'headers');
  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}

      <TableHeader>
        <TableRow>
          {showCheckboxes && (
            <TableHead className="w-[50px]">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={(e) => handleSelectAll && handleSelectAll(e.target.checked)}
                className="cursor-pointer"
              />
            </TableHead>
          )}
          {headers.map((header) => (
            <TableHead style={header?.alignEnd ? { width: '1px' } : undefined} key={header.key as string}>{header.label}</TableHead>
          ))}

        </TableRow>
      </TableHeader>
      <TableBody>
        {dataList?.map((item) => (
          <TableRow key={item.id}>
            {showCheckboxes && (
              <TableCell>
                <input
                  type="checkbox"
                  checked={selectedRows.has(item.id)}
                  onChange={() => handleRowSelect && handleRowSelect(item.id)}
                  className="cursor-pointer"
                />
              </TableCell>
            )}
            {headers.map((header) => (
              <TableCell key={item.id}>
                {header.customDesign ? (
                  header.customDesign({
                    item,
                    dataList,
                    selectedRows,
                    handleRowSelect,
                    handleSelectAll,
                    setSelectedItem,
                    openModalFn,
                  } as ITableCustomDesignProps<T>)
                ) : (
                  <span className="font-medium">{String(item[header.key as keyof T])}</span>
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
