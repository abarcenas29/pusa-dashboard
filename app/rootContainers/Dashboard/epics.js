import { combineEpics, ofType } from 'redux-observable'
import { switchMap, map } from 'rxjs/operators'

import { API_URL, CONTENT_TYPE } from 'App/constants'
import { asyncErrorHandling, responseHandling } from 'Helpers/epics'

import {
  STORE_INFO_REQUEST
} from './constants'
import {
  STORE_INFO_SUCCESS_ACTION
} from './reducers'

export const storeInfoEpic = (a$, s$, d$) =>
  a$.pipe(
    ofType(STORE_INFO_REQUEST),
    switchMap(
      ({ payload }) =>
        d$.ajaxPOST(
          `${API_URL}stores`,
          JSON.stringify({
            action: 'query',
            where: {
              uid: payload
            }
          }),
          CONTENT_TYPE
        ).pipe(asyncErrorHandling)
    ),
    responseHandling(map, res => STORE_INFO_SUCCESS_ACTION(res))
  )

export default combineEpics(
  storeInfoEpic
)
