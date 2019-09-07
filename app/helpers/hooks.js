import {
  useEffect as reactUseEffect,
  useState as reactUseState,
  useCallback as reactUseCallback,
  useMemo as reactUseMemo,
  useRef as reactUseRef
} from 'react'

import {
  useSelector as reactReduxUseSelector,
  useDispatch as reactReduxUseDispatch
} from 'react-redux'

import store from 'App/store'

export const useState = init => reactUseState(init)
export const useEffect = (cb, obs) => reactUseEffect(cb, obs)
export const useCallback = (cb, dispatch) => reactUseCallback(cb, dispatch)
export const useSelector = cb => reactReduxUseSelector(cb)
export const useDispatch = () => reactReduxUseDispatch()
export const useMemo = (cb, obs) => reactUseMemo(cb, obs)
export const useRef = () => reactUseRef()

export const useMountReducer = (key, reducer, keepReducer = true) => {
  reactUseEffect(() => {
    store.injectReducer(key, reducer)
    if (keepReducer) {
      return () => {
        store.removeReducer(key)
      }
    }
  }, [])
}

export const useClickOutside = (node, callback) => {
  const handleClick = e => {
    if (node && node.current && node.current.contains(e.target)) {
      return
    }
    callback()
  }

  reactUseEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])
}
