import { createAction, handleActions } from 'redux-actions'

import {
  LOG_LIST_REQUEST,
  LOG_LIST_SUCCESS
} from './constants'

export const LOG_LIST_REQUEST_ACTION = createAction(LOG_LIST_REQUEST)
export const LOG_LIST_SUCCESS_ACTION = createAction(LOG_LIST_SUCCESS)

const initialState = {
  isLoading: false,
  list: { rows: [], count: 0 }
}

const reducer = handleActions(
  new Map([
    [
      LOG_LIST_REQUEST_ACTION,
      (s, { payload }) => ({ ...s, isLoading: true })
    ],
    [
      LOG_LIST_SUCCESS_ACTION,
      (s, { payload }) => ({ ...s, isLoading: false, list: payload })
    ]
  ]),
  initialState
)

export default reducer
