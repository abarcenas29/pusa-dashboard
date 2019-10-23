import React, { useEffect, useState, Fragment } from 'react'

import { useMountReducer } from 'Helpers/hooks'

import reducer from './reducers'
import EmployeeDashboard from './components/Employee'
import NavButton from './components/NavButton'

export const Context = React.createContext({})

const Dashboard = () => {
  useMountReducer('containerDashboard', reducer)
  const storeId = localStorage.getItem('store')
  const [profile, setProfile] = useState({
    name: null,
    role: null
  })

  useEffect(() => {
    const firstName = localStorage.getItem('firstName')
    const lastName = localStorage.getItem('lastName')
    const role = localStorage.getItem('role')

    setProfile({
      name: `${firstName} ${lastName}`,
      role
    })
  }, [])

  return (
    <Context.Provider value={{ profile }}>
      {
        profile.role === 'admin' &&
          <Fragment>
            <NavButton icon='building' label='Stores' to='/stores/list' />
            <NavButton icon='users' label='Users' to='/users/list' />
          </Fragment>
      }
      {
        profile.role === 'owner' &&
          <Fragment>
            <NavButton
              icon='building'
              label='Store'
              to={`/stores/${storeId}`}
            />
            <NavButton
              icon='users'
              label='Employees'
              to='/employees/list'
            />
          </Fragment>
      }
      {
        profile.role === 'employee' &&
          <EmployeeDashboard />
      }
    </Context.Provider>
  )
}

export default Dashboard
