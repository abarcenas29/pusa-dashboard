import React from 'react'
import {
  Button,
  Form,
  Grid,
  Segment,
  Image
} from 'semantic-ui-react'

const EmployeeForm = () => {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={3}>
          <Image
            circular
            src='https://via.placeholder.com/250/250'
          />
        </Grid.Column>
        <Grid.Column width={13}>
          <Form className='l-d-f l-fd-col'>
            <div className='l-d-f'>
              <div style={{ flexShrink: 0 }}>
                <Form.Group>
                  <Form.Field>
                    <label>First Name</label>
                    <input placeholder='First Name' />
                  </Form.Field>
                  <Form.Field>
                    <label>Middle Name</label>
                    <input placeholder='First Name' />
                  </Form.Field>
                  <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='First Name' />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field style={{ flexShrink: 0 }}>
                    <label>Address</label>
                    <input placeholder='First Name' />
                  </Form.Field>
                  <Form.Field className='l-w-100'>
                    <label>Mobile Number</label>
                    <input placeholder='First Name' />
                  </Form.Field>
                </Form.Group>
              </div>
              <div className='l-pa1 l-d-f l-jc-cen l-ai-cen l-w-100'>
                <Form.Field>
                  <input placeholder='Salary' />
                  <label className='f-center'>Salary</label>
                </Form.Field>
              </div>
            </div>
            <div className='l-d-f l-jc-fe'>
              <Button>Save</Button>
            </div>
          </Form>
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

export default EmployeeForm
