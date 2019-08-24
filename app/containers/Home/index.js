import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <div>
      This is Home
      <Link to='/about'>About</Link>
    </div>
  )
}
