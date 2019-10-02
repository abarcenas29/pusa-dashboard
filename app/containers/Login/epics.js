import { combineEpics, ofType } from 'redux-observable'
import { switchMap, map } from 'rxjs/operators'

import { API_URL, CONTENT_TYPE } from 'App/constants'
import { asyncErrorHandling, responseHandling } from 'Helpers/epics'

import { LOGIN_REQUEST } from './constants'
import { LOGIN_SUCCESS_ACTION } from './reducer'

export const loginRequestEpic = (a$, s$, d$) =>
  a$.pipe(
    ofType(LOGIN_REQUEST),
    switchMap(({ payload }) => {
      return d$.ajaxPOST(
        `${API_URL}login`,
        JSON.stringify({
          where: { ...payload }
        }),
        CONTENT_TYPE
      ).pipe(asyncErrorHandling)
    }),
    responseHandling(map, res => LOGIN_SUCCESS_ACTION(res))
  )

export default combineEpics(
  loginRequestEpic
)
