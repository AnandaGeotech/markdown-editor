import {
  addDataToLocalStorage,
  deleteDataFromLocalStorage,
  getAllDataFromLocalStorage,
  getDataFromLocalStorageById,
} from '@/lib/db';
import { IFileInfo, IFileListRes, IFileUpsert } from '@/types/file.type';

async function getSingleFileDataFn(fileId: string): Promise<IFileInfo | undefined> {
  return getDataFromLocalStorageById(fileId);
}

async function getAllDataFromDBFn(): Promise<IFileListRes > {
  return getAllDataFromLocalStorage();
}

async function deleteDataFromDBFn(id: string) {
  return deleteDataFromLocalStorage(id);
}

async function upsertDataToDBFn(payload: IFileUpsert) {
  return addDataToLocalStorage(payload);
}
const markdownLocalStorageService = {

  getSingleFileDataFn,
  getAllDataFromDBFn,
  deleteDataFromDBFn,
  upsertDataToDBFn,
};

export default markdownLocalStorageService;
