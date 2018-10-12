import React from 'react'
import styled from 'styled-components'
import { Avatar, List, Skeleton } from 'antd'

const { Item } = List
const { Meta } = Item

const Title = styled.div`
  font-weight: bold;
  height: 16px;
  width: 112px;
  color: rgba(0,0,0,0.85);
  font-size: 14px;
  line-height: 16px;
`

const WithoutBorder = styled.div`
  border-bottom: 0px;
`

const Items = (item) => {
  const actions = []

  if (item.principal) {
    actions.push(
      <span>
        Correo principal
      </span>
    )
  } else {
    if (!item.verified) {
      actions.push(
        <a>Reenviar verificación</a>
      )
    } else {
      actions.push(
        <a>Seleccionar como principal</a>
      )
    }

    actions.push(
      <a>Eliminar</a>
    )
  }

  return (
    <WithoutBorder>
      <Item
        actions={actions}
      >
        <Skeleton avatar title={false} loading={item.loading} active>
          <Meta
            title={<Title>{item.email}</Title>}
          />
        </Skeleton>
      </Item>
    </WithoutBorder>
  )
}

const Login = () => {
  const list = [{
    email: 'user@laborum.pe',
    principal: true,
    verified: true
  }, {
    email: 'usuario@gmail.com',
    principal: false,
    verified: true
  }, {
    email: 'usuario2@gmail.com',
    principal: false,
    verified: false
  }]

  return (
    <List
      itemLayout="horizontal"
      dataSource={list}
      renderItem={Items}
    />
  )
}

export default Login
