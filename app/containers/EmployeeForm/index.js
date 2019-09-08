import React, { useState } from 'react'
import {
  Container,
  Grid,
  Segment
} from 'semantic-ui-react'

import EmployeeDetailModal from 'Components/EmployeeDetailModal'
import EmployeeForm from './component/EmployeeForm'
import EmployeeTable from './component/EmployeeTable'

import Context from './context'

const EmployeeDetail = () => {
  const [showEmployeeModal, setShoeEmployeeModal] = useState(false)
  return (
    <Context.Provider value={{ setShoeEmployeeModal }}>
      <Container fluid className='l-pa1'>
        <EmployeeForm />
        <Segment>
          <Grid>
            <Grid.Column>
              <EmployeeTable />
            </Grid.Column>
          </Grid>
        </Segment>
        <EmployeeDetailModal
          open={showEmployeeModal}
          setOpen={setShoeEmployeeModal}
        />
      </Container>
    </Context.Provider>
  )
}

export default EmployeeDetail
