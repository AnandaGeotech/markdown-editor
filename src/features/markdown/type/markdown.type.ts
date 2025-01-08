/* eslint-disable no-unused-vars */
import { Dispatch, ReactNode, SetStateAction } from 'react';

import {
  IFileInfo, IFileListRes, IFileUpsert, IQueryFile,
} from '@/types/file.type';
import { IGlobalTableProps } from '@/types/common.type';

export interface MarkdownPreviewProps {
    content: string; // Markdown content passed as a prop
  }
export interface IMarkdownJsonApiDBService {
    getSingleFileDataFn: (fileId: string) => Promise<IFileInfo | undefined>;
    getAllDataFromDBFn: (props: IQueryFile) => Promise<IFileListRes>;
    deleteDataFromDBFn: (id: string) => Promise<void>;
    upsertDataToDBFn: (payload: IFileUpsert) => Promise<IFileInfo | void>;
  }

export type TMarkdownError = {
    line: number;
    message: string;
  };

export interface IMarkdownContextProps {
    toggleInput: boolean;
    setToglleInput: Dispatch<SetStateAction<boolean>>;
    fileName: string;
    setfileName: Dispatch<SetStateAction<string>>;
    handleFileUpsertFn: (
      // eslint-disable-next-line no-unused-vars
      data: Partial<IFileInfo> & { fileId?: string }
    ) => Promise<void>;
    textFile: string;
    settextFile: Dispatch<SetStateAction<string>>;
    customErrors: TMarkdownError[];
    setcustomErrors: Dispatch<SetStateAction<TMarkdownError[]>>;
    serviceMethods: IMarkdownJsonApiDBService
  }

export interface IMarkdownProviderProps {
    children: ReactNode;
  }

export interface ICopyOptionProps {
      textFile: string;
      name:string
  }

export type TTableFileListProps = Omit<IGlobalTableProps<IFileInfo>, 'dataList'> &{
    handlePageChange: (page: number) => void;
    currentPage: number;
  dataResource: {
    read: () => IFileListRes;
  } | null;
}
// export interface ITableFileListProps extends IGlobalTableProps<IFileInfo>{
//   handlePageChange: (page: number) => void;
//     currentPage: number;
//   dataResource: {
//     read: () => IFileListRes;
//   } | null;
//   }
