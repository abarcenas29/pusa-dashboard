import React from 'react'
import { Button, Grid, Header, Table, Segment } from 'semantic-ui-react'

const Payroll = () => {
  return (
    <div className='l-pa2'>
      <Grid container center>
        <Grid.Column>
          <Segment>
            <div className='l-d-f l-jc-sb l-ai-cen'>
              <div>
                <Header>Testing</Header>
              </div>
              <div>
                <Button>Go Back</Button>
              </div>
            </div>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Cut-off</Table.HeaderCell>
                  <Table.HeaderCell>Basic</Table.HeaderCell>
                  <Table.HeaderCell>Deduction</Table.HeaderCell>
                  <Table.HeaderCell>Net Pay</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Payroll for 9/11/2019 - 9/25/2019</Table.Cell>
                  <Table.Cell>10,000</Table.Cell>
                  <Table.Cell>0</Table.Cell>
                  <Table.Cell>10,000</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default Payroll
