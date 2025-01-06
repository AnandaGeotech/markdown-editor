export interface FileInfo {
  id?: string; // Required field
  name: string;
  textFile: string; // Plain text content as a string
}

export interface IFileListRes {
  data: FileInfo[];
  first?: number;
  items?: number;
  last?: number;
  next?: number;
  pages?: number;
  prev?: null | number;
}
