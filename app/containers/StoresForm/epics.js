import { combineEpics, ofType } from 'redux-observable'
import { switchMap, map, mergeMap } from 'rxjs/operators'

import { API_URL, CONTENT_TYPE } from 'App/constants'
import { REDIRECT_ACTION, TOAST_ACTION } from 'App/appReducer'
import { asyncErrorHandling, responseHandling } from 'Helpers/epics'

import {
  LIST_USERS_REQUEST,
  STORE_FORM_REQUEST,
  SUBMIT_REQUEST,
  UPDATE_REQUEST
} from './constants'
import {
  LIST_USERS_SUCCESS_ACTION,
  STORE_FORM_SUCCESS_ACTION,
  SUBMIT_SUCCESS_ACTION,
  UPDATE_SUCCESS_ACTION
} from './reducers'

export const usersListEpic = (a$, s$, d$) =>
  a$.pipe(
    ofType(LIST_USERS_REQUEST),
    switchMap(() =>
      d$
        .ajaxPOST(
          `${API_URL}users`,
          JSON.stringify({
            action: 'query',
            where: {
              type: 'owner'
            }
          }),
          CONTENT_TYPE
        )
        .pipe(asyncErrorHandling)
    ),
    responseHandling(map, res => LIST_USERS_SUCCESS_ACTION(res))
  )

export const storeFormEpic = (a$, s$, d$) =>
  a$.pipe(
    ofType(STORE_FORM_REQUEST),
    switchMap(
      ({ payload }) =>
        d$.ajaxPOST(
          `${API_URL}stores`,
          JSON.stringify({
            action: 'query',
            where: {
              uid: payload
            }
          }),
          CONTENT_TYPE
        ).pipe(asyncErrorHandling)
    ),
    responseHandling(map, res => STORE_FORM_SUCCESS_ACTION(res))
  )

export const createStoreEpic = (a$, s$, d$) =>
  a$.pipe(
    ofType(SUBMIT_REQUEST),
    switchMap(
      ({ payload }) => d$.ajaxPOST(
        `${API_URL}stores`,
        JSON.stringify({
          action: 'create',
          created_by: localStorage.getItem('id'),
          ...payload
        }),
        CONTENT_TYPE
      ).pipe(asyncErrorHandling)
    ),
    responseHandling(mergeMap, res => [
      SUBMIT_SUCCESS_ACTION(),
      TOAST_ACTION({ type: 'success', message: 'Store Created' }),
      REDIRECT_ACTION('/stores/list')
    ])
  )

export const updateStoreEpic = (a$, s$, d$) =>
  a$.pipe(
    ofType(UPDATE_REQUEST),
    switchMap(
      ({ payload }) => d$.ajaxPUT(
        `${API_URL}stores`,
        JSON.stringify({
          options: {
            where: {
              uid: payload.uid
            }
          },
          ...payload
        }),
        CONTENT_TYPE
      ).pipe(asyncErrorHandling)
    ),
    responseHandling(mergeMap, res => [
      UPDATE_SUCCESS_ACTION(res),
      TOAST_ACTION({ type: 'success', message: 'Store Updated' }),
      REDIRECT_ACTION('/stores/list')
    ])
  )

export default combineEpics(
  usersListEpic,
  storeFormEpic,
  createStoreEpic,
  updateStoreEpic
)
