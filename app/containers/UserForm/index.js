import React, { useState } from 'react'
import {
  Container,
  Grid,
  Form,
  Image,
  Header,
  Segment
} from 'semantic-ui-react'

import FileUploadModal from 'Components/FileUploadModal'

const options = [
  { text: 'Admin', value: 1 },
  { text: 'Owner', value: 2 },
  { text: 'Employee', value: 3 }
]

const OrganizationForm = () => {
  const [croppedImage, setCroppedImage] = useState(null)
  const [showFileModal, setShowFileModal] = useState(false)

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
              Create User
            </Header>
            <Form size='big'>
              <Form.Group widths='equal'>
                <Form.Field>
                  <label>First Name</label>
                  <input placeholder='First Name' />
                </Form.Field>
                <Form.Field>
                  <label>Last Name</label>
                  <input placeholder='Last Name' />
                </Form.Field>
                <Form.Field>
                  <label>Middle Name</label>
                  <input placeholder='Middle Name' />
                </Form.Field>
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Field>
                  <label>Address</label>
                  <input placeholder='Address' />
                </Form.Field>
                <Form.Field>
                  <label>Mobile No</label>
                  <input placeholder='Contact No' />
                </Form.Field>
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Field>
                  <label>Password</label>
                  <input placeholder='Password' />
                </Form.Field>
                <Form.Field>
                  <label>Repeat Password</label>
                  <input placeholder='Repeat Password' />
                </Form.Field>
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Field>
                  <label>Type</label>
                  <Form.Select
                    options={options}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Daily Rate</label>
                  <input placeholder='Salary' />
                </Form.Field>
              </Form.Group>
              <div className='l-d-f l-jc-sb'>
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
    </Container>
  )
}

export default OrganizationForm
