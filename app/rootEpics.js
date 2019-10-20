import { combineEpics } from 'redux-observable'

import DashboardEpics from 'Containers/Dashboard/epics'
import LoginEpics from 'Containers/Login/epics'
import SearchAddressModalEpics from 'Components/CoordSearchModal/epics'
import StoresFormEpics from 'Containers/StoresForm/epics'
import StoresListEpics from 'Containers/StoresList/epics'
import UserFormEpics from 'Containers/UserForm/epics'
import UserListEpics from 'Containers/UserList/epics'
import TimeLogsEpics from 'Containers/Logs/epics'
import EmployeeFormEpics from 'Containers/EmployeeForm/epics'

import DashboardRootEpics from 'RootContainers/Dashboard/epics'

export default combineEpics(
  DashboardRootEpics,
  DashboardEpics,
  EmployeeFormEpics,
  LoginEpics,
  SearchAddressModalEpics,
  StoresFormEpics,
  StoresListEpics,
  TimeLogsEpics,
  UserFormEpics,
  UserListEpics
)
