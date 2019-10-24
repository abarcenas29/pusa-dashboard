import React from 'react'
import { createStructuredSelector } from 'reselect'
import { Button, Form } from 'semantic-ui-react'
import { useSelector } from 'react-redux'

import { isLoadingSelector } from './../selectors'

const AttendanceForm = ({ handleSubmit, form }) => {
  const { isLoading } = useSelector(
    createStructuredSelector({
      isLoading: isLoadingSelector()
    })
  )

  return (
    <Form onSubmit={handleSubmit} loading={isLoading}>
      <ul className='l-ma0 l-pa0 l-lst-n'>
        <li className='l-mb1'>
          <Button
            compact
            fluid
            primary
            onClick={() => {
              form.change('action', 'time-in')
            }}
            type='button'
          >
            Time-In
          </Button>
        </li>
        <li className='l-mb1'>
          <Button
            compact
            fluid
            primary
            negative
            onClick={() => {
              form.change('action', 'time-out')
            }}
            type='button'
          >
            Time-out
          </Button>
        </li>
      </ul>
    </Form>
  )
}

export default AttendanceForm
