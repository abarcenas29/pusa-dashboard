import React, { useRef } from 'react'
import {
  Button,
  Grid,
  Header,
  Segment,
  Table
} from 'semantic-ui-react'

import LeafletMap from 'Components/LeafletMap'

const Employee = () => {
  const mapRef = useRef()

  return (
    <Grid container centered>
      <Grid.Row>
        <Grid.Column computer={7}>
          <Segment>
            <Header>Attendance</Header>
            <LeafletMap
              onClick={() => {}}
              ref={mapRef}
              zoom={15}
              center={[51.505, -0.09]}
              height={250}
            />
            <Table compact striped>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Login</Table.Cell>
                  <Table.Cell>Sept 29 2019, 07:05:00</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Logout</Table.Cell>
                  <Table.Cell>Sept 29 2019, 07:05:00</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Button compact fluid primary>Check-In</Button>
            <br />
            <Button compact fluid>View Logs</Button>
          </Segment>
        </Grid.Column>
        <Grid.Column computer={7}>
          <Grid.Column computer={7}>
            <Segment>
              <Header>Payroll</Header>
              <Table compact striped>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Cut-off</Table.HeaderCell>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>September 26 - October 11 2019</Table.Cell>
                    <Table.Cell>9999.99</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>October 12 - October 25 2019</Table.Cell>
                    <Table.Cell>9999.99</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <Button compact fluid>View Payroll</Button>
            </Segment>
          </Grid.Column>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default Employee
