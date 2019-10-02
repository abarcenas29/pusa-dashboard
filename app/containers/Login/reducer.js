import { createAction, handleActions } from 'redux-actions'

import { LOGIN_REQUEST, LOGIN_SUCCESS } from './constants'

export const LOGIN_REQUEST_ACTION = createAction(LOGIN_REQUEST)
export const LOGIN_SUCCESS_ACTION = createAction(LOGIN_SUCCESS)

const initialState = {
  isLoading: false,
  loginDetail: {}
}

const reducer = handleActions(
  new Map([
    [
      LOGIN_REQUEST_ACTION,
      (s, a) => ({ ...s, isLoading: true })
    ],
    [
      LOGIN_SUCCESS_ACTION,
      (s, { payload }) => ({ ...s, isLoading: false, loginDetail: payload })
    ]
  ]),
  initialState
)

export default reducer
