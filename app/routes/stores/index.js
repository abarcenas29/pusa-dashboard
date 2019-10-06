import { lazy } from 'react'

const LoadStoresList = lazy(() => import('Containers/StoresList' /* webpackChunkName Containers-OrganizationList */))

const LoadStoresForm = lazy(() => import('Containers/StoresForm' /* webpackChunkName Containers-OrganizationForm */))

export default [
  {
    path: '/stores/list',
    component: LoadStoresList,
    exact: true
  },
  {
    path: '/stores/create',
    component: LoadStoresForm,
    exact: true
  },
  {
    path: '/stores/:id',
    component: LoadStoresForm,
    exact: true
  }
]
