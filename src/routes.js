import React from 'react';
import { Navigate } from 'react-router-dom';

// Route Views
import Home from './containers/home';
import Create from './containers/create';

let routePaths = [
  {
    path: '/',
    exact: true,
    component: () => <Navigate to={'/home'} />,
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/addNew',
    component: Create,
  },
];

export default routePaths;
