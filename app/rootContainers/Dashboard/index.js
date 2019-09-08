import React, {
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import styled from 'styled-components'
import cx from 'classnames'
import {
  Button,
  Menu,
  Icon,
  Image
} from 'semantic-ui-react'
import { Switch, Redirect } from 'react-router-dom'

import Context from './context'
import RouteWithSubroutes from 'Components/RouteWithSubRoutes'

const ButtonContent = styled.div`
  > .icon {
    display: block;
  }
  > .label {
    padding: 1rem 0;
  }
`

const Container = styled.div`
  height: 100vh;
  
  > .content {
    overflow-y: auto;
  }
`

const userLinks = role => {
  switch (role) {
    case 'admin':
      return '/users'
    case 'owner':
      return '/employees'
    default:
      return null
  }
}

const orgLinks = role => {
  switch (role) {
    case 'admin':
      return '/organizations'
    case 'owner':
      return '/organizations/name-of-organization'
    default:
      return null
  }
}

const NavButton = ({ icon, label, to }) => {
  const { history } = useContext(Context)
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

const DashboardRoot = ({ routes, match, history }) => {
  const { isExact, path } = match
  const [profile, setProfile] = useState({
    name: null,
    role: null
  })
  const classNames = cx(
    'content',
    'l-fg-1',
    { 'l-ai-cen': isExact && (path === '/dashboard') },
    { 'l-jc-cen': isExact && path === '/dashboard' },
    { 'l-d-f': isExact && path === '/dashboard' }
  )

  useEffect(() => {
    const firstName = localStorage.getItem('firstName')
    const lastName = localStorage.getItem('lastName')
    const role = localStorage.getItem('role')

    setProfile({
      name: `${firstName} ${lastName}`,
      role
    })
  }, [])

  const handleLogout = useCallback(() => {
    localStorage.clear()
    history.push('/')
  }, [])

  const handleOrganization = useCallback(() => {
    const { role } = profile
    return history.push(orgLinks(role))
  }, [profile])

  const handleUsers = useCallback(() => {
    const { role } = profile
    return history.push(userLinks(role))
  }, [profile])

  return (
    <Context.Provider value={{ history }}>
      <Container className='l-d-f l-fd-col'>
        <div className='main-nav'>
          <Menu inverted>
            <Menu.Item
              as='a'
              header
              onClick={() => history.push('/dashboard')}
            >
            PuSA
            </Menu.Item>
            {
              profile.role !== 'employee' &&
                <Menu.Item
                  as='a'
                  onClick={handleOrganization}
                >
                  Organization
                </Menu.Item>
            }
            <Menu.Item
              as='a'
              onClick={handleUsers}
            >
              Users
            </Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item
                onClick={handleLogout}
                className='l-d-b'
              >
                <div className='l-d-f'>
                  <div className='l-d-f l-ai-cen l-pa1'>
                    <Image
                      size='mini'
                      circular
                      src='https://via.placeholder.com/250/250'
                    />
                  </div>
                  <div className='l-d-f l-ai-cen l-ml1 l-mr1'>
                    <div className='l-d-b'>
                      <div
                        className='f-bold f-italic'
                        style={{ marginBottom: 5 }}
                      >
                        {profile.name}
                      </div>
                      <div>Logout</div>
                    </div>
                  </div>
                </div>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </div>
        <div className={classNames}>
          {
            isExact && path === '/dashboard' &&
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
          }
          {
            isExact && path === '/organizations' &&
              <Redirect
                to='/organizations/list'
              />
          }
          {
            isExact && path === '/users' &&
              <Redirect
                to='/users/list'
              />
          }
          {
            !isExact &&
              <Switch>
                {routes.map((r, i) => <RouteWithSubroutes key={i} {...r} />)}
              </Switch>
          }
        </div>
      </Container>
    </Context.Provider>
  )
}

export default DashboardRoot
