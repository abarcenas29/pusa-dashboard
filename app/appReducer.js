import { createAction, handleActions } from 'redux-actions'
import {
  API_ERROR_FAILOVER,
  REDIRECT,
  TOAST
} from './constants'

const defaultState = {
  isLoading: false,
  redirect: null,
  response: null,
  toast: null
}

export const API_ERROR_FAILOVER_ACTION = createAction(API_ERROR_FAILOVER)
export const REDIRECT_ACTION = createAction(REDIRECT)
export const TOAST_ACTION = createAction(TOAST)

const reducer = handleActions(
  new Map([
    [
      API_ERROR_FAILOVER_ACTION,
      (s, { payload }) => ({ ...s, field: payload })
    ],
    [
      REDIRECT_ACTION,
      (s, { payload }) => ({ ...s, redirect: payload })
    ],
    [
      TOAST_ACTION,
      (s, { payload }) => ({ ...s, toast: payload })
    ]
  ]),
  defaultState
)

export default reducer
