import React, { useState, useEffect } from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  Button,
  Container,
  Grid,
  Form,
  Image,
  Header,
  Segment
} from 'semantic-ui-react'

import CoordSearchModal from 'Components/CoordSearchModal'
import FileUploadModal from 'Components/FileUploadModal'
import { useMountReducer } from 'Helpers/hooks'

import { userOptionsSelector, storeFormSelector } from './selectors'
import reducer, {
  LIST_USERS_REQUEST_ACTION,
  STORE_FORM_REQUEST_ACTION,
  SUBMIT_REQUEST_ACTION,
  UPDATE_REQUEST_ACTION
} from './reducers'

const OrganizationForm = ({ location, match, ...props }) => {
  const { params: { id } } = match
  useMountReducer('containerStoreFormRedux', reducer)

  const dispatch = useDispatch()

  const { userOptions, userForm } = useSelector(
    createStructuredSelector({
      userOptions: userOptionsSelector(),
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
    dispatch(LIST_USERS_REQUEST_ACTION())
    if (id) {
      dispatch(STORE_FORM_REQUEST_ACTION(id))
    }
  }, [])

  return (
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
              Create Store
            </Header>
            <FinalForm onSubmit={onSubmit} initialValues={userForm}>
              {
                ({ handleSubmit }) => (
                  <Form size='big' onSubmit={handleSubmit}>
                    <Form.Field>
                      <label>Name</label>
                      <Field
                        component='input'
                        placeholder='Name'
                        name='name'
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Address</label>
                      <Field
                        component='input'
                        placeholder='Address'
                        name='address'
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Contact No</label>
                      <Field
                        component='input'
                        placeholder='Contact number'
                        name='tel'
                      />
                    </Form.Field>
                    <Form.Field label='GPS' />
                    <Form.Group widths='equal'>
                      <Form.Field>
                        <Field
                          name='long'
                        >
                          {
                            ({ input }) => {
                              input.value = coords.lng
                              if (userForm) {
                                input.value = userForm.long
                              }
                              return (
                                <input
                                  {...input}
                                  placeholder='longtitude'
                                />
                              )
                            }
                          }
                        </Field>
                      </Form.Field>
                      <Form.Field>
                        <Field
                          name='lat'
                        >
                          {
                            ({ input }) => {
                              input.value = coords.lat
                              if (userForm) {
                                input.value = userForm.lat
                              }
                              return (
                                <input
                                  {...input}
                                  placeholder='latitude'
                                />
                              )
                            }
                          }
                        </Field>
                      </Form.Field>
                      <Form.Field
                        className='l-d-f l-jc-fe'
                      >
                        <Button
                          type='button'
                          size='big'
                          icon='map marker'
                          onClick={() => setShowCoordSearchModal(true)}
                        />
                      </Form.Field>
                    </Form.Group>
                    <Form.Field>
                      <label>Owner</label>
                      <Field name='userUid'>
                        {
                          ({ input, ...props }) => {
                            const { onChange, value, ...restInput } = input
                            return (
                              <Form.Select
                                value={value}
                                onChange={(e, v) => {
                                  onChange(v.value)
                                }}
                                {...restInput}
                                options={userOptions}
                              />
                            )
                          }
                        }
                      </Field>
                    </Form.Field>
                    <div className='l-d-f l-jc-sb'>
                      <Form.Button type='button' size='big' negative>
                        Delete
                      </Form.Button>
                      <Form.Button type='Submit' size='big' primary>
                        Submit
                      </Form.Button>
                    </div>
                  </Form>
                )
              }
            </FinalForm>
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
        coords={[userForm.lat, userForm.long]}
        setCoords={setCoords}
      />
    </Container>
  )
}

export default OrganizationForm
