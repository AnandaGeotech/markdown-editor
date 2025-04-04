import {
  addDataToApiServer,
  deleteDataFromApiServerById,
  getAllDataFromApiServer,
  getDataFromApiServerById,
  patchDataInApiServerById,
} from '@/lib/db';
import {
  IFileInfo, IFileListRes, IFileUpsert, IQueryFile,
} from '@/types/file.type';

// Function to get a single file data by ID
const getSingleFileDataFn = async (fileId: string): Promise<IFileInfo | undefined> => getDataFromApiServerById(fileId);

// Function to get all data from JsonApiDB
const getAllDataFromDBFn = async (props:IQueryFile): Promise<IFileListRes> => getAllDataFromApiServer(props);

// Function to delete data by ID
const deleteDataFromDBFn = async (id: string) => deleteDataFromApiServerById(id);

// Function to upsert (add or update) data in JsonApiDB
const upsertDataToDBFn = async (payload: IFileUpsert) => {
  if (payload.id) {
    return patchDataInApiServerById(payload.id, payload);
  }
  const data = addDataToApiServer(payload);
  return data;
};

const markdownJsonApiDBService = {
  getSingleFileDataFn,
  getAllDataFromDBFn,
  deleteDataFromDBFn,
  upsertDataToDBFn,
};
export default markdownJsonApiDBService;
