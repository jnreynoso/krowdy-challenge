import React from 'react'
import { Route } from 'react-router-dom'

import Welcome from './welcome'

const Routes = () => {
  return (
    <Route path='/' component={Welcome} exact />
  )
}

export default Routes
