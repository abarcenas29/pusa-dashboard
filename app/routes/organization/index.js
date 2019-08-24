import { lazy } from 'react'

const LoadOrganizationList = lazy(() => import('Containers/OrganizationList' /* webpackChunkName Containers-OrganizationList */))

const LoadOrganizationForm = lazy(() => import('Containers/OrganizationForm' /* webpackChunkName Containers-OrganizationForm */))

export default [
  {
    path: '/organizations/list',
    component: LoadOrganizationList,
    exact: true
  },
  {
    path: '/organizations/create',
    component: LoadOrganizationForm,
    exact: true
  },
  {
    path: '/organizations/:id',
    component: LoadOrganizationForm,
    exact: true
  }
]
