import 'leaflet/dist/leaflet.css'

import React, { useRef, useState } from 'react'
import { Button, Modal, Grid, Input } from 'semantic-ui-react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet'

import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

const CoordSearchModal = ({ open, setOpen }) => {
  const mapRef = useRef()

  const [markers, setMarkers] = useState([])

  const position = [51.505, -0.09]

  const handleClick = e => {
    setMarkers(prevState => [...prevState, e.latlng])
  }

  const clearMarkers = () => {
    setMarkers([])
  }

  const markerList = markers.map((p, i) => (
    <Marker key={i} position={p}>
      <Popup>Testing</Popup>
    </Marker>
  ))

  return (
    <Modal open={open} size='small'>
      <Modal.Header>
        Search Address
      </Modal.Header>
      <Modal.Content>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Input
                list='addresses'
                fluid
                placeholder='Type address here'
                size='large'
              />
              <datalist id='addresses'>
                <option value='address 1' />
              </datalist>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <LeafletMap
                onClick={handleClick}
                ref={mapRef}
                zoom={13}
                style={{ width: '100%', height: 400 }}
                center={position}
              >
                <TileLayer
                  url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                {markerList}
              </LeafletMap>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button secondary onClick={clearMarkers}>Clear</Button>
        <Button>Close</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default CoordSearchModal
