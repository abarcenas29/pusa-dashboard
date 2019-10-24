import React, { useState } from 'react'
import { createStructuredSelector } from 'reselect'
import { Button, Form } from 'semantic-ui-react'
import { useSelector } from 'react-redux'

import { isLoadingSelector } from './../selectors'
import WebCamModal from './WebCamModal'

const AttendanceForm = ({ handleSubmit, form }) => {
  const { action } = form.getState().values
  const [showWebcamModal, setShowWebcamModal] = useState(false)
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
        captureCallback={img => {
          if (action === 'time-in') {
            form.change('time_in_image', img)
          } else {
            form.change('time_out_image', img)
          }
          form.submit()
        }}
      />
    </Form>
  )
}

export default AttendanceForm
