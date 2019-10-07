import React, { useState, useEffect } from 'react'
import { Form as FinalForm } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  Container,
  Grid,
  Image,
  Header,
  Segment
} from 'semantic-ui-react'

import CoordSearchModal from 'Components/CoordSearchModal'
import FileUploadModal from 'Components/FileUploadModal'
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

  const [croppedImage, setCroppedImage] = useState(null)
  const [showFileModal, setShowFileModal] = useState(false)
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
            <Grid.Column width={4}>
              <Image
                onClick={() => setShowFileModal(true)}
                centered
                circular
                src={croppedImage || 'https://via.placeholder.com/250/250'}
                size='medium'
              />
            </Grid.Column>
            <Grid.Column width={12} textAlign='left'>
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
        <FileUploadModal
          setCroppedImage={setCroppedImage}
          open={showFileModal}
          setOpen={setShowFileModal}
        />
        <CoordSearchModal
          open={showCoordSearchModal}
          setOpen={setShowCoordSearchModal}
          coords={coords[0] ? coords : null}
          setCoords={setCoords}
        />
      </Container>
    </Context.Provider>
  )
}

export default OrganizationForm
