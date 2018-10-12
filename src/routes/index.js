import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Welcome from './welcome'

const Routes = () => {
  return (
    <Route path='/' component={Welcome} exact />
  )
}

export default Routes
