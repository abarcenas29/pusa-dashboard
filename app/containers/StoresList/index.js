import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  Button,
  Container,
  Grid,
  Input,
  List,
  Segment
} from 'semantic-ui-react'

import { useMountReducer } from 'Helpers/hooks'

import { listSelector } from './selectors'
import reducer, { LIST_REQUEST_ACTION } from './reducers'

const OrgListItem = ({ name, uid, history }) => {
  return (
    <List.Item class='l-d-f l-ai-cen l-jc-sb l-mb2'>
      <div style={{ flexGrow: 1 }}>
        {name}
      </div>
      <div>
        <Button
          icon='edit'
          onClick={() => history.push(`/stores/${uid}`)}
        />
        <Button icon='trash' negative />
      </div>
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
              <Input fluid icon='search' placeholder='Search Organization' />
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
