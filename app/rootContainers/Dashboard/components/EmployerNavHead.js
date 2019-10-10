import React, { Fragment, useContext } from 'react'
import { Menu } from 'semantic-ui-react'

import Context from './../context'

const EmployeeNavHead = () => {
  const storeId = localStorage.getItem('store')
  const { history } = useContext(Context)

  return (
    <Fragment>
      <Menu.Item
        as='a'
        onClick={() => history.push(`/stores/${storeId}`)}
      >
        Store
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
