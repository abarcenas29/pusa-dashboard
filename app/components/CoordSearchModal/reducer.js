import { createAction, handleActions } from 'redux-actions'

import { SEARCH_ADDRESS_REQUEST, SEARCH_ADDRESS_SUCCESS } from './constants'

export const SEARCH_ADDRESS_REQUEST_ACTION = createAction(SEARCH_ADDRESS_REQUEST)
export const SEARCH_ADDRESS_SUCCESS_ACTION = createAction(SEARCH_ADDRESS_SUCCESS)

const initialState = {
  isLoading: false,
  addresses: []
}

const reducer = handleActions(
  new Map([
    [
      SEARCH_ADDRESS_REQUEST_ACTION,
      (s, a) => ({ ...s, isLoading: true })
    ],
    [
      SEARCH_ADDRESS_SUCCESS_ACTION,
      (s, { payload }) => ({ ...s, isLoading: false, addresses: payload })
    ]
  ]),
  initialState
)

export default reducer
