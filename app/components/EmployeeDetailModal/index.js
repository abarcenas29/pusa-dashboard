import React, { useRef } from 'react'
import { Modal, Grid, Statistic } from 'semantic-ui-react'
import { Marker, Circle } from 'react-leaflet'
import L from 'leaflet'

import LeafletMap from 'Components/LeafletMap'

const EmployeeDetailModal = ({ open, setOpen }) => {
  const mapRef = useRef()
  const latlngExample = [14.6189866, 121.1001908]

  const circlePoint = L.circle(latlngExample)
  const isInCircleRaidus = Math.abs(
    circlePoint.getLatLng().distanceTo([14.619415, 121.100240])
  )

  console.log(isInCircleRaidus, 'circle')
  const mapPosition = latlngExample
  const zoomValue = 17
  const markerList = [
    [14.619415, 121.100240]
  ]

  const markers = markerList.map((marker, index) => (
    <Marker key={index} position={marker} />
  ))

  return (
    <Modal open={open} onClose={() => { setOpen(false) }} size='tiny'>
      <Modal.Content className='l-d-f l-fd-col'>
        <div>
          <LeafletMap
            ref={mapRef}
            zoom={zoomValue}
            center={mapPosition}
          >
            <Circle
              center={mapPosition}
              radius={100}
            />
            {markers}
          </LeafletMap>
        </div>
        <div className='l-mt1 l-mb1'>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <Statistic size='mini'>
                  <Statistic.Value>
                    October 16 2016 <br /> 08:00
                  </Statistic.Value>
                  <Statistic.Label>Time-In</Statistic.Label>
                </Statistic>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <Statistic size='mini'>
                  <Statistic.Value>
                    October 16 2016 <br /> 17:00
                  </Statistic.Value>
                  <Statistic.Label>Time-Out</Statistic.Label>
                </Statistic>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column textAlign='center'>
                <Statistic size='tiny'>
                  <Statistic.Value>
                    521
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
