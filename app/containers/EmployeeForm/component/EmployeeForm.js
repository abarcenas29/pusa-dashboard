import React from 'react'
import {
  Form,
  Grid,
  Segment
} from 'semantic-ui-react'

const EmployeeForm = ({
  first_name,
  last_name,
  middle_name,
  address,
  contact_no,
  employees
}) => {
  return (
    <Segment>
      <Grid>
        <Grid.Column>
          <Form className='l-d-f l-jc-cen'>
            <div className='l-d-f'>
              <div style={{ flexShrink: 0 }}>
                <Form.Group>
                  <Form.Field>
                    <label>First Name</label>
                    <input
                      value={first_name}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Middle Name</label>
                    <input
                      value={middle_name}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Last Name</label>
                    <input
                      value={last_name}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field style={{ flexShrink: 0 }}>
                    <label>Address</label>
                    <input value={address} />
                  </Form.Field>
                  <Form.Field className='l-w-100'>
                    <label>Mobile Number</label>
                    <input value={contact_no} />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field className='l-w-100'>
                    <input value={employees[0].rate} />
                    <label className='f-center'>Salary</label>
                  </Form.Field>
                  <Form.Field className='l-w-100'>
                    <input value={employees[0].shift_start} />
                    <label className='f-center'>Shift Start</label>
                  </Form.Field>
                  <Form.Field className='l-w-100'>
                    <input value={employees[0].shift_end} />
                    <label className='f-center'>Shift End</label>
                  </Form.Field>
                </Form.Group>
              </div>
            </div>
          </Form>
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

export default EmployeeForm
