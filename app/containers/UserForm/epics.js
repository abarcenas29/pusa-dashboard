import { combineEpics, ofType } from 'redux-observable'
import { switchMap, map, mergeMap } from 'rxjs/operators'

import { API_URL, CONTENT_TYPE } from 'App/constants'
import { REDIRECT_ACTION, TOAST_ACTION } from 'App/appReducer'
import { asyncErrorHandling, responseHandling } from 'Helpers/epics'

import {
  USER_FORM_REQUEST,
  SUBMIT_REQUEST,
  UPDATE_REQUEST
} from './constants'
import {
  SUBMIT_SUCCESS_ACTION,
  UPDATE_SUCCESS_ACTION,
  USER_FORM_SUCCESS_ACTION
} from './reducer'

export const userFormEpic = (a$, s$, d$) =>
  a$.pipe(
    ofType(USER_FORM_REQUEST),
    switchMap(({ payload }) => {
      return d$.ajaxPOST(
        `${API_URL}users`,
        JSON.stringify({
          action: 'query',
          where: {
            uid: payload
          }
        }),
        CONTENT_TYPE
      ).pipe(asyncErrorHandling)
    }),
    responseHandling(map, res => USER_FORM_SUCCESS_ACTION(res.rows[0]))
  )

export const createUserEpic = (a$, s$, d$) =>
  a$.pipe(
    ofType(SUBMIT_REQUEST),
    switchMap(({ payload }) => {
      const { repeat_password, ...rest } = payload
      return d$.ajaxPOST(
        `${API_URL}users`,
        JSON.stringify({
          action: 'create',
          created_by: localStorage.getItem('id'),
          ...rest
        }),
        CONTENT_TYPE
      ).pipe(asyncErrorHandling)
    }),
    responseHandling(mergeMap, res => [
      REDIRECT_ACTION('/users/list'),
      SUBMIT_SUCCESS_ACTION(res),
      TOAST_ACTION({ type: 'success', message: 'User Created' })
    ])
  )

export const updateUserEpic = (a$, s$, d$) =>
  a$.pipe(
    ofType(UPDATE_REQUEST),
    switchMap(({ payload }) => {
      const { repeat_password, ...rest } = payload
      return d$.ajaxPUT(
        `${API_URL}users`,
        JSON.stringify({
          options: {
            where: {
              uid: rest.uid
            }
          },
          ...rest
        }),
        CONTENT_TYPE
      ).pipe(asyncErrorHandling)
    }),
    responseHandling(mergeMap, res => [
      UPDATE_SUCCESS_ACTION(res),
      TOAST_ACTION({ type: 'success', message: 'User Updated' }),
      REDIRECT_ACTION('/users/list')
    ])
  )

export default combineEpics(userFormEpic, createUserEpic, updateUserEpic)
