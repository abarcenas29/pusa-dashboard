import React from 'react'
import {
  Button,
  Container,
  Grid,
  Input,
  List,
  Pagination,
  Segment
} from 'semantic-ui-react'

const OrgListItem = () => {
  return (
    <List.Item style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ flexGrow: 1 }}>
        Organization Name
      </div>
      <div>
        <Button icon='edit' />
        <Button icon='trash' negative />
      </div>
    </List.Item>
  )
}

const OrganizationList = ({ history }) => {
  return (
    <Container fluid>
      <Segment>
        <Grid textAlign='left'>
          <Grid.Row columns={2}>
            <Grid.Column textAlign='left'>
              <Input fluid icon='search' placeholder='Search Organization' />
            </Grid.Column>
            <Grid.Column textAlign='right'>
              <Button
                primary
                onClick={() => history.push('/organizations/create')}
              >
                Create
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <List divided verticalAlign='middle' size='huge' selection>
                <OrgListItem />
                <OrgListItem />
                <OrgListItem />
                <OrgListItem />
                <OrgListItem />
                <OrgListItem />
                <OrgListItem />
                <OrgListItem />
                <OrgListItem />
                <OrgListItem />
                <OrgListItem />
                <OrgListItem />
              </List>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='right'>
              <Pagination defaultActivePage={5} totalPages={10} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  )
}

export default OrganizationList
