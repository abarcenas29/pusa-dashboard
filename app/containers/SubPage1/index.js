import React from 'react'
import { Link } from 'react-router-dom'

const SubPage1 = () => {
  return (
    <div className='l-d-b'>
      <div>
        <ul>
          <li><Link to='/sample-root'>Root Page</Link></li>
        </ul>
      </div>
      <div>
        <p>SubPage 1</p>
      </div>
    </div>
  )
}

export default SubPage1
