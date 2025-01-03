import { createBrowserRouter } from 'react-router-dom';
import { markdownRoutes } from '@/features/markdown/markdown.routes';
// import MarkdownList from '@/features/markdown/pages/MarkdownList';
// import MarkdownLayout from '@/common/layouts/markdown.layout';

const routes = createBrowserRouter([
  {
    path: '',

    children: markdownRoutes,
  },
]);

export default routes;
