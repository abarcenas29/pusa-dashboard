import React, { useContext } from 'react'
import {
  Button,
  Container,
  Grid,
  Input,
  Segment
} from 'semantic-ui-react'

import DashboardRootContext from 'RootContainers/Dashboard/context'
import { useMountReducer } from 'Helpers/hooks'

import Context from './context'
import OwnerHeader from './components/OwnerHeader'
import Table from './components/Table'
import reducer from './reducer'

const UserList = ({ history }) => {
  useMountReducer('containerUserList', reducer)
  const { profile } = useContext(DashboardRootContext)

  return (
    <Context.Provider value={{ history, profile }}>
      <Container fluid className='l-pa1'>
        {
          profile.role === 'owner' &&
            <OwnerHeader />
        }
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
                <Table />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    </Context.Provider>
  )
}

export default UserList
