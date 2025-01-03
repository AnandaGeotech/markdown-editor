/* eslint-disable no-empty */
import { DBSchema, openDB } from 'idb';
import { FileInfo } from '@/types/file.type';

// Define the schema
interface MyDatabase extends DBSchema {
  'my-store': {
    key: string; // Change key type to string for custom ID
    value: FileInfo;
  };
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
}): Promise<string> => {
  const db = await dbPromise;

  if (data.id) {
    // Update existing record if ID is provided
    const existingRecord = await db.get('my-store', data.id);

    if (existingRecord) {
      await db.put('my-store', { ...data, id: data.id });
      return data.id;
    }

    throw new Error(`Record with ID ${data.id} does not exist`);
  } else {
    // Add a new record if ID is not provided
    const customId = generateCustomId();
    const newData = { ...data, id: customId };
    await db.add('my-store', newData);
    return customId;
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
export const getAllDataFromIndexedDB = async (): Promise<FileInfo[]> => {
  const db = await dbPromise;
  return db.getAll('my-store');
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
const getDataFromLocalStorage = (): FileInfo[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
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
}): Promise<string> => {
  const existingData = getDataFromLocalStorage();

  if (data.id) {
    // Update existing record if ID is provided
    const recordIndex = existingData.findIndex((item) => item.id === data.id);

    if (recordIndex >= 0) {
      existingData[recordIndex] = { ...data, id: data.id };
      saveDataToLocalStorage(existingData);
      return data.id;
    }

    throw new Error(`Record with id ${data.id} does not exist`);
  } else {
    // Add a new record if ID is not provided
    const customId = generateCustomId();
    const newData = { ...data, id: customId };
    existingData.push(newData);
    saveDataToLocalStorage(existingData);
    return customId;
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
export const getAllDataFromLocalStorage = async (): Promise<FileInfo[]> => getDataFromLocalStorage();

// Delete a record by ID from localStorage
export const deleteDataFromLocalStorage = async (id: string): Promise<void> => {
  const existingData = getDataFromLocalStorage();
  const updatedData = existingData.filter((item) => item.id !== id);
  saveDataToLocalStorage(updatedData);
};
