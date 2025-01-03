import { RouterProvider } from 'react-router-dom';
import routes from './app-routes';

const RouteProvider = () => <RouterProvider router={routes} />;

export default RouteProvider;
