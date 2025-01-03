import { RouteObject } from 'react-router-dom';
import Register from './pages/Register';

export const authenticationRoutes: RouteObject[] = [
  {
    index: true,
    lazy: () => import('./pages/Login'),
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'dynamic/:id',
    element: <Register />,
  },
];
