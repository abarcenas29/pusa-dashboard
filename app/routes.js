import { lazy } from 'react'

import StoreRoutes from 'Routes/stores'
import UserRoutes from 'Routes/users'
import Employees from 'Routes/employees'

const LoadLogin = lazy(() => import('Containers/Login' /* webpackChunkName: "Container-Home" */))

const LoadAbout = lazy(() => import('Containers/About' /* webpackChunkName: "Container-About" */))

const LoadDashboard = lazy(() => import('RootContainers/Dashboard' /* webpackChunkName: "RootContainers-SampleRoot" */))

const LoadPrintEmployeeLogs = lazy(() => import('Containers/PrintEmployeeLogs' /* webpackChunkName Containers-PrintEmployeeLogs */))

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
    path: '/stores',
    component: LoadDashboard,
    routes: [
      ...StoreRoutes
    ]
  },
  {
    path: '/users',
    component: LoadDashboard,
    routes: [
      ...UserRoutes
    ]
  },
  {
    path: '/employees',
    component: LoadDashboard,
    routes: [
      ...Employees
    ]
  },
  {
    path: '/print/logs/:id',
    component: LoadPrintEmployeeLogs,
    exact: true
  },
  {
    path: '/payroll',
    component: LoadDashboard,
    exact: true
  },
  {
    path: '/logs',
    component: LoadDashboard,
    exact: true
  }
]

export default routes
