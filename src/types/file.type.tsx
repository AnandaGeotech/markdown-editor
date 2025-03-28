import { DBSchema } from 'idb';

export interface IFileInfo {
  id: string;
  name: string;
  textFile: string;
}
export interface IFileUpsert {
  name: string;
  textFile: string;
  id?: string;

}

export interface IFileListRes {
  data: IFileInfo[];
  first?: number;
  items?: number;
  last?: number;
  next?: number;
  pages?: number;
  prev?: null | number;
}

// Define the schema
export interface IMyDatabase extends DBSchema {
  'my-store': {
    key: string; // Change key type to string for custom ID
    value: IFileInfo;
  };
}

export interface IQueryFile{
  currentPage?: number;
    limitperPage?: number;
    searchTerm?: string;
}
