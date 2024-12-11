import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
import PrivateRoute from './PrivateRoute';
// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const Orders = Loadable(lazy(() => import('views/orders')));
const Products = Loadable(lazy(() => import('views/products')));
const Promotions = Loadable(lazy(() => import('views/promotions')));
const UsersManagement = Loadable(lazy(() => import('views/userManagement')));
// const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      // element: <PrivateRoute element={<DashboardDefault />} />
      element: (
        <PrivateRoute>
          <DashboardDefault />
        </PrivateRoute>
      )
    },
    {
      path: '/orders',
      // element: <PrivateRoute element={<DashboardDefault />} />
      element: (
        <PrivateRoute>
          <Orders />
        </PrivateRoute>
      )
    },
    {
      path: '/products',
      // element: <PrivateRoute element={<DashboardDefault />} />
      element: (
        <PrivateRoute>
          <Products />
        </PrivateRoute>
      )
    },
    {
      path: '/promotions',
      // element: <PrivateRoute element={<DashboardDefault />} />
      element: (
        <PrivateRoute>
          <Promotions />
        </PrivateRoute>
      )
    },
    {
      path: '/usersManagement',
      // element: <PrivateRoute element={<DashboardDefault />} />
      element: (
        <PrivateRoute>
          <UsersManagement />
        </PrivateRoute>
      )
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          // element: <PrivateRoute element={<UtilsTypography />} />
          element: (
            <PrivateRoute>
              <UtilsTypography />
            </PrivateRoute>
          )
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          // element: <PrivateRoute element={<UtilsColor />} />
          element: (
            <PrivateRoute>
              <UtilsColor />
            </PrivateRoute>
          )
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          // element: <PrivateRoute element={<UtilsShadow />} />
          element: (
            <PrivateRoute>
              <UtilsShadow />
            </PrivateRoute>
          )
        }
      ]
    },
    {
      path: 'sample-page',
      // element: <PrivateRoute element={<SamplePage />} />
      element: (
        <PrivateRoute>
          <SamplePage />
        </PrivateRoute>
      )
    }
  ]
};

export default MainRoutes;
