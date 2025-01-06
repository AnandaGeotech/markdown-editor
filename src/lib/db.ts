/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
import { DBSchema, openDB } from 'idb';
import { FileInfo, IFileListRes } from '@/types/file.type';

// Define the schema
interface MyDatabase extends DBSchema {
  'my-store': {
    key: string; // Change key type to string for custom ID
    value: FileInfo;
  };
}

export interface IQueryFile{
  currentPage?: number;
    limitperPage?: number;
    searchTerm?: string;
}

export async function clearStore() {
  const db = await openDB<MyDatabase>('my-database', 1);

  try {
    await db
      .transaction('my-store', 'readwrite')
      .objectStore('my-store')
      .clear();
  } catch (error) {
  }
}
// Open the database
const dbPromise = openDB<MyDatabase>('my-database', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('my-store')) {
      db.createObjectStore('my-store', { keyPath: 'id', autoIncrement: true });
    }
  },
});
function generateCustomId() {
  const timestamp = Date.now(); // Current timestamp in milliseconds
  const randomSuffix = Math.floor(Math.random() * 1000); // Random number (0-999)
  return `${timestamp}${randomSuffix}`;
}

// Add or update data in IndexedDB
export const addDataToIndexedDB = async (data: {
  name: string;
  textFile: string;
  id?: string;
}): Promise<FileInfo> => {
  const db = await dbPromise;

  if (data.id) {
    // Update existing record if ID is provided
    const existingRecord = await db.get('my-store', data.id);

    if (existingRecord) {
      const updatedData = { ...data, id: data.id };
      await db.put('my-store', updatedData);
      return updatedData;
    }

    throw new Error(`Record with ID ${data.id} does not exist`);
  } else {
    // Add a new record if ID is not provided
    const customId = generateCustomId();
    const newData = { ...data, id: customId };
    await db.add('my-store', newData);
    return newData;
  }
};

// Get a single record by ID from IndexedDB
export const getDataFromIndexedDBById = async (
  id: string,
): Promise<FileInfo | undefined> => {
  const db = await dbPromise;
  return db.get('my-store', id);
};

// Get all records from IndexedDB
export const getAllDataFromIndexedDB = async (props: IQueryFile):Promise<IFileListRes > => {
  const db = await dbPromise;
  const retrievedData = await db.getAll('my-store');
  return { data: retrievedData };
};

// Delete a record by ID from IndexedDB
export const deleteDataFromIndexedDB = async (id: string): Promise<void> => {
  const db = await dbPromise;
  try {
    await db.delete('my-store', id);
  } catch (error) {
    console.error(`Failed to delete record with ID ${id}:`, error);
  }
};

// Key for localStorage
const STORAGE_KEY = 'my-store';

// Utility to get data from localStorage
const getDataFromLocalStorage = async (): Promise<IFileListRes > => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? { data: JSON.parse(data) } : { data: [] };
};

// Utility to save data to localStorage
const saveDataToLocalStorage = (data: FileInfo[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Clear the entire store in localStorage
export const clearStoreInLocalStorage = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

// Add or update data in localStorage
export const addDataToLocalStorage = async (data: {
  name: string;
  textFile: string;
  id?: string;
}): Promise<FileInfo> => {
  const existingData = getDataFromLocalStorage();

  if (data.id) {
    // Update existing record if ID is provided
    const recordIndex = existingData.findIndex((item) => item.id === data.id);

    if (recordIndex >= 0) {
      existingData[recordIndex] = { ...data, id: data.id };
      saveDataToLocalStorage(existingData);
      return existingData[recordIndex];
    }

    throw new Error(`Record with id ${data.id} does not exist`);
  } else {
    // Add a new record if ID is not provided
    const customId = generateCustomId();
    const newData = { ...data, id: customId };
    existingData.push(newData);
    saveDataToLocalStorage(existingData);
    return newData;
  }
};

// Get a single record by ID from localStorage
export const getDataFromLocalStorageById = async (
  id: string,
): Promise<FileInfo | undefined> => {
  const existingData = getDataFromLocalStorage();
  return existingData.find((item) => item.id === id);
};

// Get all records from localStorage
export const getAllDataFromLocalStorage = async (): Promise<IFileListRes > => getDataFromLocalStorage();

// Delete a record by ID from localStorage
export const deleteDataFromLocalStorage = async (id: string): Promise<void> => {
  const existingData = getDataFromLocalStorage();
  const updatedData = existingData.datafilter((item) => item.id !== id);
  saveDataToLocalStorage(updatedData);
};

const API_BASE_URL = 'http://localhost:3000'; // Replace with your actual base URL

// Add data to the API server
export const addDataToApiServer = async (data: { name: string; textFile: string }): Promise<FileInfo> => {
  const response = await fetch(`${API_BASE_URL}/files`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to add new record.');
  }

  return response.json();
};

// Get all data from the API server
export const getAllDataFromApiServer = async (props: IQueryFile): Promise<IFileListRes> => {
  const { currentPage, limitperPage = 5, searchTerm } = props;

  // Construct query parameters
  const queryParams = new URLSearchParams();

  if (currentPage) {
    queryParams.append('_page', currentPage.toString());
  }
  if (limitperPage) {
    queryParams.append('_per_page', limitperPage.toString());
  }
  if (searchTerm) {
    queryParams.append('q', searchTerm); // Assuming the API supports `q` for search
  }

  const url = `${API_BASE_URL}/files?${queryParams.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch records.');
  }
  return response.json();
};
// Get data by ID from the API server
export const getDataFromApiServerById = async (id: string): Promise<FileInfo | undefined> => {
  const response = await fetch(`${API_BASE_URL}/files/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch record with ID: ${id}`);
  }
  return response.json();
};

// Update data by ID in the API server
export const updateDataInApiServerById = async (
  id: string,
  data: { name: string; textFile: string },
): Promise<FileInfo> => {
  const response = await fetch(`${API_BASE_URL}/files/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to update record with ID: ${id}`);
  }
  return response.json();
};

// Partially update data by ID in the API server
export const patchDataInApiServerById = async (
  id: string,
  data: Partial<{ name: string; textFile: string }>,
): Promise<FileInfo> => {
  const response = await fetch(`${API_BASE_URL}/files/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to patch record with ID: ${id}`);
  }
  return response.json();
};

// Delete data by ID in the API server
export const deleteDataFromApiServerById = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/files/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete record with ID: ${id}`);
  }
};

// Get data with query parameters from the API server
export const getDataWithConditionsFromApiServer = async (conditions: string): Promise<FileInfo[]> => {
  const response = await fetch(`${API_BASE_URL}/files?${conditions}`);
  if (!response.ok) {
    throw new Error('Failed to fetch records with conditions.');
  }
  return response.json();
};

// Get paginated data from the API server
export const getPaginatedDataFromApiServer = async (
  page: number,
  perPage: number,
): Promise<FileInfo[]> => {
  const response = await fetch(`${API_BASE_URL}/files?_page=${page}&_per_page=${perPage}`);
  if (!response.ok) {
    throw new Error('Failed to fetch paginated records.');
  }
  return response.json();
};

// Get sorted data from the API server
export const getSortedDataFromApiServer = async (sortField: string): Promise<FileInfo[]> => {
  const response = await fetch(`${API_BASE_URL}/files?_sort=${sortField}`);
  if (!response.ok) {
    throw new Error('Failed to fetch sorted records.');
  }
  return response.json();
};
