import { createSelector } from 'reselect'

export const containerLogsRedux = () => s =>
  s.containerLogs

export const timeLogListSelector = () => createSelector(
  containerLogsRedux(),
  s => s ? s.list : { rows: [], count: 0 }
)
