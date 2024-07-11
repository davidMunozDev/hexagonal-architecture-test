import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashboardFactory from '@/sections/dashboard/DashboardFactory';
import DetailFactory from '@/sections/detail/DetailFactory';
import Layout from '@/sections/layout/Layout';
import { PATHS } from '@/router/paths';

const router = createBrowserRouter([
	{
		path: PATHS.base,
		element: <Layout />,
		children: [
			{
				path: PATHS.dashboard,
				element: <DashboardFactory />,
			},
			{
				path: PATHS.detail,
				element: <DetailFactory />,
			},
		],
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
