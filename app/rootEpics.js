import { combineEpics } from 'redux-observable'

import SearchAddressModalEpics from 'Components/CoordSearchModal/epics'
import LoginEpics from 'Containers/Login/epics'
import UserListEpics from 'Containers/UserList/epics'
import UserFormEpics from 'Containers/UserForm/epics'
import StoresListEpics from 'Containers/StoresList/epics'
import StoresFormEpics from 'Containers/StoresForm/epics'

export default combineEpics(
  SearchAddressModalEpics,
  UserListEpics,
  UserFormEpics,
  StoresListEpics,
  StoresFormEpics,
  LoginEpics
)
