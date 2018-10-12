import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route } from 'react-router-dom'
import Routes from './routes'

import 'antd/dist/antd.css'

const Root = () => (
  <BrowserRouter>
    <Route path='/' render={props => <Routes {...props} />} />
  </BrowserRouter>
)

ReactDOM.render(<Root />, document.getElementById('root'))
