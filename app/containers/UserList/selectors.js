import { createSelector } from 'reselect'

export const containerUserListRedux = () => s =>
  s.containerUserList

export const isLoadingSelector = () => createSelector(
  containerUserListRedux(),
  s => s ? s.isLoading : false
)

export const listSelector = () => createSelector(
  containerUserListRedux(),
  s => s ? s.list : { rows: [], count: 0 }
)
