import React, { useRef, useCallback } from 'react'
import Webcam from 'react-webcam'
import { Modal, Button } from 'semantic-ui-react'

const WebCamModal = ({ modalOptions, captureCallback, action }) => {
  const ref = useRef()

  const onCapture = useCallback(() => {
    const imageSrc = ref.current.getScreenshot()

    captureCallback(imageSrc)
    modalOptions.onClose()
  }, [ref])

  return (
    <Modal {...modalOptions} basic>
      <Modal.Content>
        <Webcam
          ref={ref}
          audio={false}
          width={485}
          height={620}
          facingMode='user'
          screenshotFormat='image/jpeg'
          basic
        />
        <div className='l-d-f l-jc-cen'>
          <Button
            onClick={() => onCapture()}
          >
            Capture
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  )
}

export default WebCamModal
