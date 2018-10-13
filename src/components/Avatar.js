import React from 'react'
import { Avatar, Row, Col } from 'antd'
import AvatarImg from 'images/avatar.png'

import styled from 'styled-components'

const Title = styled.span`
  height: 28px;
  width: 122px;
  color: rgba(0,0,0,0.65);
  font-size: 20px;
  line-height: 28px;
`
const Email = styled.span`
  height: 22px;
  width: 157px;
  color: rgba(0,0,0,0.65);
  font-size: 14px;
  line-height: 22px;
`
const Description = styled.span`
  height: 22px;
  width: 175px;
  color: rgba(0,0,0,0.45);
  font-size: 12px;
  line-height: 22px;
`

const Main = props => {
  return (
    <Row>
      <Col span={4}>
        <Avatar src={AvatarImg} size={64} icon='user' />
      </Col>
      <Col span={20}>
        <Row>
          <Title>Walther Ayala</Title>
        </Row>
        <Row>
          <Email>waltherayala@gmail.com</Email>
        </Row>
        <Row>
          <Description>Miembro desde 14 de junio de 2017</Description>
        </Row>
      </Col>
    </Row>
  )
}

export default Main
