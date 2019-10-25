import React, { useEffect, useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import dayjs from 'dayjs'
import L from 'leaflet'
import {
  Button,
  Grid,
  Header,
  Segment,
  Table
} from 'semantic-ui-react'

import { MAP_RADIUS } from 'App/constants'
import EmployeeDetailModal from 'Components/EmployeeDetailModal'
import { useMountReducer } from 'Helpers/hooks'
import { STORE_INFO_REQUEST_ACTION } from 'RootContainers/Dashboard/reducers'
import { storeInfoSelector } from 'RootContainers/Dashboard/selectors'
import Context from 'RootContainers/Dashboard/context'

import { timeLogListSelector } from './selectors'
import reducer, { LOG_LIST_REQUEST_ACTION } from './reducers'

const Logs = ({ id }) => {
  useMountReducer('containerLogs', reducer)
  const empId = id || localStorage.getItem('employee')
  const dispatch = useDispatch()
  const { history } = useContext(Context)
  const [showEmpDetailModal, setShowEmpDetailmodal] = useState(false)
  const [selectedRow, setSelectedRow] = useState({})

  const { list, storeInfo } = useSelector(
    createStructuredSelector({
      list: timeLogListSelector(),
      storeInfo: storeInfoSelector()
    })
  )

  useEffect(() => {
    const storeId = localStorage.getItem('storeId')
    dispatch(LOG_LIST_REQUEST_ACTION(empId))
    dispatch(STORE_INFO_REQUEST_ACTION(storeId))
  }, [])

  return (
    <div className='l-pa2'>
      <Grid container>
        <Grid.Column>
          <Segment>
            <div className='l-d-f l-jc-sb l-ai-cen'>
              <div>
                <Header>Log Time</Header>
              </div>
              <div>
                <Button
                  onClick={() => history.push('/dashboard')}
                >
                  Go Back
                </Button>
              </div>
            </div>
            <Table>
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
                  storeInfo &&
                  list.rows.map((r, i) => {
                    const { lat, long } = storeInfo
                    const { time_in_loc, time_out_loc } = r

                    const locTimeIn = L
                      .latLng({ lat, lng: long })
                      .distanceTo(JSON.parse(time_in_loc))
                    let locTimeOut = null

                    if (time_out_loc) {
                      locTimeOut = L
                        .latLng({ lat, lng: long })
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
                              setShowEmpDetailmodal(true)
                              setSelectedRow(r)
                            }}
                            icon='expand'
                          />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })
                }
              </Table.Body>
            </Table>
          </Segment>
        </Grid.Column>
      </Grid>
      {
        showEmpDetailModal &&
          <EmployeeDetailModal
            open={showEmpDetailModal}
            setOpen={setShowEmpDetailmodal}
            {...selectedRow}
            storeInfo={
              storeInfo ? { lat: storeInfo.lat, lng: storeInfo.long } : null
            }
          />
      }
    </div>
  )
}

export default Logs
