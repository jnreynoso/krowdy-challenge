import React from 'react'
import styled from 'styled-components'
import {
  Avatar,
  Button,
  Col,
  Divider,
  Icon,
  List,
  Row,
  Skeleton
} from 'antd'

import AvatarImg from 'images/avatar.png'

const { Item } = List
const { Meta } = Item

const Title = styled.div`
  height: 29px;
  width: 200px;
  color: rgba(0,0,0,0.85);
  font-size: 14px;
  line-height: 29px;
`

const WithoutBorder = styled.div`
  border-bottom: 0px;
`

const Action = styled.span`
  color: #1890ff;
  cursor: pointer;
`

const Items = item => {
  return (
    <WithoutBorder>
      <Item
        actions={[
          <Action>Revocar acceso</Action>
        ]}
      >
        <Skeleton avatar title={false} loading={item.loading} active>
          <Meta
            avatar={<Avatar src={AvatarImg} size={54} icon='user' />}
            description={item.description}
            title={<Title>{item.name}</Title>}
          />
        </Skeleton>
      </Item>
    </WithoutBorder>
  )
}

const Connections = () => {
  const list = [{
    name: 'Estás conectado a Facebook',
    description: 'Walther'
  }, {
    name: 'Estás conectado con Linkedin',
    description: '@walther'
  }, {
    name: 'Estás conectado a Google',
    description: 'whalter@gmail.com'
  }]

  return (
    <div>
      <List
        itemLayout='horizontal'
        dataSource={list}
        renderItem={Items}
      />
      <Divider />
      <Row style={{ marginBottom: '50px' }}>
        <Col span={18}>
          <Icon
            type='facebook'
            style={{
              fontSize: 25
            }}
          />
          &nbsp;
          <span>Conectarse con Facebook</span>
        </Col>
        <Col span={6}>
          <Button>Conectarse con facebook</Button>
        </Col>
      </Row>
    </div>
  )
}

export default Connections
