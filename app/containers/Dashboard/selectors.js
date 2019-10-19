import { createSelector } from 'reselect'

export const containerDashboardRedux = () => s =>
  s.containerDashboard

export const timeLogSelector = () => createSelector(
  containerDashboardRedux(),
  s => s ? s.checkIn : []
)

export const checkInSelector = () => createSelector(
  timeLogSelector(),
  s => {
    const timeLogs = s.map(i => ([
      { type: 'Time-in', date: i.time_in, loc: JSON.parse(i.time_in_loc) },
      { type: 'Time-out', date: i.time_out, loc: JSON.parse(i.time_out_loc) }
    ])).flat()
    return timeLogs
  }
)

export const isLoadingSelector = () => createSelector(
  containerDashboardRedux(),
  s => s ? s.isLoading : false
)
