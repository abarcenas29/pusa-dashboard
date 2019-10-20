import { lazy } from 'react'

const LoadUserList = lazy(() => import('Containers/UserList' /* webpackChunkName Containers-EmployeeList  */))

const LoadEmployeeForm = lazy(() => import('Containers/EmployeeForm' /* webpackChunkName Containers-EmployeeForm */))

export default [
  {
    path: '/employees/list',
    component: LoadUserList,
    exact: true
  },
  {
    path: '/employees/detail/:id',
    component: LoadEmployeeForm,
    exact: true
  }
]
