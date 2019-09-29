import React, {
  useEffect,
  useState,
  lazy
} from 'react'
import styled from 'styled-components'
import cx from 'classnames'
import { Switch, Redirect } from 'react-router-dom'

import RouteWithSubroutes from 'Components/RouteWithSubRoutes'

import NavHead from './components/NavHead.js'
import Context from './context'

const Container = styled.div`
  height: 100vh;
  
  > .content {
    overflow-y: auto;
  }
`
const LoadPayroll = lazy(() => import('Containers/Payroll' /* webpackChunkName: "Container-Payroll" */))

const LoadLogs = lazy(() => import('Containers/Logs' /* webpackChunkName: "Container-Payroll" */))

const LoadDashboard = lazy(() => import('Containers/Dashboard' /* webpackChunkName: "Containers-Dashboard" */))

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

  return (
    <Context.Provider value={{ history, profile }}>
      <Container className='l-d-f l-fd-col'>
        <NavHead />
        <div className={classNames}>
          {
            isExact && path === '/dashboard' &&
              <LoadDashboard />
          }
          {
            isExact && path === '/payroll' &&
              <LoadPayroll />
          }
          {
            isExact && path === '/logs' &&
              <LoadLogs />
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
            isExact && path === '/employees' &&
              <Redirect
                to='/employees/list'
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
