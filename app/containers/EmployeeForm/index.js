import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  Container,
  Grid,
  Segment
} from 'semantic-ui-react'

import { STORE_INFO_REQUEST_ACTION } from 'RootContainers/Dashboard/reducers'
import { storeInfoSelector } from 'RootContainers/Dashboard/selectors'
import { useMountReducer } from 'Helpers/hooks'
import EmployeeDetailModal from 'Components/EmployeeDetailModal'

import reducer, {
  EMPLOYEE_DETAIL_REQUEST_ACTION
} from './reducers'
import EmployeeForm from './component/EmployeeForm'
import EmployeeTable from './component/EmployeeTable'
import Context from './context'
import { employeeFormSelectors } from './selectors'

const EmployeeDetail = ({ match }) => {
  useMountReducer('containerEmployeeForm', reducer)
  const { params: { id } } = match
  const storeId = localStorage.getItem('store')
  const dispatch = useDispatch()

  const [showEmployeeModal, setShoeEmployeeModal] = useState(false)
  const [rowIndex, setRowIndex] = useState(null)

  const { form, storeInfo } = useSelector(
    createStructuredSelector({
      form: employeeFormSelectors(),
      storeInfo: storeInfoSelector()
    })
  )

  useEffect(() => {
    dispatch(
      EMPLOYEE_DETAIL_REQUEST_ACTION({
        where: {
          uid: id
        }
      })
    )
    dispatch(
      STORE_INFO_REQUEST_ACTION(storeId)
    )
  }, [])

  return (
    <Context.Provider value={{ setShoeEmployeeModal, setRowIndex, id }}>
      <Container fluid className='l-pa1'>
        {
          form &&
            <EmployeeForm {...form} />
        }
        <Segment>
          <Grid>
            <Grid.Column>
              {
                form && storeInfo &&
                  <EmployeeTable
                    loc={{
                      lat: storeInfo.lat,
                      lng: storeInfo.long
                    }}
                    logs={form.employees[0].times}
                  />
              }
            </Grid.Column>
          </Grid>
        </Segment>
      </Container>
      {
        storeInfo && rowIndex &&
          <EmployeeDetailModal
            open={showEmployeeModal}
            setOpen={setShoeEmployeeModal}
            {...rowIndex}
            storeInfo={{ lat: storeInfo.lat, lng: storeInfo.long }}
          />
      }
    </Context.Provider>
  )
}

export default EmployeeDetail
