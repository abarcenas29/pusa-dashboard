import React, { useContext } from 'react'
import {
  Icon,
  Pagination,
  Table
} from 'semantic-ui-react'

import Context from './../context.js'

const userDetailLink = role => {
  switch (role) {
    case 'admin':
      return '/user/detail'
    case 'owner':
      return '/employees/detail'
  }
}

const TableItem = () => {
  const { history, profile } = useContext(Context)
  return (
    <Table.Row>
      <Table.Cell singleLine>Solidad Romero</Table.Cell>
      <Table.Cell>123 Ficticious street, ficticious subdv, ficticious municipality, Rizal, PH</Table.Cell>
      <Table.Cell>fake@email.com</Table.Cell>
      <Table.Cell singleLine>
        <div>
          <Icon
            link
            bordered
            circular
            color='red'
            inverted
            name='trash'
          />
          <Icon
            name='edit'
            inverted
            bordered
            circular
            link
            onClick={() => history.push(userDetailLink(profile.role))}
          />
        </div>
      </Table.Cell>
    </Table.Row>
  )
}

const List = () => {
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
        <TableItem />
        <TableItem />
        <TableItem />
        <TableItem />
        <TableItem />
      </Table.Body>

      <Table.Footer>
        <Table.Row textAlign='right'>
          <Table.HeaderCell colSpan='4'>
            <Pagination defaultActivePage={5} totalPages={10} />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}

export default List
