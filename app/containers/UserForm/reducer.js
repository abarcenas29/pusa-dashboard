import { createAction, handleActions } from 'redux-actions'

import {
  USER_FORM_REQUEST,
  USER_FORM_SUCCESS,
  SUBMIT_REQUEST,
  SUBMIT_SUCCESS,
  UPDATE_REQUEST,
  UPDATE_SUCCESS
} from './constants'

export const USER_FORM_REQUEST_ACTION = createAction(USER_FORM_REQUEST)
export const USER_FORM_SUCCESS_ACTION = createAction(USER_FORM_SUCCESS)
export const SUBMIT_REQUEST_ACTION = createAction(SUBMIT_REQUEST)
export const SUBMIT_SUCCESS_ACTION = createAction(SUBMIT_SUCCESS)
export const UPDATE_REQUEST_ACTION = createAction(UPDATE_REQUEST)
export const UPDATE_SUCCESS_ACTION = createAction(UPDATE_SUCCESS)

const initialState = {
  isLoading: false,
  userForm: {}
}

const reducer = handleActions(
  new Map([
    [
      USER_FORM_REQUEST_ACTION,
      (s, a) => ({ ...s, isLoading: true })
    ],
    [
      USER_FORM_SUCCESS_ACTION,
      (s, { payload }) =>
        ({ ...s, isLoading: false, userForm: payload })
    ],
    [
      SUBMIT_REQUEST_ACTION,
      (s, a) => ({ ...s, isLoading: true })
    ],
    [
      SUBMIT_SUCCESS_ACTION,
      (s, a) => ({ ...s, isLoading: false })
    ],
    [
      UPDATE_REQUEST_ACTION,
      (s, a) => ({ ...s, isLoading: true })
    ],
    [
      UPDATE_SUCCESS_ACTION,
      (s, a) => ({ ...s, isLoading: false })
    ]
  ]),
  initialState
)

export default reducer
