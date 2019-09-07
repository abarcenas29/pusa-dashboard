import { createSelector } from 'reselect'

export const componentCoordSearchModalRedux = () => s =>
  s.componentCoordSearchModal

export const addressesSelector = () => createSelector(
  componentCoordSearchModalRedux(),
  s => s
    ? s.addresses.map(a => ({ title: a.display_name, lat: a.lat, lon: a.lon, key: a.place_id }))
    : []
)

export const isLoadingSelector = () => createSelector(
  componentCoordSearchModalRedux(),
  s => s ? s.isLoading : false
)
