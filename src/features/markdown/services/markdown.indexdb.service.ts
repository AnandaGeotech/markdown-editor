import {
  addDataToIndexedDB,
  deleteDataFromIndexedDB,
  getAllDataFromIndexedDB,
  getDataFromIndexedDBById,
} from '@/lib/db';
import {
  IFileInfo, IFileListRes, IFileUpsert, IQueryFile,
} from '@/types/file.type';

// Function to get a single file data by ID
const getSingleFileDataFn = async (fileId: string): Promise<IFileInfo | undefined> => getDataFromIndexedDBById(fileId);

// Function to get all data from IndexedDB
const getAllDataFromDBFn = async (props: IQueryFile): Promise<IFileListRes> => getAllDataFromIndexedDB(props);
// Function to delete data by ID
const deleteDataFromDBFn = async (id: string) => deleteDataFromIndexedDB(id);

// Function to upsert (add or update) data in IndexedDB
const upsertDataToDBFn = async (payload:IFileUpsert) => addDataToIndexedDB(payload);

const markdownIndexedDBService = {
  getSingleFileDataFn,
  getAllDataFromDBFn,
  deleteDataFromDBFn,
  upsertDataToDBFn,
};
export default markdownIndexedDBService;
