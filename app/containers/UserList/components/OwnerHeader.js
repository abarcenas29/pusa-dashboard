import React from 'react'
import {
  Segment,
  Statistic
} from 'semantic-ui-react'

const OwnerHeader = () => {
  return (
    <div className='l-d-f l-jc-fe'>
      <Segment>
        <Statistic size='tiny'>
          <Statistic.Value>9,999.99 PHP</Statistic.Value>
          <Statistic.Label>Current Payout</Statistic.Label>
        </Statistic>
      </Segment>
    </div>
  )
}

export default OwnerHeader
