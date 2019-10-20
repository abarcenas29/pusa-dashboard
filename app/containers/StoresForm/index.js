import React, { useState, useEffect } from 'react'
import { Form as FinalForm } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  Container,
  Grid,
  Header,
  Segment
} from 'semantic-ui-react'

import CoordSearchModal from 'Components/CoordSearchModal'
import { useMountReducer } from 'Helpers/hooks'

import StoreForm from './components/Form'
import { storeFormSelector } from './selectors'
import reducer, {
  STORE_FORM_REQUEST_ACTION,
  STORE_FORM_SUCCESS_ACTION,
  SUBMIT_REQUEST_ACTION,
  UPDATE_REQUEST_ACTION
} from './reducers'

export const Context = React.createContext({
  coords: {}
})

const OrganizationForm = ({ location, match, ...props }) => {
  const { params: { id } } = match
  useMountReducer('containerStoreFormRedux', reducer)

  const dispatch = useDispatch()

  const { userForm } = useSelector(
    createStructuredSelector({
      userForm: storeFormSelector()
    })
  )

  const [showCoordSearchModal, setShowCoordSearchModal] = useState(false)
  const [coords, setCoords] = useState({})

  const onSubmit = values => {
    const { lat, lng } = coords
    let newValue = {
      lat,
      long: lng,
      ...values
    }

    if (id) {
      newValue = { uid: id, ...newValue }
      dispatch(UPDATE_REQUEST_ACTION(newValue))
    } else {
      dispatch(SUBMIT_REQUEST_ACTION(newValue))
    }
  }

  useEffect(() => {
    if (id) {
      dispatch(STORE_FORM_REQUEST_ACTION(id))
    }
    return () => {
      dispatch(STORE_FORM_SUCCESS_ACTION({ rows: [], count: 0 }))
    }
  }, [])

  useEffect(() => {
    if (Object.keys(userForm).length > 0) {
      setCoords([userForm.lat, userForm.long])
    }
  }, [userForm])

  return (
    <Context.Provider value={{ coords, setShowCoordSearchModal }}>
      <Container className='l-mt2'>
        <Segment padded='very'>
          <Grid relaxed divided stackable>
            <Grid.Column textAlign='left'>
              <Header as='h2' textAlign='right'>
                {
                  id && 'Update Store'
                }
                {
                  !id && 'Create Store'
                }
              </Header>
              <FinalForm
                component={StoreForm}
                initialValues={userForm}
                onSubmit={onSubmit}
              />
            </Grid.Column>
          </Grid>
        </Segment>
        <CoordSearchModal
          open={showCoordSearchModal}
          setOpen={setShowCoordSearchModal}
          coords={(userForm.lat && userForm.long) ? coords : []}
          setCoords={setCoords}
        />
      </Container>
    </Context.Provider>
  )
}

export default OrganizationForm
