import React from 'react'
import { Col, Row } from 'antd'
import styled from 'styled-components'

import { Avatar, VerticalLine } from 'components'

const Wrapper = styled.div`
  margin: 34px 25px 28px 35px;
`
const WTitle = styled.div`
  height: 28px;
  width: 118px;
  color: rgba(0,0,0,0.65);
  font-family: Roboto;
  font-size: 24px;
  line-height: 28px;
`

const WMessage = styled.div`
  height: 66px;
  width: 344px;
  color: rgba(0,0,0,0.65);
  font-size: 14px;
  line-height: 22px;
`

const Message = () => (
  <div style= {{ marginLeft: '40px' }}>
    <WTitle>
      Bievenido
    </WTitle>
    <WMessage>
      Desde aquí y con tu cuenta de Krowdy podras acceder rápidamente a tus herramientas y funciones para proteger tus datos y tu privacidad.
    </WMessage>
  </div>
)

const Header = () => {
  return (
    <Wrapper>
      <Row>
        <Col span={12}>
          <Avatar />
        </Col>
        <VerticalLine />
        <Col span={12}>
          <Message />
        </Col>
      </Row>
    </Wrapper>
  )
}

export default Header
