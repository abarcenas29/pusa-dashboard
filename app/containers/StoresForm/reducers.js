import { createAction, handleActions } from 'redux-actions'

import {
  LIST_USERS_REQUEST,
  LIST_USERS_SUCCESS,
  STORE_FORM_REQUEST,
  STORE_FORM_SUCCESS,
  SUBMIT_REQUEST,
  SUBMIT_SUCCESS,
  UPDATE_REQUEST,
  UPDATE_SUCCESS
} from './constants'

export const LIST_USERS_REQUEST_ACTION = createAction(LIST_USERS_REQUEST)
export const LIST_USERS_SUCCESS_ACTION = createAction(LIST_USERS_SUCCESS)
export const STORE_FORM_REQUEST_ACTION = createAction(STORE_FORM_REQUEST)
export const STORE_FORM_SUCCESS_ACTION = createAction(STORE_FORM_SUCCESS)
export const SUBMIT_REQUEST_ACTION = createAction(SUBMIT_REQUEST)
export const SUBMIT_SUCCESS_ACTION = createAction(SUBMIT_SUCCESS)
export const UPDATE_REQUEST_ACTION = createAction(UPDATE_REQUEST)
export const UPDATE_SUCCESS_ACTION = createAction(UPDATE_SUCCESS)

const initialState = {
  isLoading: false,
  storeForm: { rows: [], count: 0 },
  usersList: { rows: [], count: 0 }
}

const reducer = handleActions(
  new Map([
    [
      LIST_USERS_REQUEST_ACTION,
      (s, a) => ({ ...s, isLoading: true })
    ],
    [
      LIST_USERS_SUCCESS_ACTION,
      (s, { payload }) => ({ ...s, usersList: payload, isLoading: false })
    ],
    [
      SUBMIT_REQUEST_ACTION,
      (s, a) => ({ ...s, isLoading: true })
    ],
    [
      SUBMIT_SUCCESS_ACTION,
      (s, { payload }) => ({ ...s, isLoading: false })
    ],
    [
      UPDATE_REQUEST_ACTION,
      (s, { payload }) => ({ ...s, isLoading: false })
    ],
    [
      UPDATE_SUCCESS_ACTION,
      (s, { payload }) => ({ ...s, isLoading: true })
    ],
    [
      STORE_FORM_REQUEST_ACTION,
      (s, { payload }) => ({ ...s, isLoading: true })
    ],
    [
      STORE_FORM_SUCCESS_ACTION,
      (s, { payload }) => ({ ...s, isLoading: false, storeForm: payload })
    ]
  ]),
  initialState
)

export default reducer
