import { createSelector } from 'reselect'

export const containerStoresListRedux = () => s =>
  s.containersStoresList

export const isLoadingSelector = () => createSelector(
  containerStoresListRedux(),
  s => s ? s.isLoading : false
)

export const listSelector = () => createSelector(
  containerStoresListRedux(),
  s => s ? s.list : { rows: [], count: 0 }
)
