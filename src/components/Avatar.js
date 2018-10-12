import React from 'react'
import { Avatar, Row, Col } from 'antd'

const Main = props => {
  return (
    <Row>
      <Col span={4}>
        <Avatar size={64} icon='user' />
      </Col>
      <Col span={20}>
        <Row>
          <span>Walther Ayala</span>
        </Row>
        <Row>
          <span>waltherayala@gmail.como</span>
        </Row>
        <Row>
          <span>Miembro desde 14 de junio de 2017</span>
        </Row>
      </Col>
    </Row>
  )
}

export default Main
