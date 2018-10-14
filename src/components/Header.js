import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import { Avatar, Menu, Dropdown, Icon } from 'antd'
import { withRouter } from 'react-router'
import styled from 'styled-components'

import { Center } from 'components'

import Logo from 'images/logo.png'

const Wrapper = styled.div`
  height: 40px;
  width: 100%;
  background-color: #FFFFFF;
  box-shadow: 0 1px 8px 0 rgba(0,21,41,0.12)
`
const WImage = styled.div`
  display: inline;
  height: 31px;
  width: 61px;
  margin-left: -85px;
`
const WAccounts = styled.span`
  vertical-align: bottom;
  height: 16px;
  width: 62px;
  color: rgba(0,0,0,0.45);
  font-size: 14px;
  font-weight: bold;
`

class DropdownUser extends Component {
  state = {
    payload: {}
  }

  currentSession = async () => {
    const session = await Auth.currentSession()

    if (session) {
      const { idToken: { payload } } = session

      this.setState({
        payload,
        name: payload.name
      })
    }
  }

  componentDidMount () {
    this.currentSession()
  }

  onClickSignOut = async () => {
    try {
      await Auth.signOut()
    } catch (err) {
      console.log(err)
    }
  }

  onClickMenu = async ({ item, key, keyPath }) => {
    const { history } = this.props

    switch (key) {
      case 'logout':
        this.onClickSignOut()

        history.push('/')
        break
      case 'configuration':
      case 'account':
        break
    }
  }

  render () {
    const { name } = this.state

    return (
      <Dropdown
        overlay={
          <Menu onClick={this.onClickMenu}>
            <Menu.Item key='account'>
              <Icon type='user' style={{ marginRight: 10 }} /> Mi
              cuenta
            </Menu.Item>
            <Menu.Item key='configuration'>
              <Icon type='setting' style={{ marginRight: 10 }} />{' '}
              Configuración
            </Menu.Item>
            <Menu.Item
              key='logout'
              style={{
                borderTop: '1px solid rgba(230, 230, 230, 0.7)'
              }}
            >
              <Icon type='logout' style={{ marginRight: 10 }} />{' '}
              Cerrar Sesión
            </Menu.Item>
          </Menu>
        }
        placement='bottomRight'
      >
        <span>
          <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
          &nbsp; {name}
          &nbsp; <Icon type='down' theme='outlined' />
        </span>
      </Dropdown>
    )
  }
}

const Header = props => {
  return (
    <Center>
      <Wrapper>
        <WImage>
          <img alt='Logo' src={Logo} />
          <WAccounts>&nbsp;.accounts</WAccounts>
        </WImage>
        <div
          style={{
            position: 'relative',
            float: 'left',
            left: '73%'
          }}
        >
          <DropdownUser {...props} />
        </div>
      </Wrapper>
    </Center>
  )
}

export default withRouter(Header)
