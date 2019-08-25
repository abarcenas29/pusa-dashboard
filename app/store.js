import { applyMiddleware, createStore, combineReducers } from 'redux'
import { ajax } from 'rxjs/ajax'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'

import appReducer from './appReducer.js'
export const API_ERROR_FAILOVER = 'App/API_ERROR_FAILOVER'

export const API_REQUEST = 'App/API_REQUEST'
export const API_SUCCESS = 'App/API_SUCCESS'

export const API_URL = process.env.API_URL
export const UPLOAD_URL = process.env.UPLOAD_URL

// Define the Reducers that will always be present in the application
const staticReducers = {
  appReducer
}

const reduxObservableMiddleWare = createEpicMiddleware({
  dependencies: {
    getJSON: ajax.getJSON,
    ajaxPOST: ajax.post,
    ajaxPUT: ajax.put,
    ajaxDELETE: ajax.delete
  }
})

const reduxMiddleware = applyMiddleware(...[reduxObservableMiddleWare])

const createReducer = (asyncReducers) => (
  combineReducers({
    ...staticReducers,
    ...asyncReducers
  })
)

// Configure the store
export const configureStore = (initialState = {}) => {
  const store = createStore(
    createReducer(),
    initialState,
    composeWithDevTools(reduxMiddleware)
  )

  // Add a dictionary to keep track of the registered async reducers
  store.asyncReducers = {}

  // Create an inject reducer function
  // This function adds the async reducer, and creates a new combined reducer
  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer
    store.replaceReducer(createReducer(store.asyncReducers))
  }

  // Delete unused reducer
  store.removeReducer = key => {
    delete store.asyncReducers[key]
    store.replaceReducer(createReducer(store.asyncReducers))
  }

  reduxObservableMiddleWare.run(combineEpics())
  // Return the modified store
  return store
}

export default configureStore()
