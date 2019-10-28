import { combineEpics, ofType } from 'redux-observable'
import { switchMap, map } from 'rxjs/operators'

import { API_URL, CONTENT_TYPE } from 'App/constants'
import {
  asyncErrorHandling,
  responseHandling
} from 'Helpers/epics'

import {
  EMPLOYEE_DETAIL_REQUEST
} from './constants'
import {
  EMPLOYEE_DETAIL_SUCCESS_ACTION
} from './reducers'

export const employeeFormDetailEpic = (a$, s$, d$) =>
  a$.pipe(
    ofType(EMPLOYEE_DETAIL_REQUEST),
    switchMap(
      ({ payload }) => d$.ajaxPOST(
        `${API_URL}users`,
        JSON.stringify({
          action: 'query',
          ...payload
        }),
        CONTENT_TYPE
      ).pipe(asyncErrorHandling)
    ),
    responseHandling(map, res => EMPLOYEE_DETAIL_SUCCESS_ACTION(res))
  )

export default combineEpics(employeeFormDetailEpic)
