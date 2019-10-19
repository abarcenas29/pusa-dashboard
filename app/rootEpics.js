import { combineEpics } from 'redux-observable'

import DashboardEpics from 'Containers/Dashboard/epics'
import LoginEpics from 'Containers/Login/epics'
import SearchAddressModalEpics from 'Components/CoordSearchModal/epics'
import StoresFormEpics from 'Containers/StoresForm/epics'
import StoresListEpics from 'Containers/StoresList/epics'
import UserFormEpics from 'Containers/UserForm/epics'
import UserListEpics from 'Containers/UserList/epics'

export default combineEpics(
  DashboardEpics,
  LoginEpics,
  SearchAddressModalEpics,
  StoresFormEpics,
  StoresListEpics,
  UserFormEpics,
  UserListEpics
)
