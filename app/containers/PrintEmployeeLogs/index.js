import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router-dom'
import { Header, Table } from 'semantic-ui-react'
import L from 'leaflet'
import dayjs from 'dayjs'

import { MAP_RADIUS } from 'App/constants'
import { STORE_INFO_REQUEST_ACTION } from 'RootContainers/Dashboard/reducers'
import { storeInfoSelector } from 'RootContainers/Dashboard/selectors'
import { useMountReducer } from 'Helpers/hooks'

import reducer, {
  EMPLOYEE_DETAIL_REQUEST_ACTION
} from './reducers'
import { employeeFormSelectors } from './selectors'

const PrintEmployeeLogs = ({ match }) => {
  useMountReducer('containerPrintEmployeeLogs', reducer)
  const dispatch = useDispatch()
  const [loc, setLoc] = useState({ lat: 0, long: 0 })
  const { params: { id } } = match

  const storeId = localStorage.getItem('store')

  const { form, storeInfo } = useSelector(
    createStructuredSelector({
      form: employeeFormSelectors(),
      storeInfo: storeInfoSelector()
    })
  )

  useEffect(() => {
    dispatch(
      EMPLOYEE_DETAIL_REQUEST_ACTION({
        where: {
          uid: id
        }
      })
    )
    dispatch(
      STORE_INFO_REQUEST_ACTION(storeId)
    )
  }, [])

  useEffect(() => {
    if (storeInfo) {
      setLoc({ lat: storeInfo.lat, lng: storeInfo.long })
    }
  }, [storeInfo])

  let total = 0
  if (form) {
    if (form.employees[0].times.length > 0) {
      total = form.employees[0].times.filter(i => i.gross_pay)
        .map(i => i.gross_pay)
      total = (total.length > 0) ? total.reduce((a, c) => a + c) : 0
    }
  }

  return (
    <div className='l-d-b'>
      <div className='hide-on-print'>
        <Link to={`/employees/detail/${id}`}>Go Back</Link>
      </div>
      <Header as='h1' className='f-center'>
        Attendance Logs For The Month of {`${dayjs().format('MMMM')}`}
      </Header>
      {
        storeInfo &&
          <Header className='f-center' as='h2'>
            {`${storeInfo.name}`}
          </Header>
      }
      {
        form &&
          <ul className='l-d-f l-jc-cen l-pa0 l-ma0 l-lst-n'>
            <li className='l-w-100'>
              Name: <span className='f-bold'>{`${form.last_name}, ${form.first_name}, ${form.middle_name}`}</span>
            </li>
            <li className='l-w-100'>
              Address: <span className='f-bold'>{`${form.address}`}</span>
            </li>
            <li className='l-w-100'>
              Mobile Number: <span className='f-bold'>{`${form.contact_no}`}</span>
            </li>
          </ul>
      }
      {
        form &&
          <div className='l-d-f l-jc-cen l-pt2'>
            <Table basic='very' celled collapsing>
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
                  <Table.HeaderCell>Outside</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {
                  form.employees[0].times.map((r, i) => {
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
                          {
                            locTimeIn > MAP_RADIUS |
                            locTimeOut > MAP_RADIUS &&
                            'Yes'
                          }
                        </Table.Cell>
                      </Table.Row>
                    )
                  })
                }
              </Table.Body>
              <Table.Footer>
                <Table.Row textAlign='right'>
                  <Table.HeaderCell
                    colSpan='9'
                    className='l-w-100'
                    style={{ textAlign: 'left' }}
                  >
                    <div className='l-d-f l-jc-sb l-ai-cen'>
                      <div>
                        Total: {total.toFixed(2)}
                      </div>
                    </div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </div>
      }
    </div>
  )
}

export default PrintEmployeeLogs
