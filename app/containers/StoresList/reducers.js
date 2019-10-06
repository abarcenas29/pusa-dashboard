import { createAction, handleActions } from 'redux-actions'
import {
  LIST_REQUEST,
  LIST_SUCCESS
} from './constants'

export const LIST_REQUEST_ACTION = createAction(LIST_REQUEST)
export const LIST_SUCCESS_ACTION = createAction(LIST_SUCCESS)

const initialState = {
  isLoading: false,
  list: { rows: [], count: 0 }
}

const reducer = handleActions(
  new Map([
    [
      LIST_REQUEST_ACTION,
      (s, a) => ({ ...s, isLoading: false })
    ],
    [
      LIST_SUCCESS_ACTION,
      (s, { payload }) => ({ ...s, isLoading: false, list: payload })
    ]
  ]),
  initialState
)

export default reducer
