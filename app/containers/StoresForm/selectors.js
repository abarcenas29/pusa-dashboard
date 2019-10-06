import { createSelector } from 'reselect'

export const containerStoreFormRedux = () => s =>
  s.containerStoreFormRedux

export const isLoadingSelector = () => createSelector(
  containerStoreFormRedux(),
  s => s ? s.isLoading : false
)

export const userListSelector = () => createSelector(
  containerStoreFormRedux(),
  s => s ? s.usersList : { rows: [], count: 0 }
)

export const userOptionsSelector = () => createSelector(
  userListSelector(),
  s => s.rows.map(
    ({ first_name, last_name, uid }) =>
      ({ text: `${last_name}, ${first_name}`, value: uid })
  )
)

export const storeFormRawSelector = () => createSelector(
  containerStoreFormRedux(),
  s => s ? s.storeForm : { rows: [], count: 0 }
)

export const storeFormSelector = () => createSelector(
  storeFormRawSelector(),
  s => s.rows[0] || {}
)
