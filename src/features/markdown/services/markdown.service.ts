import { DB_CONNECT } from '../constant/markdown.contant';
import markdownIndexedDBService from './markdown.indexdb.service';

const markdownService = (dbType: string) => {
  if (dbType in DB_CONNECT) {
    return markdownIndexedDBService;
  }

  window.alert('Invalid database type. Please choose either IndexDB or LocalStorage.');
  throw new Error('Invalid database type');
};

export default markdownService;
