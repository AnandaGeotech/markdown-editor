import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createResource = <T, >(fetchFn: () => Promise<T>) => {
  let status = 'pending';
  let result: T;

  const suspender = fetchFn().then(
    (res) => {
      status = 'success';
      result = res;
    },
    (err) => {
      status = 'error';
      result = err;
    },
  );

  return {
    read() {
      if (status === 'pending') throw suspender;
      if (status === 'error') throw result;
      return result;
    },
  };
};

export const delay = (ms: number): Promise<void> => new Promise((resolve) => { setTimeout(resolve, ms); });
