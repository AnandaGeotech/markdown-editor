import { DB_CONNECT } from '../constant/markdown.contant';

type DBType = keyof typeof DB_CONNECT;
const markdownService = (dbType: string) => {
  if (dbType in DB_CONNECT) {
    return DB_CONNECT[dbType as DBType];
  }

  window.alert('Invalid database type. Please choose either IndexDB or LocalStorage.');
  throw new Error('Invalid database type');
};

export default markdownService;
