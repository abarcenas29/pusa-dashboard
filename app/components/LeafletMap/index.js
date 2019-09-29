import 'leaflet/dist/leaflet.css'

import React from 'react'
import { Map as LeafletMap, TileLayer } from 'react-leaflet'

import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

const Map = React.forwardRef(({ children, height, ...props }, ref) => {
  return (
    <LeafletMap
      {...props}
      style={{ width: '100%', height: `${height || 400}px` }}
    >
      <TileLayer
        url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
      />
      {children}
    </LeafletMap>
  )
})

export default Map
