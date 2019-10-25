import React, { useState, useCallback } from 'react'
import { createStructuredSelector } from 'reselect'
import { Button, Form } from 'semantic-ui-react'
import { useSelector } from 'react-redux'

import { isLoadingSelector } from './../selectors'
import WebCamModal from './WebCamModal'

const AttendanceForm = ({ handleSubmit, form, checkIn }) => {
  const { action } = form.getState().values
  const [showWebcamModal, setShowWebcamModal] = useState(false)
  const { isLoading } = useSelector(
    createStructuredSelector({
      isLoading: isLoadingSelector()
    })
  )

  const captureCallback = useCallback(img => {
    form.change('image', img)
    form.submit()
  }, [action])

  return (
    <Form onSubmit={handleSubmit} loading={isLoading}>
      <ul className='l-ma0 l-pa0 l-lst-n'>
        <li className='l-mb1'>
          <Button
            compact
            fluid
            primary
            disabled={(checkIn[1])}
            onClick={() => {
              form.change('action', 'time-in')
              setShowWebcamModal(true)
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
            disabled={!(checkIn[1])}
            onClick={() => {
              form.change('action', 'time-out')
              setShowWebcamModal(true)
            }}
            type='button'
          >
            Time-out
          </Button>
        </li>
      </ul>
      <WebCamModal
        modalOptions={{
          open: showWebcamModal,
          onClose: () => {
            setShowWebcamModal(false)
          },
          size: 'tiny'
        }}
        captureCallback={captureCallback}
      />
    </Form>
  )
}

export default AttendanceForm
