import { API_ERROR_FAILOVER_ACTION } from 'App/appReducer'
import { API_ERROR_FAILOVER, API_TIMEOUT } from 'App/constants'
import store from 'App/store'
import { pipe, of } from 'rxjs'
import { timeout, catchError, retry, map } from 'rxjs/operators'

export const asyncErrorHandling = pipe(
  timeout(API_TIMEOUT),
  retry(5),
  map(res => {
    if (res.response) {
      const { data } = res.response
      return data
    }
    throw res
  }),
  catchError(e => {
    return of(API_ERROR_FAILOVER_ACTION(e))
  })
)

export const responseHandling = (operator, response) => {
  return pipe(
    operator(res => {
      if (res.type === API_ERROR_FAILOVER) {
        return operator.name === 'mergeMap' ? [res] : res
      }
      return response(res)
    })
  )
}

export const responseMultiHandling = (operator, response) => {
  return pipe(
    operator(res => {
      const withErrors = res.filter(i => i.type === API_ERROR_FAILOVER)
      const woErrors = res.filter(i => Array.isArray(i))

      withErrors.forEach(i => store.dispatch(API_ERROR_FAILOVER_ACTION(i)))

      return response(woErrors)
    })
  )
}
