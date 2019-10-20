import { createAction, handleActions } from 'redux-actions'
import {
  STORE_INFO_REQUEST,
  STORE_INFO_SUCCESS
} from './constants'

export const STORE_INFO_REQUEST_ACTION = createAction(STORE_INFO_REQUEST)
export const STORE_INFO_SUCCESS_ACTION = createAction(STORE_INFO_SUCCESS)

const initialState = {
  storeInfo: { rows: [], count: 0 }
}

const reducer = handleActions(
  new Map([
    [
      STORE_INFO_SUCCESS_ACTION,
      (s, { payload }) => ({ ...s, storeInfo: payload })
    ]
  ]),
  initialState
)

export default reducer
