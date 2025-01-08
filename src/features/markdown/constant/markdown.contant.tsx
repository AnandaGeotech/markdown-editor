import { Link } from 'react-router-dom';
import markdownIndexedDBService from '../services/markdown.indexdb.service';
import markdownJsonApiDBService from '../services/markdown.jsonapi.service';
import markdownLocalStorageService from '../services/markdown.localStorage.service';
import { IMarkdownJsonApiDBService } from '../type/markdown.type';
import { IFileInfo } from '@/types/file.type';
import { ITableCustomDesignProps } from '@/types/common.type';
import { Button } from '@/common/components/button';

export const SELECTED_SERVICE_TYPE = 'LOCALSTROAGE';
export const DB_TYPE_JSON_SERVER = 'JSON_SERVER';
export const DB_TYPE_INDEXDB = 'INDEXDB';
export const DB_TYPE_LOCALSTROAGE = 'LOCALSTROAGE';
export const COPY_TYPE_HTML = 'HTML';
export const COPY_TYPE_MARKDOWN = 'MARKDOWN';

export const DB_CONNECT: Record<string, IMarkdownJsonApiDBService> = {
  [DB_TYPE_INDEXDB]: markdownIndexedDBService,
  [DB_TYPE_LOCALSTROAGE]: markdownLocalStorageService,
  [DB_TYPE_JSON_SERVER]: markdownJsonApiDBService,
};

export const FILE_TABLE_HEADER_LIST = [
  {
    key: 'name',
    label: 'File Name',
    customDesign: (data: ITableCustomDesignProps<IFileInfo>) => (
      <Link className="text-custom-primary " to={`/markdown/markdown-edit/${data.item.id}`}>
        {data.item.name}
      </Link>
    ),
  },
  {
    key: 'size',
    label: 'File Size',
    customDesign: (data: ITableCustomDesignProps<IFileInfo>) => <span>{data.item.textFile}</span>,
  },
  {
    alignEnd: true,
    key: 'actions',
    label: 'Actions',
    customDesign: ({ item, setSelectedItem, openModalFn }: ITableCustomDesignProps<IFileInfo>) => (
      <div className="flex gap-3">
        <Link to={`/markdown/markdown-edit/${item.id}`}>
          <Button className="flex hover:bg-gray-100 bg-white font-medium py-2 px-4 rounded">
            <p className=""> Edit</p>
          </Button>
        </Link>
        <Button
          className="bg-custom-primary  hover:bg-orange-600 text-white font-medium py-2 px-4 rounded"
          onClick={() => {
            if (setSelectedItem) {
              setSelectedItem(item);
            }
            if (openModalFn) {
              openModalFn();
            }
          }}
        >
          Delete
        </Button>
      </div>
    ),
  },
];
