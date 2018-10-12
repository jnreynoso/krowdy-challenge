import React from 'react'
import {
  Collapse,
  Icon,
  Layout,
  Menu
} from 'antd'

import styled from 'styled-components'

import AccountManagement from './AccountManagement'
import ChangePassword from './ChangePassword'
import Connections from './Connections'
import Login from './Login'
import Phone from './Phone'

const { Item } = Menu
const { Header, Sider, Content } = Layout
const { Panel } = Collapse

const Title = styled.div`
  height: 24px;
  color: rgba(0,0,0,0.85);
  font-size: 20px;
  line-height: 24px;
`

const Description = styled.div`
  height: 29px;
  width: 395px;
  color: rgba(0,0,0,0.85);
  font-size: 14px;
  line-height: 29px;
`

const Account = () => {
  return (
    <Layout>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          style={{
            width: 200,
            height: '100%',
            borderRight: 0
          }}
          defaultOpenKeys={['account']}
          mode='inline'
          selectable={false}
          inlineIndent={0}
        >
          <Item key='account'>Inicio de sesión y seguridad</Item>
          <Item key='phone'>Números de celular</Item>
          <Item key='change-password'>Cambiar contraseña</Item>
          <Item key='connection'>Conexiones</Item>
          <Item key='account-management'>Gestión de cuenta</Item>
        </Menu>
      </Sider>
      <Content style={{ background: '#FFFFFF', minHeight: '529px' }}>
        <Collapse bordered={false}>
          <Panel
            showArrow={false}
            header={
              <div>
                <Title>Inicio de sesión y seguridad</Title>
                <Description>Añade o elimina direcciones de correo electrónico en tu cuenta.</Description>
              </div>
            }
            key='collapse-login'
          >
            <Login />
          </Panel>
          <Panel
            showArrow={false}
            header={
              <div>
                <Title>Números de celular</Title>
                <Description>Añade un número de ceular para hacer mas sgura tu cuenta.</Description>
              </div>
            }
            key='collapse-phone'
          >
            <Phone />
          </Panel>
          <Panel
            showArrow={false}
            header={
              <div>
                <Title>Cambiar contraseña</Title>
                <Description>Crea una contreña única para poder proteger tu cuenta.</Description>
              </div>
            }
            key='collapse-change-password'
          >
            <ChangePassword />
          </Panel>
          <Panel
            showArrow={false}
            header={
              <div>
                <Title>Conexiones</Title>
                <Description>Redes sociales a conectadas a tu cuenta de Krowdy.</Description>
              </div>
            }
            key='collapse-connections'
          >
            <Connections />
          </Panel>
          <Panel
            showArrow={false}
            header={
              <div>
                <Title>Gestión de cuenta</Title>
                <Description>Aqui podras cerrar tu cuenta si deseas.</Description>
              </div>
            }
            key='collapse-account-management'
          >
            <AccountManagement />
          </Panel>
        </Collapse>
      </Content>
    </Layout>
  )
}

export default Account
