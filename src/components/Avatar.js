import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import { Icon, Input, Avatar, Row, Col } from 'antd'
import AvatarImg from 'images/avatar.png'

import { formatDate } from 'utils'

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

const Action = styled.span`
  font-size: 12px;
  color: #1890ff;
  cursor: pointer;
`

class Main extends Component {
  state = {
    editName: false,
    payload: {},
    name: ''
  }

  currentSession = async () => {
    const session = await Auth.currentSession()

    console.log(session)

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

  getRegisterDate = iat => {
    const seconds = new Date(1970, 0, 1)

    seconds.setSeconds(iat)

    return seconds
  }

  toogleEditName = e => {
    this.setState(state => ({
      editName: !state.editName
    }))
  }

  onChange = e => {
    this.setState({
      name: e.target.value
    })
  }

  onSaveName = async () => {
    const { name } = this.state

    try {
      const user = await Auth.currentAuthenticatedUser()
      const result = await Auth.updateUserAttributes(user, {
        name
      })

      if (result === 'SUCCESS') {
        const session = await Auth.currentSession()

        await user.refreshSession(session.refreshToken)

        this.toogleEditName()
      }
    } catch (e) {
      console.log(e)
    }
  }

  render () {
    const { name, payload, editName } = this.state
    const registerDate = formatDate(
      this.getRegisterDate(payload.iat)
    )

    return (
      <Row>
        <Col span={4}>
          <Avatar src={AvatarImg} size={64} icon='user' />
        </Col>
        <Col span={20}>
          <Row>
            <Title>
              {
                !editName ? (
                  <div>
                    {name}{' '}
                    <Icon
                      type='edit'
                      theme='outlined'
                      onClick={this.toogleEditName}
                    />
                  </div>
                ) : (
                  <div>
                    <Input
                      onChange={this.onChange}
                      value={name}
                      size='small'
                      style={{ width: '200px' }}
                    />
                    {' '}
                    <Action onClick={this.onSaveName}>Guardar</Action>
                    {' '}
                    <Action onClick={this.toogleEditName}>Cancelar</Action>
                  </div>
                )
              }
            </Title>
          </Row>
          <Row>
            <Email>{payload.email}</Email>
          </Row>
          <Row>
            <Description>Miembro desde {registerDate}</Description>
          </Row>
        </Col>
      </Row>
    )
  }
}

export default Main
