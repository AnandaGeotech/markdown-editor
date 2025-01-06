/* eslint-disable no-unused-vars */
import { IQueryFile } from '@/lib/db';
import { FileInfo, IFileListRes } from '@/types/file.type';

export interface MarkdownPreviewProps {
    content: string; // Markdown content passed as a prop
  }
export interface IMarkdownJsonApiDBService {
    getSingleFileDataFn: (fileId: string) => Promise<FileInfo | undefined>;
    getAllDataFromDBFn: (props: IQueryFile) => Promise<IFileListRes>;
    deleteDataFromDBFn: (id: string) => Promise<void>;
    upsertDataToDBFn: (payload: FileInfo) => Promise<FileInfo | void>;
  }
