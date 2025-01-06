import markdownIndexedDBService from '../services/markdown.indexdb.service';
import markdownJsonApiDBService from '../services/markdown.jsonapi.service';
import markdownLocalStorageService from '../services/markdown.localStorage.service';

export const DB_TYPE_JSON_SERVER = 'JSONSERVER';
export const SELECTED_SERVICE_TYPE = 'INDEXDB';
export const DB_TYPE_INDEXDB = 'INDEXDB';
export const DB_TYPE_LOCALSTROAGE = 'LOCALSTROAGE';
export const COPY_TYPE_HTML = 'HTML';
export const COPY_TYPE_MARKDOWN = 'MARKDOWN';

export const DB_CONNECT = {
  [DB_TYPE_INDEXDB]: markdownIndexedDBService,
  [DB_TYPE_LOCALSTROAGE]: markdownLocalStorageService,
  [DB_TYPE_JSON_SERVER]: markdownJsonApiDBService,
}as const;
