import { combineEpics, ofType } from 'redux-observable'
import { switchMap, map } from 'rxjs/operators'

import { API_URL, CONTENT_TYPE } from 'App/constants'
import { asyncErrorHandling, responseHandling } from 'Helpers/epics'

import { LIST_REQUEST } from './constants'
import { LIST_SUCCESS_ACTION } from './reducers'

export const listEpic = (a$, s$, d$) =>
  a$.pipe(
    ofType(LIST_REQUEST),
    switchMap(
      ({ payload }) => d$.ajaxPOST(
        `${API_URL}stores`,
        JSON.stringify({
          action: 'query'
        }),
        CONTENT_TYPE
      ).pipe(asyncErrorHandling)
    ),
    responseHandling(map, res => LIST_SUCCESS_ACTION(res))
  )

export default combineEpics(listEpic)
