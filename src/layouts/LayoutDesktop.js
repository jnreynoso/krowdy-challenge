import React, { Component } from 'react'
import { Layout } from 'antd'

import styled from 'styled-components'

import {
  Background,
  Center,
  Content,
  Footer,
  Header
} from 'components'

const Row = styled.div`
  width: auto;
`

const LayoutDesktop = View => (
  class extends Component {
    render () {
      return (
        <Background>
          <Center>
            <Row>
              <Header />
              <Content>
                <View />
              </Content>
              <Footer />
            </Row>
          </Center>
        </Background>
      )
    }
  }
)

export default LayoutDesktop
