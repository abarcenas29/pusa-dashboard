import React, { Fragment, useContext } from 'react'
import { Menu } from 'semantic-ui-react'

import Context from './../context'

const AdminNavHead = () => {
  const { history } = useContext(Context)
  return (
    <Fragment>
      <Menu.Item
        as='a'
        onClick={() => history.push('/stores')}
      >
        Stores
      </Menu.Item>
      <Menu.Item
        as='a'
        onClick={() => history.push('/users')}
      >
        Users
      </Menu.Item>
    </Fragment>
  )
}

export default AdminNavHead
