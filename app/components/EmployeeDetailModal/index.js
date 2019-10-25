import React, { useRef } from 'react'
import { Modal, Grid, Statistic } from 'semantic-ui-react'
import { Marker, Circle } from 'react-leaflet'
import dayjs from 'dayjs'
import L from 'leaflet'

import { MAP_RADIUS } from 'App/constants'
import LeafletMap from 'Components/LeafletMap'

const EmployeeDetailModal = ({
  open,
  setOpen,
  storeInfo,
  time_in,
  time_out,
  time_in_loc,
  time_out_loc,
  time_in_image,
  time_out_image,
  gross_pay
}) => {
  const mapRef = useRef()
  const latlngExample = [14.6189866, 121.1001908]

  const mapPosition = storeInfo || latlngExample
  const zoomValue = 17

  const locTimeIn = L
    .latLng(storeInfo)
    .distanceTo(JSON.parse(time_in_loc))

  let locTimeOut = null
  if (time_out_loc) {
    locTimeOut = L
      .latLng(storeInfo)
      .distanceTo(JSON.parse(time_out_loc))
  }

  return (
    <Modal
      open={open}
      onClose={() => { setOpen(false) }}
      size='tiny'
    >
      <Modal.Content className='l-d-f l-fd-col'>
        <div>
          <LeafletMap
            ref={mapRef}
            zoom={zoomValue}
            center={mapPosition}
          >
            <Circle
              center={mapPosition}
              radius={MAP_RADIUS}
            />
            {
              time_in_loc &&
                <Marker position={JSON.parse(time_in_loc)} />
            }
            {
              time_out_loc &&
                <Marker position={JSON.parse(time_out_loc)} />
            }
          </LeafletMap>
        </div>
        <div className='l-mt1 l-mb1'>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <img src={time_in_image} />
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <img src={time_out_image} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <Statistic size='mini' color={(locTimeIn > MAP_RADIUS) ? 'red' : null}>
                  <Statistic.Value>
                    {
                      dayjs(time_in).format('MMM DD, YYYY h:mm a')
                    }
                  </Statistic.Value>
                  {
                    locTimeIn > MAP_RADIUS &&
                      <Statistic.Label>Loggined in far-away</Statistic.Label>
                  }
                  <Statistic.Label>Time-In</Statistic.Label>
                </Statistic>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <Statistic size='mini' color={locTimeOut > MAP_RADIUS ? 'red' : null}>
                  <Statistic.Value>
                    {
                      time_out &&
                      dayjs(time_out).format('MMM DD, YYYY h:mm a')
                    }
                    {
                      !time_out && 'N/A'
                    }
                  </Statistic.Value>
                  {
                    locTimeIn > MAP_RADIUS && locTimeOut &&
                      <Statistic.Label>Loggined in far-away</Statistic.Label>
                  }
                  <Statistic.Label>Time-Out</Statistic.Label>
                </Statistic>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column textAlign='center'>
                <Statistic size='tiny'>
                  <Statistic.Value>
                    {
                      gross_pay
                    }
                    {
                      !gross_pay && 'N/A'
                    }
                  </Statistic.Value>
                  <Statistic.Label>Total Payout</Statistic.Label>
                </Statistic>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </Modal.Content>
    </Modal>
  )
}

export default EmployeeDetailModal
