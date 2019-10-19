import React, { useEffect, useState } from 'react'

import { useMountReducer } from 'Helpers/hooks'

import reducer from './reducers'
import EmployeeDashboard from './components/Employee'
import NavButton from './components/NavButton'

export const Context = React.createContext({})

const Dashboard = () => {
  useMountReducer('containerDashboard', reducer)

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
        (profile.role === 'admin' || profile.role === 'owner') &&
          <NavButton />
      }
      {
        profile.role === 'employee' &&
          <EmployeeDashboard />
      }
    </Context.Provider>
  )
}

export default Dashboard
