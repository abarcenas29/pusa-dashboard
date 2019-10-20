import { combineEpics, ofType } from 'redux-observable'
import { switchMap, mergeMap, map } from 'rxjs/operators'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'

import { API_URL, CONTENT_TYPE } from 'App/constants'
import { asyncErrorHandling, responseHandling } from 'Helpers/epics'

import {
  CHECK_IN_REQUEST,
  LOG_LIST_REQUEST,
  SUBMIT_CHECK_IN_REQUEST
} from './constants'
import {
  CHECK_IN_REQUEST_ACTION,
  CHECK_IN_SUCCESS_ACTION,
  LOG_LIST_SUCCESS_ACTION,
  SUBMIT_CHECK_IN_SUCCESS_ACTION
} from './reducers'

export const submitCheckInEpic = (a$, s$, d$) =>
  a$.pipe(
    ofType(SUBMIT_CHECK_IN_REQUEST),
    switchMap(
      ({ payload }) =>
        d$.ajaxPOST(
          `${API_URL}check-in`,
          JSON.stringify({
            ...payload
          }),
          CONTENT_TYPE
        ).pipe(asyncErrorHandling)
    ),
    responseHandling(mergeMap, res => {
      if (res.error) {
        toast.error(res.error)
      } else {
        toast.success('Logged in successfully')
      }

      return [
        CHECK_IN_REQUEST_ACTION(),
        SUBMIT_CHECK_IN_SUCCESS_ACTION(res)
      ]
    })
  )

export const checkInEpic = (a$, s$, d$) =>
  a$.pipe(
    ofType(CHECK_IN_REQUEST),
    switchMap(
      ({ payload }) => {
        const currentTime = dayjs()
        return d$.ajaxPOST(
          `${API_URL}check-in/current`,
          JSON.stringify({
            employeeUid: localStorage.getItem('employee'),
            time_in: currentTime.hour(0).minute(0)
          }),
          CONTENT_TYPE
        ).pipe(asyncErrorHandling)
      }
    ),
    responseHandling(map, res => CHECK_IN_SUCCESS_ACTION(res))
  )

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

export default combineEpics(
  checkInEpic,
  submitCheckInEpic,
  timeLogListEpic
)
