import React from 'react'
import { Route } from 'react-router-dom'

import Welcome from './welcome'
import Login from './login'

const Routes = () => {
  return (
    <Route path='/' component={Login} exact />
  )
}

export default Routes
