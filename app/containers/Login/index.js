import 'react-toastify/dist/ReactToastify.css'

import React, { useEffect } from 'react'
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify'
import { Form as ReactForm, Field } from 'react-final-form'

import Users from './fakeLogin'

export default ({ history }) => {
  const onSubmit = value => {
    const { email, password } = value
    const foundUsers = Users.filter(user => (
      user.email === email &&
      user.password === password
    ))

    if (foundUsers.length > 0) {
      const {
        email,
        firstName,
        id,
        lastName,
        orgId,
        role
      } = foundUsers[0]

      localStorage.setItem('email', email)
      localStorage.setItem('firstName', firstName)
      localStorage.setItem('lastName', lastName)
      localStorage.setItem('id', id)
      localStorage.setItem('orgId', orgId)
      localStorage.setItem('role', role)
      history.push('/dashboard')

      toast.success('Logged In')
    } else {
      toast.error('Invalid Username/Password')
    }
  }

  useEffect(() => {
    localStorage.clear()
  }, [])

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 500, minWidth: 500 }}>
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

                  <Button
                    type='submit'
                    color='teal'
                    fluid
                    size='large'
                  >
                    Login
                  </Button>
                </Segment>
              </Form>
            )
          }
        </ReactForm>
        <Message>
          New to us? <a href='#'>Sign Up</a>
        </Message>
      </Grid.Column>
      <ToastContainer />
    </Grid>
  )
}
