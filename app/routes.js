import { lazy } from 'react'

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
  }
]

export default routes
