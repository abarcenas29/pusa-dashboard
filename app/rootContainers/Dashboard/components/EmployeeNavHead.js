import React, { Fragment, useContext } from 'react'
import { Menu } from 'semantic-ui-react'

import Context from './../context'

const EmployeeNavHead = () => {
  const { history } = useContext(Context)

  return (
    <Fragment>
      <Menu.Item
        as='a'
        onClick={() => history.push('/logs')}
      >
        Logs
      </Menu.Item>
    </Fragment>
  )
}

export default EmployeeNavHead
