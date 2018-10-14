import React from 'react'
import styled from 'styled-components'
import { List, Skeleton } from 'antd'

const { Item } = List
const { Meta } = Item

const Wrapper = styled.div`
  padding-left: 24px;
`

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

const Action = styled.span`
  color: #1890ff;
  cursor: pointer;
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
        <Action>Reenviar verificación</Action>
      )
    } else {
      actions.push(
        <Action>Seleccionar como principal</Action>
      )
    }

    actions.push(
      <Action>Eliminar</Action>
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
    <Wrapper>
      <List
        itemLayout='horizontal'
        dataSource={list}
        renderItem={Items}
      />
      <br />
      <Action>Añadir correo</Action>
    </Wrapper>
  )
}

export default Login
