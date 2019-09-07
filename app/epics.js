import { createEpicMiddleware } from 'redux-observable'
import { BehaviorSubject } from 'rxjs'
import { switchMap } from 'rxjs/operators'

import rootEpics from './rootEpics'

const epic$ = new BehaviorSubject(rootEpics)

export const hotReloadEpic = (...args) => epic$.pipe(switchMap(e => e(...args)))

if (module.hot) {
  module.hot.accept('./rootEpics', () => {
    const nextRootEpics = require('./rootEpics').default
    epic$.next(nextRootEpics)
  })
}

export default createEpicMiddleware
