import React, { useRef, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Button, Modal, Grid, Search } from 'semantic-ui-react'
import { Marker, Popup } from 'react-leaflet'
import qs from 'querystring'

import LeafletMap from 'Components/LeafletMap'
import { useMountReducer } from 'Helpers/hooks'

import reducer, { SEARCH_ADDRESS_REQUEST_ACTION } from './reducer'
import { addressesSelector, isLoadingSelector } from './selectors'

const CoordSearchModal = ({ open, setOpen }) => {
  useMountReducer('componentCoordSearchModal', reducer)

  const mapRef = useRef()
  const dispatch = useDispatch()

  const { addresses, isLoading } = useSelector(
    createStructuredSelector({
      addresses: addressesSelector(),
      isLoading: isLoadingSelector()
    })
  )

  const [markers, setMarkers] = useState([])
  const [selectedAddress, setSelectedAddresses] = useState('')
  const [mapPosition, setMapPosition] = useState([51.505, -0.09])
  const [zoomValue, setZoomValue] = useState(13)

  const searchAddressDispatch = useCallback(
    query => dispatch(SEARCH_ADDRESS_REQUEST_ACTION(query)),
    [dispatch]
  )

  const onSelectAddressClick = useCallback((e, { result: { lat, lon, title } }) => {
    setSelectedAddresses(title)
    setMapPosition([lat, lon])
    setZoomValue(18)
  }, [])

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
    <Modal open={open} onClose={() => setOpen(false)} size='small'>
      <Modal.Header>
        Search Address
      </Modal.Header>
      <Modal.Content>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Search
                loading={isLoading}
                onResultSelect={onSelectAddressClick}
                fluid
                input={
                  (Component, props) =>
                    <Component className='l-w-100' {...props} />
                }
                onSearchChange={(e, { value }) => {
                  const q = qs.stringify(
                    { q: value, format: 'jsonv2' }
                  )
                  setSelectedAddresses(value)
                  searchAddressDispatch(q)
                }}
                results={addresses}
                value={selectedAddress}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <LeafletMap
                onClick={handleClick}
                ref={mapRef}
                zoom={zoomValue}
                center={mapPosition}
              >
                {markerList}
              </LeafletMap>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button secondary onClick={clearMarkers}>Clear</Button>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default CoordSearchModal
