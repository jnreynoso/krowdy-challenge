import React from 'react'
import { Tabs, Icon } from 'antd'

import Account from './account'

const { TabPane } = Tabs

const Main = () => (
  <Tabs defaultActiveKey='account' >
    <TabPane
      tab={
        <span>
          <Icon type='user' />Cuenta
        </span>
      }
      key='account'
    >
      <Account />
    </TabPane>
  </Tabs>
)

export default Main
