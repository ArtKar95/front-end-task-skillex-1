import { lazy } from 'react';

const Home = lazy(() => import('@/pages/HomePage'));
const NotFound =lazy(() => import('@/pages/NotFoundPage'));

//! Here can be added also type(private, public), icons,
//! role-base pages,disabled(coming soon), badges for news etc.

export const APP_ROUTES = [
  {
    path: '/',
    label: 'Home',
    element: <Home/>,
  },
  {
      path: '/not-found',
      label: 'Not Found Page',
      element: <NotFound />,
  },
];

