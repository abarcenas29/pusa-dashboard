import React, { useRef, useEffect, useState } from 'react'
import { Form as FinalForm } from 'react-final-form'
import { createStructuredSelector } from 'reselect'
import { Marker, Circle } from 'react-leaflet'
import {
  Grid,
  Header,
  Segment,
  Statistic,
  Table
} from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import L from 'leaflet'
import dayjs from 'dayjs'
import LeafletMap from 'Components/LeafletMap'

import { MAP_RADIUS } from 'App/constants'
import {
  STORE_INFO_REQUEST_ACTION
} from 'RootContainers/Dashboard/reducers'
import {
  storeInfoSelector
} from 'RootContainers/Dashboard/selectors'

import {
  CHECK_IN_REQUEST_ACTION,
  LOG_LIST_REQUEST_ACTION,
  SUBMIT_CHECK_IN_REQUEST_ACTION
} from './../reducers'
import {
  checkInSelector,
  timeLogSelector,
  totalPayLogs
} from './../selectors'
import AttendanceForm from './AttendanceForm'

const Employee = () => {
  const mapRef = useRef()
  const dispatch = useDispatch()

  const [storeCoord, setStoreCoord] = useState([51.505, -0.09])
  const [markers, setMarkers] = useState([])

  const { checkIn, storeInfo, timeLog, totalPay } = useSelector(createStructuredSelector({
    checkIn: checkInSelector(),
    storeInfo: storeInfoSelector(),
    timeLog: timeLogSelector(),
    totalPay: totalPayLogs()
  }))

  const onSubmit = values => {
    if ('geolocation' in navigator) {
      navigator
        .geolocation
        .getCurrentPosition(p => {
          const { coords: { latitude, longitude } } = p
          const { action } = values
          const { image, ...rest } = values

          let newValues = {}
          switch (action) {
            case 'time-in':
              newValues = {
                ...rest,
                time_in_image: image,
                created_by: localStorage.getItem('id'),
                employeeUid: localStorage.getItem('employee'),
                time_in: new Date(),
                time_in_loc: JSON.stringify({ lat: latitude, lng: longitude })
              }
              break
            case 'time-out':
              newValues = {
                ...rest,
                time_out_image: image,
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
    dispatch(LOG_LIST_REQUEST_ACTION(localStorage.getItem('employee')))
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
      <Table.Row negative={distance > MAP_RADIUS}>
        <Table.Cell>{props.type}</Table.Cell>
        <Table.Cell>
          {
            dayjs(props.date).format('MMM DD, YYYY HH:mm')
          }
        </Table.Cell>
        {
          distance > MAP_RADIUS &&
            <Table.Cell>Logged Too Far Away</Table.Cell>
        }
      </Table.Row>
    )
  }

  return (
    <Grid centered fluid className='l-w-100'>
      <Grid.Column mobile={15} computer={7}>
        <Segment>
          <Header>Employee Attendance Dashboard</Header>
          <LeafletMap
            onClick={() => {}}
            ref={mapRef}
            zoom={15}
            center={storeCoord}
            height={250}
          >
            {
              storeCoord &&
                <Marker
                  position={{ lat: storeCoord[0], lng: storeCoord[1] }}
                />
            }
            {
              markers.map((m, i) => (
                <Marker key={i} position={m} />
              ))
            }
            <Circle
              center={storeCoord}
              radius={MAP_RADIUS}
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
            totalPay &&
              <div className='l-d-f l-jc-cen'>
                <Statistic>
                  <Statistic.Value>{totalPay.toFixed(2)}</Statistic.Value>
                  <Statistic.Label>Month Payout</Statistic.Label>
                </Statistic>
                <br />
              </div>
          }
          {
            checkIn.length === 0 &&
              <br />
          }
          <FinalForm
            checkIn={checkIn}
            onSubmit={onSubmit}
            component={AttendanceForm}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default Employee
