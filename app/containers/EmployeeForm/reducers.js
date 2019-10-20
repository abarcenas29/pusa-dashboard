import { createAction, handleActions } from 'redux-actions'

import {
  EMPLOYEE_DETAIL_REQUEST,
  EMPLOYEE_DETAIL_SUCCESS
} from './constants'

export const EMPLOYEE_DETAIL_REQUEST_ACTION = createAction(EMPLOYEE_DETAIL_REQUEST)
export const EMPLOYEE_DETAIL_SUCCESS_ACTION = createAction(EMPLOYEE_DETAIL_SUCCESS)

const initialState = {
  isLoading: false,
  detail: { rows: [], count: 0 }
}

const reducer = handleActions(
  new Map([
    [
      EMPLOYEE_DETAIL_REQUEST_ACTION,
      (s, a) => ({ ...s, isLoading: true })
    ],
    [
      EMPLOYEE_DETAIL_SUCCESS_ACTION,
      (s, { payload }) => ({ ...s, isLoading: false, detail: payload })
    ]
  ]),
  initialState
)

export default reducer
