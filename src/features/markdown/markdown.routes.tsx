import { RouteObject } from 'react-router-dom';
import MarkdownEditor from './pages/MarkdownEditor';
import MarkdownList from './pages/MarkdownList';
import MarkdownLayout from '@/common/layouts/markdown.layout';

export const markdownRoutes: RouteObject[] = [
  {
    index: true,
    element: (

      <MarkdownList />

    ),
  },
  {
    element: (

      <MarkdownLayout />

    ),
    path: 'markdown',
    children: [
      {
        path: 'markdown-add',
        element: (

          <MarkdownEditor />

        ),
      },
      {
        path: 'markdown-edit/:id',
        element: (

          <MarkdownEditor />

        ),
      },
    ],
  },
];
