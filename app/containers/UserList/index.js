import React from 'react'
import {
  Button,
  Container,
  Table,
  Grid,
  Icon,
  Input,
  Pagination,
  Segment
} from 'semantic-ui-react'

const TableItem = () => {
  return (
    <Table.Row>
      <Table.Cell singleLine>Solidad Romero</Table.Cell>
      <Table.Cell>123 Ficticious street, ficticious subdv, ficticious municipality, Rizal, PH</Table.Cell>
      <Table.Cell>fake@email.com</Table.Cell>
      <Table.Cell singleLine>
        <div>
          <Icon
            link
            bordered
            circular
            color='red'
            inverted
            name='trash'
          />
          <Icon
            name='edit'
            inverted
            bordered
            circular
            link
          />
        </div>
      </Table.Cell>
    </Table.Row>
  )
}

const UserList = ({ history }) => {
  return (
    <Container fluid className='l-pa1'>
      <Segment>
        <Grid textAlign='left'>
          <Grid.Row columns={2}>
            <Grid.Column textAlign='left'>
              <Input fluid icon='search' placeholder='Search Users' />
            </Grid.Column>
            <Grid.Column textAlign='right'>
              <Button
                primary
                onClick={() => history.push('/users/create')}
              >
                Create
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Table padded size='large' striped>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell singleLine>Name</Table.HeaderCell>
                    <Table.HeaderCell>Address</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <TableItem />
                  <TableItem />
                  <TableItem />
                  <TableItem />
                  <TableItem />
                </Table.Body>

                <Table.Footer>
                  <Table.Row textAlign='right'>
                    <Table.HeaderCell colSpan='4'>
                      <Pagination defaultActivePage={5} totalPages={10} />
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  )
}

export default UserList
