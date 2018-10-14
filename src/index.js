import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import './index.css'
import * as serviceWorker from './serviceWorker'

import { BrowserRouter, Route } from 'react-router-dom'

import Routes from './routes'

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
