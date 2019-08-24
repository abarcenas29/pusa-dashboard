import { lazy } from 'react'
import SampleRootRoutes from 'RootContainers/SampleRoot/routes'

const LoadHome = lazy(() => import('Containers/Home' /* webpackChunkName: "Container-Home" */))

const LoadAbout = lazy(() => import('Containers/About' /* webpackChunkName: "Container-About" */))

const LoadSampleRoot = lazy(() => import('RootContainers/SampleRoot' /* webpackChunkName: "RootContainers-SampleRoot" */))

const routes = [
  {
    path: '/',
    component: LoadHome,
    exact: true
  },
  {
    path: '/about',
    component: LoadAbout
  },
  { 
    path: '/sample-root',
    component: LoadSampleRoot,
    routes: [
      ...SampleRootRoutes
    ]
  }
]

export default routes
