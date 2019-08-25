import { lazy } from 'react'

const LoadUserList = lazy(() => import('Containers/UserList' /* webpackChunkName Containers-OrganizationList */))

const LoadUserForm = lazy(() => import('Containers/UserForm' /* webpackChunkName Containers-OrganizationForm */))

export default [
  {
    path: '/users/list',
    component: LoadUserList,
    exact: true
  },
  {
    path: '/users/create',
    component: LoadUserForm,
    exact: true
  },
  {
    path: '/users/:id',
    component: LoadUserForm,
    exact: true
  }
]
