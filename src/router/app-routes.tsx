import { createBrowserRouter } from 'react-router-dom';
import { markdownRoutes } from '@/features/markdown/markdown.routes';

const routes = createBrowserRouter([
  {
    path: '',

    children: markdownRoutes,
  },
]);

export default routes;
