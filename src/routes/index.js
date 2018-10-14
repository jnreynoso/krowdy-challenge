import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Welcome from './welcome'
import Login from './login'

const Routes = () => {
  return (
    <Switch>
      <Route path='/' component={Login} exact />
      <Route path='/account' component={Welcome} exact />
    </Switch>
  )
}

export default Routes
