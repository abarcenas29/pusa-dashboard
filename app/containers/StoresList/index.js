import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  Button,
  Header,
  Container,
  Grid,
  List,
  Segment
} from 'semantic-ui-react'

import { useMountReducer } from 'Helpers/hooks'

import { listSelector } from './selectors'
import reducer, { LIST_REQUEST_ACTION } from './reducers'

const OrgListItem = ({ name, address, uid, history }) => {
  return (
    <List.Item onClick={() => history.push(`/stores/${uid}`)}>
      <List.Content>
        <List.Header>
          {name}
        </List.Header>
        <List.Description>
          {address}
        </List.Description>
      </List.Content>
    </List.Item>
  )
}

const OrganizationList = ({ history }) => {
  useMountReducer('containersStoresList', reducer)
  const dispatch = useDispatch()

  const { list } = useSelector(
    createStructuredSelector({
      list: listSelector()
    })
  )

  useEffect(() => {
    dispatch(LIST_REQUEST_ACTION())
  }, [])

  return (
    <Container fluid className='l-pa1'>
      <Segment>
        <Grid textAlign='left'>
          <Grid.Row columns={2}>
            <Grid.Column textAlign='left'>
              <Header as='h2'>
                Store List
              </Header>
            </Grid.Column>
            <Grid.Column textAlign='right'>
              <Button
                primary
                onClick={() => history.push('/stores/create')}
              >
                Create
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <List divided verticalAlign='middle' size='huge' selection>
                {
                  list.rows.map((r, i) => (
                    <OrgListItem
                      key={i}
                      {...r}
                      history={history}
                    />
                  ))
                }
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  )
}

export default OrganizationList
