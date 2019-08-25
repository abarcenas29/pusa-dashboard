import 'cropperjs/dist/cropper.css'

import React, { useState, useRef } from 'react'
import Cropper from 'react-cropper'
import { Button, Header, Segment, Modal, Icon } from 'semantic-ui-react'

const convertToBinary = (dataString, contentType, sliceSize = 512) => {
  const splitData = dataString.split(',')

  const byteCharacters = atob(splitData[1])
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}

const FileUploadModal = ({ setCroppedImage, open, setOpen }) => {
  const cropRef = useRef()
  const [croppedData, setCroppedData] = useState(null)
  const [previewFile, setPreviewFile] = useState(null)

  const clearInputFile = () => {
    setPreviewFile(null)
    setCroppedImage(null)
    setOpen(false)
  }

  const onSetImage = () => {
    const toUrlData = croppedData.getCroppedCanvas().toDataURL()
    setCroppedImage(URL.createObjectURL(convertToBinary(toUrlData)))
    setOpen(false)
  }

  const onCrop = (e) => {
    setCroppedData(e.target.cropper)
  }

  const onChangeFile = (e, v) => {
    const file = e.target.files
    if (file.length > 0) {
      setPreviewFile(URL.createObjectURL(file[0]))
    } else {
      setPreviewFile(null)
      setCroppedImage(null)
    }
  }

  return (
    <Modal open={open} size='small'>
      <Modal.Header>
        Image Upload
      </Modal.Header>
      <Modal.Content>
        {
          previewFile &&
            <Cropper
              ref={cropRef}
              src={previewFile}
              style={{ height: 400, width: '100%' }}
              aspectRatio={1 / 1}
              guides
              crop={onCrop}
            />
        }
        {
          !previewFile &&
            <Segment placeholder>
              <Header icon>
                <Icon name='image file outline' />
                Upload An Image
              </Header>
              <Button primary as='label'>
                Open File Browser
                <input type='file' onChange={onChangeFile} className='l-d-n' />
              </Button>
            </Segment>
        }
      </Modal.Content>
      <Modal.Actions>
        <Button
          negative
          onClick={clearInputFile}
        >
          Clear
        </Button>
        <Button onClick={onSetImage}>Set Image</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default FileUploadModal
