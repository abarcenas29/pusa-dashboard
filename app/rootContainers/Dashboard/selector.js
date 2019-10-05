import { createSelector } from 'reselect'

export const appRedux = () => s =>
  s.appReducer

export const redirectSelector = () => createSelector(
  appRedux(),
  s => s ? s.redirect : null
)

export const toastSelector = () => createSelector(
  appRedux(),
  s => s ? s.toast : null
)
