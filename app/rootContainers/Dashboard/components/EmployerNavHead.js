import React, { Fragment, useContext } from 'react'
import { Menu } from 'semantic-ui-react'

import Context from './../context'

const EmployeeNavHead = () => {
  const { history } = useContext(Context)

  return (
    <Fragment>
      <Menu.Item
        as='a'
        onClick={() => history.push('/organizations/name-of-organization')}
      >
        Organization
      </Menu.Item>
      <Menu.Item
        as='a'
        onClick={() => history.push('/employees')}
      >
        Employees
      </Menu.Item>
    </Fragment>
  )
}

export default EmployeeNavHead
