import React, { useContext } from 'react'
import styled from 'styled-components'
import {
  Button,
  Grid,
  Menu,
  Icon
} from 'semantic-ui-react'
import { Switch } from 'react-router-dom'

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
  const { isExact } = match
  return (
    <Context.Provider value={{ history }}>
      <Grid
        textAlign='center'
        style={{ height: '100vh' }}
        verticalAlign='middle'
      >
        <Menu fixed='top' inverted>
          <Menu.Item as='a' header>
          PuSA
          </Menu.Item>
          <Menu.Item>Organization</Menu.Item>
          <Menu.Item>Users</Menu.Item>
        </Menu>
        <Grid.Column stretched style={{ width: '100vw' }}>
          {
            isExact &&
              <Grid container textAlign='center' columns='equal'>
                <Grid.Column>
                  <NavButton
                    icon='building'
                    label='Organization'
                    to='/organizations'
                  />
                </Grid.Column>
                <Grid.Column>
                  <NavButton
                    icon='users'
                    label='Users'
                    to='/users'
                  />
                </Grid.Column>
              </Grid>
          }
          {
            !isExact &&
              <Switch>
                {routes.map((r, i) => <RouteWithSubroutes key={i} {...r} />)}
              </Switch>
          }
        </Grid.Column>
      </Grid>
    </Context.Provider>
  )
}

export default DashboardRoot
