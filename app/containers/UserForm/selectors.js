import { createSelector } from 'reselect'

export const containerUserFormRedux = () => s =>
  s.containerUserForm

export const isLoadingSelector = () => createSelector(
  containerUserFormRedux(),
  s => s ? s.isLoading : false
)

export const userFormSelector = () => createSelector(
  containerUserFormRedux(),
  s => s ? s.userForm : {}
)
