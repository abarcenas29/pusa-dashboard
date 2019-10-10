import React, { useEffect, useContext } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { Field } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { Context } from './../index'
import {
  LIST_USERS_REQUEST_ACTION
} from './../reducers'
import { userOptionsSelector } from './../selectors'

const StoreForm = ({ handleSubmit, form }) => {
  const storeId = localStorage.getItem('store')
  const dispatch = useDispatch()
  const {
    coords,
    setShowCoordSearchModal
  } = useContext(Context)

  const { userOptions } = useSelector(
    createStructuredSelector({
      userOptions: userOptionsSelector()
    })
  )

  useEffect(() => {
    dispatch(LIST_USERS_REQUEST_ACTION())
  }, [])

  useEffect(() => {
    if (coords.lat && coords.lng) {
      form.change('lat', coords.lat)
      form.change('long', coords.lng)
    }
  }, [coords])

  return (
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
                  disabled={!!storeId}
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

export default StoreForm
