import React from 'react'
import { Col, Row } from 'antd'
import styled from 'styled-components'

import { Avatar, VerticalLine } from 'components'
import WelcomeImg from 'images/welcome.png'

const WTitle = styled.div`
  height: 28px;
  width: 118px;
  color: rgba(0,0,0,0.65);
  font-family: Roboto;
  font-size: 24px;
  line-height: 28px;
  margin-bottom: 8px;
`

const WMessage = styled.div`
  height: 66px;
  width: 344px;
  color: rgba(0,0,0,0.65);
  font-size: 14px;
  line-height: 22px;
  display: inline-block;
`

const WImage = styled.div`
  margin-top: -10px;
`

const Message = () => (
  <div style={{ marginLeft: '18px' }}>
    <Row>
      <Col span={16}>
        <WTitle>
          Bievenido
        </WTitle>
        <WMessage>
          Desde aquí y con tu cuenta de Krowdy podras acceder rápidamente a tus herramientas y funciones para proteger tus datos y tu privacidad.
        </WMessage>
      </Col>
      <Col span={8}>
        <WImage>
          <img alt='Secure' src={WelcomeImg} />
        </WImage>
      </Col>
    </Row>
  </div>
)

const Header = () => {
  return (
    <div>
      <Row>
        <Col span={10}>
          <Avatar />
        </Col>
        <VerticalLine />
        <Col span={14}>
          <Message />
        </Col>
      </Row>
    </div>
  )
}

export default Header
