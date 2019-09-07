import { combineEpics } from 'redux-observable'

import SearchAddressModalEpics from 'Components/CoordSearchModal/epics'

export default combineEpics(
  SearchAddressModalEpics
)
