import {
  addDataToLocalStorage,
  deleteDataFromLocalStorage,
  getAllDataFromLocalStorage,
  getDataFromLocalStorageById,
} from '@/lib/db';
import { FileInfo } from '@/types/file.type';

async function getSingleFileDataFn(fileId: string): Promise<FileInfo | undefined> {
  return getDataFromLocalStorageById(fileId);
}

async function getAllDataFromDBFn(): Promise<FileInfo[]> {
  return getAllDataFromLocalStorage();
}

async function deleteDataFromDBFn(id: string) {
  return deleteDataFromLocalStorage(id);
}

async function upsertDataToDBFn(payload: FileInfo) {
  return addDataToLocalStorage(payload);
}
const markdownLocalStorageService = {

  getSingleFileDataFn,
  getAllDataFromDBFn,
  deleteDataFromDBFn,
  upsertDataToDBFn,
};

export default markdownLocalStorageService;
