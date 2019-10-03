import { createSelector } from 'reselect'

export const containerLoginRedux = () => s =>
  s.containerLogin

export const userSelector = () => createSelector(
  containerLoginRedux(),
  s => s ? s.loginDetail : {}
)
