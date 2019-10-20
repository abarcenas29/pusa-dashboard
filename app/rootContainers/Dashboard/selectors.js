import { createSelector } from 'reselect'

export const appRedux = () => s =>
  s.appReducer

export const dashboardRedux = () => s => {
  return s.rootContainersDashboard
}

export const rawStoreInfoSelector = () => createSelector(
  dashboardRedux(),
  s => s ? s.storeInfo : { rows: [], count: 0 }
)

export const storeInfoSelector = () => createSelector(
  rawStoreInfoSelector(),
  s => s.rows ? s.rows[0] : {}
)

export const redirectSelector = () => createSelector(
  appRedux(),
  s => s ? s.redirect : null
)
