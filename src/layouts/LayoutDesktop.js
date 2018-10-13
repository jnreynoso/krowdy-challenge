import React, { Component } from 'react'

import styled from 'styled-components'

import {
  Background,
  Center,
  Content,
  Footer,
  Header
} from 'components'

const Wrapper = styled.div`
  height: 100%;
`
const Row = styled.div`
  font-family: Roboto;
  width: 100%;
`

const LayoutDesktop = View => (
  class extends Component {
    render () {
      return (
        <Wrapper>
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
        </Wrapper>
      )
    }
  }
)

export default LayoutDesktop
