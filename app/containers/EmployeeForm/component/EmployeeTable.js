import React, { useContext } from 'react'
import L from 'leaflet'
import dayjs from 'dayjs'
import {
  Table,
  Button
} from 'semantic-ui-react'

import { MAP_RADIUS } from 'App/constants'

import Context from './../context'

const EmployeTable = ({ logs, loc }) => {
  const { setShoeEmployeeModal, setRowIndex } = useContext(Context)
  let total = 0
  if (logs.length > 0) {
    total = logs.filter(i => i.gross_pay)
      .map(i => i.gross_pay)
    total = (total.length > 0) ? total.reduce((a, c) => a + c) : 0
  }
  return (
    <Table padded size='large' striped selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Shift Start</Table.HeaderCell>
          <Table.HeaderCell>Shift End</Table.HeaderCell>
          <Table.HeaderCell>Time In</Table.HeaderCell>
          <Table.HeaderCell>Time Out</Table.HeaderCell>
          <Table.HeaderCell>Late Time</Table.HeaderCell>
          <Table.HeaderCell>Work Time</Table.HeaderCell>
          <Table.HeaderCell>Rate</Table.HeaderCell>
          <Table.HeaderCell>Gross Pay</Table.HeaderCell>
          <Table.HeaderCell>Location</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {
          logs.map((r, i) => {
            const { time_in_loc, time_out_loc } = r

            const locTimeIn = L
              .latLng(loc)
              .distanceTo(JSON.parse(time_in_loc))
            let locTimeOut = null

            if (time_out_loc) {
              locTimeOut = L
                .latLng(loc)
                .distanceTo(JSON.parse(time_out_loc))
            }
            return (
              <Table.Row
                key={i}
                negative={locTimeIn > MAP_RADIUS || locTimeOut > MAP_RADIUS}
              >
                <Table.Cell>
                  {dayjs(r.shift_start).format('MMM DD, YYYY h:mm a')}
                </Table.Cell>
                <Table.Cell>
                  {dayjs(r.shift_end).format('MMM DD, YYYY h:mm a')}
                </Table.Cell>
                <Table.Cell>
                  {dayjs(r.time_in).format('MMM DD, YYYY h:mm a')}
                </Table.Cell>
                <Table.Cell>
                  {
                    r.time_out &&
                      dayjs(r.time_out).format('MMM DD, YYYY h:mm a')
                  }
                  {
                    !r.time_out &&
                      'N/A'
                  }
                </Table.Cell>
                <Table.Cell>
                  {
                    r.late_time &&
                      r.late_time.toFixed(2)
                  }
                  {
                    !r.late_time &&
                      'N/A'
                  }
                </Table.Cell>
                <Table.Cell>
                  {
                    r.work_time &&
                      r.work_time.toFixed(2)
                  }
                  {
                    !r.work_time &&
                      'N/A'
                  }
                </Table.Cell>
                <Table.Cell>
                  {r.rate}
                </Table.Cell>
                <Table.Cell>
                  {
                    r.gross_pay &&
                      r.gross_pay.toFixed(2)
                  }
                  {
                    !r.gross_pay &&
                      'N/A'
                  }
                </Table.Cell>
                <Table.Cell>
                  <Button
                    negative={(locTimeIn > MAP_RADIUS) || (locTimeOut > MAP_RADIUS)}
                    onClick={() => {
                      setShoeEmployeeModal(true)
                      setRowIndex(r)
                    }}
                    icon='expand'
                  />
                </Table.Cell>
              </Table.Row>
            )
          })
        }
      </Table.Body>

      <Table.Footer>
        <Table.Row textAlign='right'>
          <Table.HeaderCell colSpan='1' style={{ textAlign: 'left' }}>
            Total: {total.toFixed(2)}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}

export default EmployeTable
