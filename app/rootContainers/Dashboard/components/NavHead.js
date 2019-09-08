import React, { useContext, useCallback } from 'react'
import {
  Image,
  Menu
} from 'semantic-ui-react'

import { userLinks, orgLinks } from './../helpers'
import Context from './../context'

const NavHead = () => {
  const {
    history,
    profile
  } = useContext(Context)

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
          {
            profile.role === 'admin' &&
                'Users'
          }
          {
            profile.role === 'owner' &&
                'Employees'
          }
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
  )
}

export default NavHead
