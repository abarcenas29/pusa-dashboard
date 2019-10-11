import React, { useRef, useEffect, useState } from 'react'
import { Form as FinalForm } from 'react-final-form'
import { createStructuredSelector } from 'reselect'
import { Marker, Circle } from 'react-leaflet'
import {
  Button,
  Grid,
  Header,
  Segment,
  Table
} from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import L from 'leaflet'
import dayjs from 'dayjs'
import LeafletMap from 'Components/LeafletMap'

import {
  CHECK_IN_REQUEST_ACTION,
  STORE_INFO_REQUEST_ACTION,
  SUBMIT_CHECK_IN_REQUEST_ACTION
} from './../reducers'
import {
  checkInSelector,
  storeInfoSelector,
  timeLogSelector
} from './../selectors'
import AttendanceForm from './AttendanceForm'

const Employee = () => {
  const mapRef = useRef()
  const dispatch = useDispatch()

  const [distanceTolerance] = useState(300)
  const [storeCoord, setStoreCoord] = useState([51.505, -0.09])
  const [markers, setMarkers] = useState([])

  const { checkIn, storeInfo, timeLog } = useSelector(createStructuredSelector({
    checkIn: checkInSelector(),
    storeInfo: storeInfoSelector(),
    timeLog: timeLogSelector()
  }))

  const onSubmit = values => {
    if ('geolocation' in navigator) {
      navigator
        .geolocation
        .getCurrentPosition(p => {
          const { coords: { latitude, longitude } } = p
          const { action } = values

          let newValues = {}
          switch (action) {
            case 'time-in':
              newValues = {
                ...values,
                created_by: localStorage.getItem('id'),
                employeeUid: localStorage.getItem('employee'),
                time_in: new Date(),
                time_in_loc: JSON.stringify({ lat: latitude, lng: longitude })
              }
              break
            case 'time-out':
              newValues = {
                ...values,
                time_out: new Date(),
                time_out_loc: JSON.stringify({ lat: latitude, lng: longitude }),
                options: {
                  where: {
                    uId: timeLog[0].uid
                  }
                }
              }
              break
          }
          dispatch(SUBMIT_CHECK_IN_REQUEST_ACTION(newValues))
        }, e => {
          console.log(e)
        }, { timeout: 5000 })
    } else {
      console.log('no geolocation found')
    }
  }

  useEffect(() => {
    const storeId = localStorage.getItem('storeId')
    dispatch(CHECK_IN_REQUEST_ACTION())
    dispatch(STORE_INFO_REQUEST_ACTION(storeId))
  }, [])

  useEffect(() => {
    if (storeInfo) {
      const { lat, long } = storeInfo
      if (lat && long) {
        setStoreCoord([lat, long])
      }
    }
  }, [storeInfo])

  useEffect(() => {
    if (timeLog.length > 0) {
      const checkInMarkers = []
      const { time_in_loc, time_out_loc } = timeLog[0]

      if (time_in_loc) {
        checkInMarkers.push(JSON.parse(time_in_loc))
      }

      if (time_out_loc) {
        checkInMarkers.push(JSON.parse(time_out_loc))
      }

      setMarkers(checkInMarkers)
    }
  }, [timeLog])

  const CheckInRow = props => {
    const { lat, lng } = props.loc
    const distance = L
      .latLng({ lat: storeCoord[0], lng: storeCoord[1] })
      .distanceTo({ lat, lng })

    return (
      <Table.Row negative={distance > distanceTolerance}>
        <Table.Cell>{props.type}</Table.Cell>
        <Table.Cell>
          {
            dayjs(props.date).format('MMM DD, YYYY HH:mm')
          }
        </Table.Cell>
        {
          distance > distanceTolerance &&
            <Table.Cell>Logged Too Far Away</Table.Cell>
        }
      </Table.Row>
    )
  }

  return (
    <Grid container centered>
      <Grid.Row>
        <Grid.Column computer={7}>
          <Segment>
            <Header>Attendance</Header>
            <LeafletMap
              onClick={() => {}}
              ref={mapRef}
              zoom={15}
              center={storeCoord}
              height={250}
            >
              {
                markers.map((m, i) => (
                  <Marker key={i} position={m} />
                ))
              }
              {
                storeCoord &&
                  <Marker
                    position={{ lat: storeCoord[0], lng: storeCoord[1] }}
                  />
              }
              <Circle
                center={storeCoord}
                radius={distanceTolerance}
              />
            </LeafletMap>
            {
              checkIn.length > 0 &&
                <Table compact striped>
                  <Table.Body>
                    {
                      checkIn[0].date &&
                        <CheckInRow {...checkIn[0]} />
                    }
                    {
                      checkIn[1].date &&
                        <CheckInRow {...checkIn[1]} />
                    }
                  </Table.Body>
                </Table>
            }
            {
              checkIn.length === 0 &&
                <br />
            }
            <FinalForm
              onSubmit={onSubmit}
              component={AttendanceForm}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column computer={7}>
          <Grid.Column computer={7}>
            <Segment>
              <Header>Payroll</Header>
              <Table compact striped>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Cut-off</Table.HeaderCell>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>September 26 - October 11 2019</Table.Cell>
                    <Table.Cell>9999.99</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>October 12 - October 25 2019</Table.Cell>
                    <Table.Cell>9999.99</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <Button compact fluid>View Payroll</Button>
            </Segment>
          </Grid.Column>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default Employee
