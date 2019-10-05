import { combineEpics } from 'redux-observable'

import SearchAddressModalEpics from 'Components/CoordSearchModal/epics'
import LoginEpics from 'Containers/Login/epics'
import UserListEpics from 'Containers/UserList/epics'
import UserFormEpics from 'Containers/UserForm/epics'

export default combineEpics(
  SearchAddressModalEpics,
  UserListEpics,
  UserFormEpics,
  LoginEpics
)
