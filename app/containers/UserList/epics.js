import { combineEpics, ofType } from 'redux-observable'
import { switchMap, map } from 'rxjs/operators'

import { API_URL, CONTENT_TYPE } from 'App/constants'
import {
  asyncErrorHandling,
  responseHandling
} from 'Helpers/epics'

import {
  USER_LIST_REQUEST,
  EMPLOYEE_LIST_REQUEST
} from './constants'
import {
  USER_LIST_SUCCESS_ACTION,
  EMPLOYEE_LIST_SUCCESS_ACTION
} from './reducer'

export const userListEpic = (a$, s$, d$) =>
  a$.pipe(
    ofType(USER_LIST_REQUEST),
    switchMap(
      ({ payload }) => d$.ajaxPOST(
        `${API_URL}users`,
        JSON.stringify({
          action: 'query'
        }),
        CONTENT_TYPE
      ).pipe(asyncErrorHandling)
    ),
    responseHandling(map, res => USER_LIST_SUCCESS_ACTION(res))
  )

export const employeeListEpic = (a$, s$, d$) =>
  a$.pipe(
    ofType(EMPLOYEE_LIST_REQUEST),
    switchMap(
      ({ payload }) => d$.ajaxPOST(
        `${API_URL}employees`,
        JSON.stringify({
          action: 'query',
          ...payload
        }),
        CONTENT_TYPE
      ).pipe(asyncErrorHandling)
    ),
    responseHandling(map, res => EMPLOYEE_LIST_SUCCESS_ACTION(res))
  )

export default combineEpics(
  userListEpic,
  employeeListEpic
)
