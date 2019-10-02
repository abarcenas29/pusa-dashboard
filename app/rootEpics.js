import { combineEpics } from 'redux-observable'

import SearchAddressModalEpics from 'Components/CoordSearchModal/epics'
import LoginEpics from 'Containers/Login/epics'

export default combineEpics(
  SearchAddressModalEpics,
  LoginEpics
)
