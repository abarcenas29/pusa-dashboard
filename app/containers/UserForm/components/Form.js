import React from 'react'
import { Field } from 'react-final-form'
import { Form } from 'semantic-ui-react'

const role = localStorage.getItem('role')
const options = [
  { text: 'Admin', value: 'admin' },
  { text: 'Owner', value: 'owner' }
]

if (role !== 'admin') {
  options.push(
    { text: 'Employee', value: 'employee' })
}

const UserForm = ({ handleSubmit, form }) => {
  const storeId = localStorage.getItem('store')

  if (storeId) {
    form.change('type', 'employee')
  }

  return (
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
      </Form.Group>
      {
        storeId &&
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Shift Start</label>
              <Field
                component='input'
                name='employees.shift_start'
              />
            </Form.Field>
            <Form.Field>
              <label>Shift End</label>
              <Field
                component='input'
                name='employees.shift_end'
              />
            </Form.Field>
          </Form.Group>
      }
      <Form.Group widths='equal'>
        <Form.Field>
          <label>Type</label>
          <Field name='type'>
            {
              ({ input, ...props }) => {
                const { onChange, value, ...restInput } = input
                return (
                  <Form.Select
                    disabled={!!storeId}
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
        {
          storeId &&
            <Form.Field>
              <label>Daily Rate</label>
              <Field
                component='input'
                placeholder='Salary'
                name='employees.rate'
              />
            </Form.Field>
        }
      </Form.Group>
      <div className='l-d-f l-jc-sb'>
        <Form.Button type='Submit' size='big' primary>
          Submit
        </Form.Button>
      </div>
    </Form>
  )
}

export default UserForm
