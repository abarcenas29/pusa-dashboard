import React, {
  useEffect,
  useState,
  lazy
} from 'react'
import styled from 'styled-components'
import cx from 'classnames'
import { ToastContainer } from 'react-toastify'
import { Switch, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import RouteWithSubroutes from 'Components/RouteWithSubRoutes'
import { REDIRECT_ACTION } from 'App/appReducer'

import { redirectSelector } from './selectors'
import NavHead from './components/NavHead.js'
import Context from './context'

const Container = styled.div`
  height: 100vh;
  
  > .content {
    overflow-y: auto;
  }
`
const LoadPayroll = lazy(() => import('Containers/Payroll'
  /* webpackChunkName: "Container-Payroll" */)
)

const LoadLogs = lazy(() => import('Containers/Logs'
  /* webpackChunkName: "Container-Payroll" */)
)

const LoadDashboard = lazy(() => import('Containers/Dashboard'
  /* webpackChunkName: "Containers-Dashboard" */)
)

const DashboardRoot = ({ routes, match, history }) => {
  const dispatch = useDispatch()
  const { redirect } = useSelector(
    createStructuredSelector(
      {
        redirect: redirectSelector()
      }
    )
  )
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

  useEffect(() => {
    if (redirect) {
      history.push(redirect)
      dispatch(REDIRECT_ACTION(null))
    }
  }, [redirect])

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
            isExact && path === '/stores' &&
              <Redirect
                to='/stores/list'
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
      <ToastContainer />
    </Context.Provider>
  )
}

export default DashboardRoot
