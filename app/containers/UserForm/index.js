import React, { useState, useEffect } from 'react'
import { Form as FinalForm } from 'react-final-form'
import {
  Container,
  Grid,
  Image,
  Header,
  Segment
} from 'semantic-ui-react'
// import TimePicker from 'react-time-picker'
import { useDispatch, useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { useMountReducer } from 'Helpers/hooks'
import FileUploadModal from 'Components/FileUploadModal'
import UserForm from './components/Form'

import reducer, {
  SUBMIT_REQUEST_ACTION,
  UPDATE_REQUEST_ACTION,
  USER_FORM_REQUEST_ACTION,
  USER_FORM_SUCCESS_ACTION
} from './reducer'
import { userFormSelector } from './selectors'

export const Context = React.createContext({})

const OrganizationForm = ({ location, match, ...props }) => {
  useMountReducer('containerUserForm', reducer)
  const storeId = localStorage.getItem('store')
  const dispatch = useDispatch()

  const [croppedImage, setCroppedImage] = useState(null)
  const [showFileModal, setShowFileModal] = useState(false)

  const { form } = useSelector(
    createStructuredSelector({
      form: userFormSelector()
    })
  )

  const onSubmit = values => {
    values.storeUid = localStorage.getItem('store')
    if (match.params.id) {
      const newValues = { uid: form.uid, ...values }
      dispatch(UPDATE_REQUEST_ACTION(newValues))
    } else {
      dispatch(SUBMIT_REQUEST_ACTION(values))
    }
  }

  useEffect(() => {
    const { params } = match
    if (params.id) {
      dispatch(USER_FORM_REQUEST_ACTION(params.id))
    }

    return () => {
      dispatch(USER_FORM_SUCCESS_ACTION({}))
    }
  }, [])

  return (
    <Context.Provider value={{ match }}>
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
                  match.params.id &&
                  'Update User'
                }
                {
                  !match.params.id &&
                  'Create User'
                }
              </Header>
              <FinalForm
                initialValues={form}
                onSubmit={onSubmit}
                component={UserForm}
              />
            </Grid.Column>
          </Grid>
        </Segment>
        <FileUploadModal
          setCroppedImage={setCroppedImage}
          open={showFileModal}
          setOpen={setShowFileModal}
        />
      </Container>
    </Context.Provider>
  )
}

export default OrganizationForm
