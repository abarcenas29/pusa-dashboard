import React, { useContext } from 'react'
import styled from 'styled-components'
import {
  Button,
  Icon
} from 'semantic-ui-react'

import DashboardRootContext from 'RootContainers/Dashboard/context'

const ButtonContent = styled.div`
  > .icon {
    display: block;
  }
  > .label {
    padding: 1rem 0;
  }
`

const NavButton = ({ icon, label, to }) => {
  const { history } = useContext(DashboardRootContext)
  return (
    <Button
      basic
      circular
      size='huge'
      onClick={() => history.push(to)}
    >
      <ButtonContent>
        <div className='icon'>
          <Icon fitted name={icon} size='huge' />
        </div>
        <div className='label'>
          {label}
        </div>
      </ButtonContent>
    </Button>
  )
}

export default NavButton
