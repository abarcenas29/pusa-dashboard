import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import DashboardRootContext from 'RootContainers/Dashboard/context'
import { userLinks, orgLinks } from 'RootContainers/Dashboard/helpers'

import {
  Button,
  Icon
} from 'semantic-ui-react'

const ButtonContent = styled.div`
  > .icon {
    display: block;
  }
  > .label {
    padding: 1rem 0;
  }
`

const NavButton = ({ icon, label, to }) => {
  const { history } = useContext(DashboardRootContext)
  return (
    <Button
      basic
      circular
      size='huge'
      onClick={() => history.push(to)}
    >
      <ButtonContent>
        <div className='icon'>
          <Icon fitted name={icon} size='huge' />
        </div>
        <div className='label'>
          {label}
        </div>
      </ButtonContent>
    </Button>
  )
}

const Dashboard = () => {
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
    <div className='l-d-f l-ai-cen l-jc-cen'>
      <NavButton
        icon='building'
        label='Organization'
        to={orgLinks(profile.role)}
      />
      <NavButton
        icon='users'
        label={(profile.role === 'owner')
          ? 'Employees' : 'Organizations'}
        to={userLinks(profile.role)}
      />
    </div>
  )
}

export default Dashboard
