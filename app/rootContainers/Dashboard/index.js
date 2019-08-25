import React, { useContext } from 'react'
import styled from 'styled-components'
import cx from 'classnames'
import {
  Button,
  Menu,
  Icon
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
  const classNames = cx(
    'content',
    'l-fg-1',
    { 'l-ai-cen': isExact && (path === '/dashboard') },
    { 'l-jc-cen': isExact && path === '/dashboard' },
    { 'l-d-f': isExact && path === '/dashboard' }
  )
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
            <Menu.Item
              as='a'
              onClick={() => history.push('/organizations')}
            >
            Organization
            </Menu.Item>
            <Menu.Item
              as='a'
              onClick={() => history.push('/users')}
            >
            Users
            </Menu.Item>
          </Menu>
        </div>
        <div className={classNames}>
          {
            isExact && path === '/dashboard' &&
              <div className='l-d-f l-ai-cen l-jc-cen'>
                <NavButton
                  icon='building'
                  label='Organization'
                  to='/organizations'
                />
                <NavButton
                  icon='users'
                  label='Users'
                  to='/users'
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
