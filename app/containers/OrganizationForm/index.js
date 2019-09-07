import React, { useState } from 'react'
import {
  Button,
  Container,
  Grid,
  Form,
  Image,
  Header,
  Segment
} from 'semantic-ui-react'

import CoordSearchModal from 'Components/CoordSearchModal'
import FileUploadModal from 'Components/FileUploadModal'

const OrganizationForm = () => {
  const [croppedImage, setCroppedImage] = useState(null)
  const [showFileModal, setShowFileModal] = useState(false)
  const [showCoordSearchModal, setShowCoordSearchModal] = useState(true)

  return (
    <Container className='l-mt2'>
      <Segment padded='very'>
        <Grid relaxed divided stackable>
          <Grid.Column width={4}>
            <Image
              onClick={() => setShowFileModal(true)}
              centered
              circular
              src={croppedImage || 'https://via.placeholder.com/250/250'}
              size='medium'
            />
          </Grid.Column>
          <Grid.Column width={12} textAlign='left'>
            <Header as='h2' textAlign='right'>
              Create Organization
            </Header>
            <Form size='big'>
              <Form.Field>
                <label>Name</label>
                <input placeholder='Name' />
              </Form.Field>
              <Form.Field>
                <label>Address</label>
                <input placeholder='Address' />
              </Form.Field>
              <Form.Field>
                <label>Contact No</label>
                <input placeholder='Contact No' />
              </Form.Field>
              <Form.Field label='GPS' />
              <Form.Group widths='equal'>
                <Form.Field>
                  <input placeholder='long' />
                </Form.Field>
                <Form.Field>
                  <input placeholder='lat' />
                </Form.Field>
                <Form.Field
                  style={{ display: 'flex', justifyContent: 'flex-end' }}
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
                <Form.Select options={[{ text: 'owner 1', value: 123 }]} />
              </Form.Field>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Form.Button type='Submit' size='big' negative>
                  Delete
                </Form.Button>
                <Form.Button type='Submit' size='big' primary>
                  Submit
                </Form.Button>
              </div>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>
      <FileUploadModal
        setCroppedImage={setCroppedImage}
        open={showFileModal}
        setOpen={setShowFileModal}
      />
      <CoordSearchModal
        open={showCoordSearchModal}
        setOpen={setShowCoordSearchModal}
      />
    </Container>
  )
}

export default OrganizationForm
