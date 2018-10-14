import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import styled from 'styled-components'
import { Alert, Form, Col, Row, List, Skeleton, Input, Button } from 'antd'

import { setEmails, getEmails } from 'utils'
import ImgShield from 'images/shield.png'

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
  display: inline;
`
const WithoutBorder = styled.div`
  border-bottom: 0px;
`
const Action = styled.span`
  color: #1890ff;
  cursor: pointer;
`
const NotVerified = styled.div`
  height: 22px;
  width: 90px;
  border-radius: 11px;
  background-color: #BFBFBF;}
  padding-left: 5px;
  display: inline;
`
const NotVerifiedSpan = styled.span`
  height: 14px;
  width: 65px;
  color: #FFFFFF;
  font-size: 12px;
  line-height: 14px;
`

const Items = (item, props) => {
  const actions = []

  const clickVerification = () => {
    props.showVerificationFromItem(item.email)
  }

  const clickPrincipal = async () => {
    const user = await Auth.currentAuthenticatedUser()
    const result = await Auth.updateUserAttributes(user, {
      email: item.email
    })

    if (result === 'SUCCESS') {
      const session = await Auth.currentSession()

      await user.refreshSession(session.refreshToken)
      clickVerification()
    }
  }

  if (item.principal) {
    if (!item.email_verified) {
      actions.push(
        <Action onClick={clickVerification}>Reenviar verificación</Action>
      )
    }

    actions.push(
      <span>
        Correo principal
      </span>
    )
  } else {
    if (!item.email_verified) {
      actions.push(
        <Action onClick={clickVerification}>Reenviar verificación</Action>
      )
    } else {
      actions.push(
        <Action onClick={clickPrincipal}>Seleccionar como principal</Action>
      )
    }

    actions.push(
      <Action onClick={() => props.removeEmail(item.email)}>Eliminar</Action>
    )
  }

  return (
    <WithoutBorder>
      <Item
        actions={actions}
      >
        <Skeleton avatar title={false} loading={item.loading} active>
          <Meta
            title={
              <div>
                <Title>{item.email}</Title>
                {' '}
                {
                  !item.email_verified ? (
                    <NotVerified>
                      <NotVerifiedSpan>No verificado</NotVerifiedSpan>
                    </NotVerified>
                  ) : ('')
                }
              </div>
            }
          />
        </Skeleton>
      </Item>
    </WithoutBorder>
  )
}

const WrapperVerificationBox = styled.div`
  margin-top: 20px;
  padding: 20px;
  height: 140px;
  width: 683px;
  border-radius: 4px;
  background-color: #FBFBFB;
`

const WVerification = styled.span`
  height: 16px;
  width: 74px;
  color: rgba(0,0,0,0.65);
  font-size: 14px;
  line-height: 16px;
`

const WVerificationDescription = styled.span`
  height: 14px;
  width: 368px;
  color: rgba(0,0,0,0.43);
  font-size: 12px;
  line-height: 14px;
`

const PasswordRecover = styled.div`
  height: 29px;
  width: 148px;
  color: #108EE9;
  font-family: Roboto;
  font-size: 14px;
  line-height: 29px;
