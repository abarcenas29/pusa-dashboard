import React, { useEffect } from 'react'
import { Form as FinalForm } from 'react-final-form'
import {
  Container,
  Grid,
  Header,
  Segment
} from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { useMountReducer } from 'Helpers/hooks'
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
  const dispatch = useDispatch()

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
            <Grid.Column textAlign='left'>
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
      </Container>
    </Context.Provider>
  )
}

export default OrganizationForm
