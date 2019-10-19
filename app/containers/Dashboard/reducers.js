import { createAction, handleActions } from 'redux-actions'

import {
  CHECK_IN_REQUEST,
  CHECK_IN_SUCCESS,
  SUBMIT_CHECK_IN_REQUEST,
  SUBMIT_CHECK_IN_SUCCESS,
  STORE_INFO_REQUEST,
  STORE_INFO_SUCCESS
} from './constants'

export const SUBMIT_CHECK_IN_REQUEST_ACTION = createAction(SUBMIT_CHECK_IN_REQUEST)
export const SUBMIT_CHECK_IN_SUCCESS_ACTION = createAction(SUBMIT_CHECK_IN_SUCCESS)

export const CHECK_IN_REQUEST_ACTION = createAction(CHECK_IN_REQUEST)
export const CHECK_IN_SUCCESS_ACTION = createAction(CHECK_IN_SUCCESS)

export const STORE_INFO_REQUEST_ACTION = createAction(STORE_INFO_REQUEST)
export const STORE_INFO_SUCCESS_ACTION = createAction(STORE_INFO_SUCCESS)

const initialState = {
  isLoading: false,
  checkIn: [],
  storeInfo: { rows: [], count: 0 }
}

const reducer = handleActions(
  new Map([
    [
      SUBMIT_CHECK_IN_REQUEST_ACTION,
      (s, { payload }) => ({ ...s, isLoading: true })
    ],
    [
      SUBMIT_CHECK_IN_SUCCESS_ACTION,
      (s, { payload }) => ({ ...s, isLoading: false })
    ],
    [
      CHECK_IN_REQUEST_ACTION,
      (s, { payload }) => ({ ...s, isLoading: true })
    ],
    [
      CHECK_IN_SUCCESS_ACTION,
      (s, { payload }) => ({ ...s, isLoading: false, checkIn: payload })
    ],
    [
      STORE_INFO_REQUEST_ACTION,
      (s, { payload }) => ({ ...s, isLoading: true })
    ],
    [
      STORE_INFO_SUCCESS_ACTION,
      (s, { payload }) => ({ ...s, isLoading: false, storeInfo: payload })
    ]
  ]),
  initialState
)

export default reducer
