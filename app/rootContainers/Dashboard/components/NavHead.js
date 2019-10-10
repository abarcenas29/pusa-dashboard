import React, { useContext, useCallback } from 'react'
import {
  Image,
  Menu
} from 'semantic-ui-react'

import Context from './../context'
import AdminNavHead from './AdminNavHead'
import EmployeeNavHead from './EmployeeNavHead'
import EmployerNavHead from './EmployerNavHead'

const NavHead = () => {
  const {
    history,
    profile
  } = useContext(Context)

  const handleLogout = useCallback(() => {
    localStorage.clear()
    history.push('/')
  }, [])

  return (
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
          profile.role === 'admin' &&
            <AdminNavHead />
        }
        {
          profile.role === 'owner' &&
            <EmployerNavHead />
        }
        {
          profile.role === 'employee' &&
            <EmployeeNavHead />
        }
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
  )
}

export default NavHead
