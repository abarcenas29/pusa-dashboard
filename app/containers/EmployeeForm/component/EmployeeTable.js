import React, { useContext, useState } from 'react'
import {
  Table,
  Button,
  Pagination
} from 'semantic-ui-react'

import Context from './../context'

const EmployeTable = () => {
  const { setShoeEmployeeModal } = useContext(Context)
  const [rowIndex, setRowIndex] = useState(null)

  return (
    <Table padded size='large' striped selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell singleLine>
              Time In
          </Table.HeaderCell>
          <Table.HeaderCell>
              Time Out
          </Table.HeaderCell>
          <Table.HeaderCell>
              Hours
          </Table.HeaderCell>
          <Table.HeaderCell>
              Pay
          </Table.HeaderCell>
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row active={rowIndex === 0}>
          <Table.Cell>October 16, 2016 08:00:00</Table.Cell>
          <Table.Cell>October 16, 2016 17:00:00</Table.Cell>
          <Table.Cell>9</Table.Cell>
          <Table.Cell>520</Table.Cell>
          <Table.Cell textAlign='center'>
            <Button
              onClick={() => {
                setShoeEmployeeModal(true)
                setRowIndex(0)
              }}
              secondary={rowIndex === 0}
              icon='expand'
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row active={rowIndex === 1}>
          <Table.Cell>October 16, 2016 08:00:00</Table.Cell>
          <Table.Cell>October 16, 2016 17:00:00</Table.Cell>
          <Table.Cell>9</Table.Cell>
          <Table.Cell>520</Table.Cell>
          <Table.Cell textAlign='center'>
            <Button
              onClick={() => {
                setShoeEmployeeModal(true)
                setRowIndex(1)
              }}
              secondary={rowIndex === 1}
              icon='expand'
            />
          </Table.Cell>
        </Table.Row>
      </Table.Body>

      <Table.Footer>
        <Table.Row textAlign='right'>
          <Table.HeaderCell colSpan='1' style={{ textAlign: 'left' }}>
            Total: 9,999.99
          </Table.HeaderCell>
          <Table.HeaderCell colSpan='4'>
            <Pagination defaultActivePage={5} totalPages={10} />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}

export default EmployeTable
