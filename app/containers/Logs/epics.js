import { combineEpics, ofType } from 'redux-observable'
import { switchMap, map } from 'rxjs/operators'
import dayjs from 'dayjs'

import { API_URL, CONTENT_TYPE } from 'App/constants'
// import { REDIRECT_ACTION } from 'App/appReducer'
import { asyncErrorHandling, responseHandling } from 'Helpers/epics'

import {
  LOG_LIST_REQUEST
} from './constants'
import {
  LOG_LIST_SUCCESS_ACTION
} from './reducers'

export const timeLogListEpic = (a$, s$, d$) =>
  a$.pipe(
    ofType(LOG_LIST_REQUEST),
    switchMap(({ payload }) =>
      d$.ajaxPOST(
        `${API_URL}time`,
        JSON.stringify({
          action: 'query',
          time_in: dayjs().startOf('month').toISOString(),
          where: {
            employeeUid: payload
          }
        }),
        CONTENT_TYPE
      ).pipe(asyncErrorHandling)
    ),
    responseHandling(map, res => LOG_LIST_SUCCESS_ACTION(res))
  )

export default combineEpics(timeLogListEpic)
