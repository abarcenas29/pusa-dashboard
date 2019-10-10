import { createAction, handleActions } from 'redux-actions'

import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  EMPLOYEE_LIST_REQUEST,
  EMPLOYEE_LIST_SUCCESS
} from './constants'

export const USER_LIST_REQUEST_ACTION = createAction(USER_LIST_REQUEST)
export const USER_LIST_SUCCESS_ACTION = createAction(USER_LIST_SUCCESS)
export const EMPLOYEE_LIST_REQUEST_ACTION = createAction(EMPLOYEE_LIST_REQUEST)
export const EMPLOYEE_LIST_SUCCESS_ACTION = createAction(EMPLOYEE_LIST_SUCCESS)

const initialState = {
  isLoading: false,
  list: { rows: [], count: 0 }
}

const reducer = handleActions(
  new Map([
    [
      USER_LIST_REQUEST_ACTION,
      (s, a) => ({ ...s, isLoading: false })
    ],
    [
      USER_LIST_SUCCESS_ACTION,
      (s, { payload }) => ({ ...s, isLoading: true, list: payload })
    ],
    [
      EMPLOYEE_LIST_REQUEST_ACTION,
      (s, { payload }) => ({ ...s, isLoading: true })
    ],
    [
      EMPLOYEE_LIST_SUCCESS_ACTION,
      (s, { payload }) => ({ ...s, isLoading: false, list: payload })
    ]
  ]),
  initialState
)

export default reducer
