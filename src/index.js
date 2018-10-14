import React from 'react'
import ReactDOM from 'react-dom'

import Amplify from 'aws-amplify'

import { BrowserRouter, Route } from 'react-router-dom'

import './style.less'

import Routes from './routes'
import * as serviceWorker from './serviceWorker'

Amplify.configure({
  Auth: {
    identityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID,
    region: process.env.REACT_APP_AWS_REGION,
    userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_AWS_POOL_WEB_CLIENT_ID,
    mandatorySignIn: false
  }
})

const Root = () => (
  <BrowserRouter>
    <Route path='/' render={props => <Routes {...props} />} />
  </BrowserRouter>
)

ReactDOM.render(<Root />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
