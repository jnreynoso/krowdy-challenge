import React from 'react'
import styled from 'styled-components'
import { Tabs, Icon } from 'antd'

import Account from './account'

const { TabPane } = Tabs

const Wrapper = styled.div`
  height: 40px
`

const Main = () => (
  <Wrapper>
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
  </Wrapper>
)

export default Main
