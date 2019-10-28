import { createSelector } from 'reselect'

export const containerEmployeeFormRedux = () =>
  s => s.containerPrintEmployeeLogs

export const employeeRawFormSelectors = () => createSelector(
  containerEmployeeFormRedux(),
  s => s ? s.detail : { rows: [], count: 0 }
)

export const employeeFormSelectors = () => createSelector(
  employeeRawFormSelectors(),
  s => s ? s.rows[0] : {}
)
