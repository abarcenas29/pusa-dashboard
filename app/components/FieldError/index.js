import React from 'react'
import { Field } from 'react-final-form'
import { Label } from 'semantic-ui-react'

const FieldError = ({ name }) => {
  return (
    <Field name={name} subscription={{ error: true, touched: true }}>
      {
        ({ meta: { error, touched } }) => (
          error && touched ? <Label basic color='red' pointing>{error}</Label> : null
        )
      }
    </Field>
  )
}

export default FieldError
