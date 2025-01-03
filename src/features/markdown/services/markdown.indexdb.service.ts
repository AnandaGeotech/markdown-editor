import MarkdownIt from 'markdown-it';
import {
  addDataToIndexedDB,
  deleteDataFromIndexedDB,
  getAllDataFromIndexedDB,
  getDataFromIndexedDBById,
} from '@/lib/db';
import { FileInfo } from '@/types/file.type';

// Function to get a single file data by ID
const getSingleFileDataFn = async (fileId: string): Promise<FileInfo | undefined> => getDataFromIndexedDBById(fileId);

// Function to get all data from IndexedDB
const getAllDataFromDBFn = async (): Promise<FileInfo[]> => getAllDataFromIndexedDB();

// Function to delete data by ID
const deleteDataFromDBFn = async (id: string) => deleteDataFromIndexedDB(id);

// Function to upsert (add or update) data in IndexedDB
const upsertDataToDBFn = async (payload: FileInfo) => addDataToIndexedDB(payload);

const markdownIndexedDBService = {
  getSingleFileDataFn,
  getAllDataFromDBFn,
  deleteDataFromDBFn,
  upsertDataToDBFn,
};
export default markdownIndexedDBService;
