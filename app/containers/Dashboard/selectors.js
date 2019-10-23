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

export const totalRawPayLogs = () => createSelector(
  containerDashboardRedux(),
  s => s ? s.logs : { rows: [], count: 0 }
)

export const totalPayLogs = () => createSelector(
  totalRawPayLogs(),
  s => {
    if (s.rows.length > 0) {
      const filtered_args = s
        .rows
        .filter(i => i.gross_pay)
        .map(i => i.gross_pay)
      if (filtered_args.length > 0) return filtered_args.reduce((a, c) => a + c)
      return null
    }
    return null
  }
)

export const isLoadingSelector = () => createSelector(
  containerDashboardRedux(),
  s => s ? s.isLoading : false
)
