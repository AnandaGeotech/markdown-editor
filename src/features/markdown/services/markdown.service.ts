import { DB_CONNECT, SELECTED_SERVICE_TYPE } from '../constant/markdown.contant';

type IDBType = keyof typeof DB_CONNECT;

const markdownService = () => {
  if (SELECTED_SERVICE_TYPE in DB_CONNECT) {
    return DB_CONNECT[SELECTED_SERVICE_TYPE as IDBType];
  }

  window.alert('Invalid database type. Please choose either IndexDB or LocalStorage.');
  throw new Error('Invalid database type');
};

export default markdownService;
