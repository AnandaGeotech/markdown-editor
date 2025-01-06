import { IMarkdownJsonApiDBService } from '../type/markdown.type';
import {
  addDataToIndexedDB,
  deleteDataFromIndexedDB,
  getAllDataFromIndexedDB,
  getDataFromIndexedDBById,
  IQueryFile,
} from '@/lib/db';
import { FileInfo, IFileListRes } from '@/types/file.type';

// Function to get a single file data by ID
const getSingleFileDataFn = async (fileId: string): Promise<FileInfo | undefined> => getDataFromIndexedDBById(fileId);

// Function to get all data from IndexedDB
const getAllDataFromDBFn = async (props: IQueryFile): Promise<IFileListRes> => getAllDataFromIndexedDB(props);
// Function to delete data by ID
const deleteDataFromDBFn = async (id: string) => deleteDataFromIndexedDB(id);

// Function to upsert (add or update) data in IndexedDB
const upsertDataToDBFn = async (payload: FileInfo) => addDataToIndexedDB(payload);

const markdownIndexedDBService : IMarkdownJsonApiDBService = {
  getSingleFileDataFn,
  getAllDataFromDBFn,
  deleteDataFromDBFn,
  upsertDataToDBFn,
};
export default markdownIndexedDBService;
