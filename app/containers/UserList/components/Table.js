import React, { useContext, useEffect } from 'react'
import { createStructuredSelector } from 'reselect'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import {
  Icon,
  Table
} from 'semantic-ui-react'

import {
  USER_LIST_REQUEST_ACTION,
  EMPLOYEE_LIST_REQUEST_ACTION
} from './../reducer'
import { listSelector } from './../selectors'
import Context from './../context'

const TableItem = props => {
  const { history } = useContext(Context)
  const {
    address,
    email,
    first_name,
    last_name,
    middle_name,
    uid
  } = props
  return (
    <Table.Row>
      <Table.Cell singleLine>
        {`${last_name} ${first_name}, ${middle_name}`}
      </Table.Cell>
      <Table.Cell>{`${address}`}</Table.Cell>
      <Table.Cell>{`${email}`}</Table.Cell>
      <Table.Cell singleLine>
        <div>
          <Icon
            name='edit'
            inverted
            bordered
            circular
            link
            onClick={() => history.push(`/users/${uid}`)}
          />
          {
            localStorage.getItem('role') === 'owner' &&
              <Icon
                name='expand'
                inverted
                bordered
                circular
                link
                onClick={() => {
                  history.push(`/employees/detail/${uid}`)
                }}
              />
          }
        </div>
      </Table.Cell>
    </Table.Row>
  )
}

const List = () => {
  const dispatch = useDispatch()

  const { list } = useSelector(
    createStructuredSelector({
      list: listSelector()
    })
  )

  useEffect(() => {
    const storeId = localStorage.getItem('store')
    if (storeId) {
      dispatch(
        EMPLOYEE_LIST_REQUEST_ACTION({
          storeUid: localStorage.getItem('store')
        })
      )
    } else {
      dispatch(USER_LIST_REQUEST_ACTION())
    }
  }, [])

  // useEffect(() => {
  //   console.log(list)
  // }, [list])

  return (
    <Table padded size='large' striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell singleLine>Name</Table.HeaderCell>
          <Table.HeaderCell>Address</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {
          list.rows.map((r, i) => (
            <TableItem {...r} key={i} />
          ))
        }
      </Table.Body>

      <Table.Footer />
    </Table>
  )
}

export default List
