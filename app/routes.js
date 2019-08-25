import { lazy } from 'react'

import OrgRoutes from 'Routes/organization'
import UserRoutes from 'Routes/users'

const LoadLogin = lazy(() => import('Containers/Login' /* webpackChunkName: "Container-Home" */))

const LoadAbout = lazy(() => import('Containers/About' /* webpackChunkName: "Container-About" */))

const LoadDashboard = lazy(() => import('RootContainers/Dashboard' /* webpackChunkName: "RootContainers-SampleRoot" */))

const routes = [
  {
    path: '/',
    component: LoadLogin,
    exact: true
  },
  {
    path: '/about',
    component: LoadAbout
  },
  {
    path: '/dashboard',
    component: LoadDashboard
  },
  {
    path: '/organizations',
    component: LoadDashboard,
    routes: [
      ...OrgRoutes
    ]
  },
  {
    path: '/users',
    component: LoadDashboard,
    routes: [
      ...UserRoutes
    ]
  }
]

export default routes
