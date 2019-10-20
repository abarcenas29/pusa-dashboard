import React, { useCallback, useEffect, Fragment } from 'react'
import {
  Button,
  Form,
  Grid,
  Header,
  Segment
} from 'semantic-ui-react'
import { createStructuredSelector } from 'reselect'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { Form as ReactForm, Field, FormSpy } from 'react-final-form'

import { useMountReducer } from 'Helpers/hooks'

import reducer, {
  LOGIN_REQUEST_ACTION,
  LOGIN_SUCCESS_ACTION
} from './reducer'
import { userSelector } from './selectors'

export default ({ history }) => {
  useMountReducer('containerLogin', reducer)
  const dispatch = useDispatch()

  const { login } = useSelector(
    createStructuredSelector({
      login: userSelector()
    })
  )

  const onSubmit = useCallback(({ email, password }) => {
    dispatch(LOGIN_REQUEST_ACTION({ email, password }))
  }, [dispatch])

  useEffect(() => {
    if (login.email) {
      const { email, first_name, last_name, uid, type } = login
      localStorage.setItem('email', email)
      localStorage.setItem('firstName', first_name)
      localStorage.setItem('lastName', last_name)
      localStorage.setItem('id', uid)
      localStorage.setItem('role', type)
      if (login.store) {
        localStorage.setItem('store', login.store.uid)
      }
      if (login.employees.length > 0) {
        localStorage.setItem('employee', login.employees[0].uid)
        localStorage.setItem('storeId', login.employees[0].storeUid)
      }
      toast.success('Login Ok')
      history.push('/dashboard')
    }

    if (login.error) {
      toast.error(login.error)
    }
  }, [login])

  useEffect(() => {
    localStorage.clear()
    return () => {
      dispatch(LOGIN_SUCCESS_ACTION({}))
    }
  }, [])

  return (
    <Fragment>
      <Grid
        textAlign='center'
        style={{ height: '100vh' }}
        verticalAlign='middle'
        stackable
      >
        <Grid.Column computer={5} mobile={15}>
          <Header as='h2' color='teal' textAlign='center'>
          Pop-Store Attendance System & Payroll
          </Header>
          <ReactForm
            onSubmit={onSubmit}
          >
            {
              ({ handleSubmit }) => (
                <Form size='large' onSubmit={handleSubmit}>
                  <Segment stacked>
                    <Field name='email'>
                      {
                        props => (
                          <Form.Input
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder='E-mail address'
                            {...props.input}
                          />
                        )
                      }
                    </Field>
                    <Field name='password' type='password'>
                      {
                        props => (
                          <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            {...props.input}
                          />
                        )
                      }
                    </Field>
                    <FormSpy subscription={{ pristine: true }}>
                      {
                        ({ pristine }) => (
                          <Button
                            type='submit'
                            color='teal'
                            fluid
                            size='large'
                            disabled={pristine}
                          >
                            Login
                          </Button>
                        )
                      }
                    </FormSpy>
                  </Segment>
                </Form>
              )
            }
          </ReactForm>
        </Grid.Column>
      </Grid>
      <ToastContainer />
    </Fragment>
  )
}