`

class NewEmail extends Component {
  state = {
    messageSuccess: false,
    messageFail: false
  }

  onClickVerification = async e => {
    e.preventDefault()

    const { form: { getFieldValue } } = this.props

    const emails = getEmails()

    const email = getFieldValue('email')
    const matched = emails.find(e => e.email === email)
    const filter = emails.filter(e => e.email !== email)

    if (!(matched && email.email_verified)) {
      try {
        const user = await Auth.currentAuthenticatedUser()
        const result = await Auth.updateUserAttributes(user, {
          email
        })

        if (result === 'SUCCESS') {
          const session = await Auth.currentSession()

          const { idToken: { payload } } = session

          await user.refreshSession(session.refreshToken)

          await Auth.resendSignUp(payload['cognito:username'])

          filter.push({
            email,
            email_verified: false,
            progress: true
          })

          setEmails(filter)
          this.props.refreshEmails()
        }
      } catch (e) {
        const state = {}

        if (e.code === 'LimitExceededException') {
          state.messageFail = 'Se ha superado el límite de intentos, por favor intente después de un tiempo.'
        } else {
          state.messageSuccess = 'Se envio a verificación correctamente'
        }

        this.setState(state)
      }
    }
  }

  sendVerificationCode = async e => {
    const { form: { getFieldValue } } = this.props

    try {
      const code = getFieldValue('code')
      const email = getFieldValue('email')
      const result = await Auth.verifyCurrentUserAttributeSubmit('email', code)

      if (result === 'SUCCESS') {
        const emails = getEmails()
        const matched = emails.find(e => e.principal)
        const filter = emails.filter(e => !e.principal && e.email !== email)

        matched.principal = false

        filter.push({
          email,
          email_verified: true,
          principal: true
        })
        filter.push(matched)

        this.setState({
          messageSuccess: 'Email verificado'
        })

        setEmails(filter)
        this.props.refreshEmails()
        this.props.toogleVerification()
      }
    } catch (e) {
      const state = {}

      console.log(e)

      switch (e.code) {
        case 'CodeMismatchException':
        case 'ExpiredCodeException':
          state.messageFail = e.message
          break
        default:
          break
      }

      this.setState(state)
    }
  }

  render () {
    const propsRow = {
      style: {
        paddingBottom: '8px'
      }
    }

    const { getFieldDecorator } = this.props.form
    const { messageFail, messageSuccess } = this.state

    return (
      <div>
        {
          messageSuccess ? (
            <Alert message={messageSuccess} type='success' showIcon />
          ) : ('')
        }
        {
          messageFail ? (
            <Alert message={messageFail} type='error' showIcon />
          ) : ('')
        }
        <Form>
          <Row>
            {getFieldDecorator('email', {
              initialValue: this.props.emailSelected
            })(
              <Input
                style={{ width: '300px' }}
                placeholder='Ingresa tu correo electrónico'
              />
            )}
            {'  '}
            <Button
              onClick={this.onClickVerification}
              style={{ backgroundColor: '#108EE9' }}
              type='primary'
            >
              Enviar verificación
            </Button>
            <Action onClick={this.props.toogleVerification}> Cancelar</Action>
          </Row>
          <WrapperVerificationBox>
            <Row>
              <Col span={3}>
                <img
                  alt='Shield'
                  style={{ marginTop: '15px' }}
                  src={ImgShield}
                />
              </Col>
              <Col span={21}>
                <Row {...propsRow}>
                  <WVerification>Verificación</WVerification>
                </Row>
                <Row {...propsRow}>
                  <WVerificationDescription>
                    Para tu seguridad, introduce tu contraseña para realizar este cambio.
                  </WVerificationDescription>
                </Row>
                <Row {...propsRow}>
                  <Col span={12}>
                    {getFieldDecorator('code')(
                      <Input placeholder='Ingresa Codigo' />
                    )}
                  </Col>
                  <Col span={12}>
                    <Button
                      onClick={this.sendVerificationCode}
                      style={{
                        width: '75px',
                        backgroundColor: '#108EE9',
                        marginLeft: '5px'
                      }}
                      type='primary'
                    >
                      Listo
                    </Button>
                    <Button
                      style={{
                        marginLeft: '5px'
                      }}
                    >
                      Cancelar
                    </Button>
                  </Col>
                </Row>
                <Row {...propsRow}>
                  <PasswordRecover>Olvidaste tu contraseña</PasswordRecover>
                </Row>
              </Col>
            </Row>
          </WrapperVerificationBox>
        </Form>
      </div>
    )
  }
}

const NewEmailForm = Form.create()(NewEmail)

class Login extends Component {
  state = {
    emails: getEmails(),
    showVerification: false,
    emailSelected: ''
  }

  showVerificationFromItem = email => {
    this.setState({
      showVerification: true,
      emailSelected: email
    })
  }

  refreshEmails = () => {
    const emails = getEmails()

    this.setState({
      emails
    })
  }

  toogleVerification = e => {
    this.setState(state => ({ showVerification: !state.showVerification }))
  }

  removeEmail = email => {
    const { emails } = this.state

    const filter = emails.filter(e => e.email !== email)
    setEmails(filter)

    this.refreshEmails()
  }

  render () {
    const { emailSelected, showVerification } = this.state
    const { emails } = this.state

    const itemsProps = {
      refreshEmails: this.refreshEmails,
      showVerificationFromItem: this.showVerificationFromItem,
      removeEmail: this.removeEmail
    }

    return (
      <Wrapper>
        <List
          itemLayout='horizontal'
          dataSource={emails}
          renderItem={item => Items(item, itemsProps)}
        />
        <br />
        <div>
          { showVerification ? (
            <NewEmailForm
              emailSelected={emailSelected}
              refreshEmails={this.refreshEmails}
              toogleVerification={this.toogleVerification}
            />
          ) : (
            <Action onClick={this.toogleVerification}>Añadir correo</Action>
          )}
        </div>
      </Wrapper>
    )
  }
}

export default Login
