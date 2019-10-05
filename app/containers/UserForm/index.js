import React, { useState, useEffect } from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import {
  Container,
  Grid,
  Form,
  Image,
  Header,
  Segment
} from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { useMountReducer } from 'Helpers/hooks'
import FileUploadModal from 'Components/FileUploadModal'

import reducer, {
  SUBMIT_REQUEST_ACTION,
  USER_FORM_REQUEST_ACTION,
  USER_FORM_SUCCESS_ACTION,
  UPDATE_REQUEST_ACTION
} from './reducer'
import { userFormSelector } from './selectors'

const options = [
  { text: 'Admin', value: 'admin' },
  { text: 'Owner', value: 'owner' },
  { text: 'Employee', value: 'employee' }
]

const OrganizationForm = ({ location, match, ...props }) => {
  useMountReducer('containerUserForm', reducer)
  const dispatch = useDispatch()

  const [croppedImage, setCroppedImage] = useState(null)
  const [showFileModal, setShowFileModal] = useState(false)

  const { form } = useSelector(
    createStructuredSelector({
      form: userFormSelector()
    })
  )

  const onSubmit = values => {
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
            >
              {
                ({ handleSubmit }) => (
                  <Form size='big' onSubmit={handleSubmit}>
                    <Form.Group widths='equal'>
                      <Form.Field>
                        <label>First Name</label>
                        <Field
                          component='input'
                          placeholder='First Name'
                          name='first_name'
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Last Name</label>
                        <Field
                          component='input'
                          placeholder='Last Name'
                          name='last_name'
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Middle Name</label>
                        <Field
                          component='input'
                          placeholder='Middle Name'
                          name='middle_name'
                        />
                      </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Form.Field>
                        <label>Address</label>
                        <Field
                          component='input'
                          placeholder='Address'
                          name='address'
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Mobile No</label>
                        <Field
                          component='input'
                          placeholder='Mobile Number'
                          name='contact_no'
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Email</label>
                        <Field
                          component='input'
                          placeholder='Email'
                          name='email'
                        />
                      </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Form.Field>
                        <label>Password</label>
                        <Field
                          component='input'
                          placeholder='Password'
                          name='password'
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Repeat Password</label>
                        <Field
                          component='input'
                          placeholder='Password'
                          name='repeat_password'
                        />
                      </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Form.Field>
                        <label>Type</label>
                        <Field name='type'>
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
                                  options={options}
                                />
                              )
                            }
                          }
                        </Field>
                      </Form.Field>
                      <Form.Field>
                        <label>Daily Rate</label>
                        <Field
                          component='input'
                          placeholder='Salary'
                          name='salary'
                        />
                      </Form.Field>
                    </Form.Group>
                    <div className='l-d-f l-jc-sb'>
                      {
                        match.path !== '/users/create' &&
                          <Form.Button type='button' size='big' negative>
                            Delete
                          </Form.Button>
                      }
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
    </Container>
  )
}

export default OrganizationForm
