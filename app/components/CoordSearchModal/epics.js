import { combineEpics, ofType } from 'redux-observable'
import { switchMap, map } from 'rxjs/operators'

import { OSM_NOMINATIM_URL } from 'App/constants'

import { SEARCH_ADDRESS_REQUEST } from './constants'
import { SEARCH_ADDRESS_SUCCESS_ACTION } from './reducer'

export const searchAddressEpic = (a$, s$, d$) =>
  a$.pipe(
    ofType(SEARCH_ADDRESS_REQUEST),
    switchMap(({ payload }) => {
      return d$.getJSON(
      `${OSM_NOMINATIM_URL}?${payload}`)
    }),
    map(res => SEARCH_ADDRESS_SUCCESS_ACTION(res))
  )

export default combineEpics(
  searchAddressEpic
)
