import React, { useEffect, useContext } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { Field, FormSpy } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { required } from 'App/validations'
import FieldError from 'Components/FieldError'

import { Context } from './../index'
import {
  LIST_USERS_REQUEST_ACTION
} from './../reducers'
import { userOptionsSelector } from './../selectors'

const normalizePhone = value => {
  if (!value) return value
  const onlyNums = value.replace(/[^\d]/g, '')
  if (onlyNums.length <= 4) return onlyNums
  if (onlyNums.length <= 7) {
    return `(${onlyNums.slice(0, 4)}) ${onlyNums.slice(4, 8)}`
  }
  return `(${onlyNums.slice(0, 4)}) ${onlyNums.slice(4, 7)}-${onlyNums.slice(
    7,
    11
  )}`
}

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
          validate={required}
        />
        <FieldError name='name' />
      </Form.Field>
      <Form.Field>
        <label>Address</label>
        <Field
          component='input'
          placeholder='Address'
          name='address'
          validate={required}
        />
        <FieldError name='address' />
      </Form.Field>
      <Form.Field>
        <label>Contact No</label>
        <Field
          component='input'
          placeholder='Contact number'
          name='tel'
          validate={required}
          parse={normalizePhone}
        />
        <FieldError name='tel' />
      </Form.Field>
      <Form.Field label='GPS' />
      <Form.Group widths='equal'>
        <Form.Field>
          <Field
            validate={required}
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
          <FieldError name='lat' />
        </Form.Field>
        <Form.Field>
          <Field
            validate={required}
            name='long'
          >
            {
              ({ input }) => {
                return (
                  <input
                    {...input}
                    placeholder='longitude'
                  />
                )
              }
            }
          </Field>
          <FieldError name='long' />
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
        <Field name='userUid' validate={required}>
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
        <FieldError name='userUid' />
      </Form.Field>
      <div className='l-d-f l-jc-sb'>
        <FormSpy subscription={{ pristine: true, invalid: true }}>
          {
            ({ pristine, invalid }) => (
              <Form.Button
                type='Submit'
                size='big'
                primary
                disabled={pristine || invalid}
              >
                Submit
              </Form.Button>
            )
          }
        </FormSpy>
      </div>
    </Form>
  )
}

export default StoreForm
