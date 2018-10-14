import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import styled from 'styled-components'

import { Alert, Button, Checkbox, Form, Input } from 'antd'

const { Item } = Form

const Wrapper = styled.div`
  padding-left: 24px;
`

class ChangePassword extends Component {
  initialState = {
    messageSuccess: false,
    messageRepeat: false,
    messageFailPassword: false,
    messageInvalidPassword: false
  }

  state = this.initialState

  handleSubmit = e => {
    e.preventDefault()

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          if (values.newPassword === values.newPasswordRepeat) {
            const user = await Auth.currentAuthenticatedUser()
            const changed = await Auth.changePassword(
              user,
              values.password,
              values.newPassword
            )

            if (changed === 'SUCCESS') {
              this.setState({
                messageSuccess: true
              })
            }
          } else {
            this.setState({
              messageRepeat: true
            })
          }
        } catch (e) {
          const state = {}

          console.log(e)

          switch (e.code) {
            case 'NotAuthorizedException':
              state.messageFailPassword = true
              break
            case 'InvalidParameterException':
              state.messageInvalidPassword = true
          }

          this.setState(state)
        }
      }
    })
  }

  onClose = e => {
    e.preventDefault()

    this.setState(this.initialState)
  }

  render () {
    const inputProps = {
      style: {
        width: 300
      }
    }

    const {
      messageFailPassword,
      messageInvalidPassword,
      messageRepeat,
      messageSuccess
    } = this.state
    const { form: { getFieldDecorator } } = this.props

    return (
      <Wrapper>
        <div>
          { messageRepeat ? (
            <Alert
              closable
              message='Las contraseñas no coinciden'
              type='warning'
              showIcon
              onClose={this.onClose}
            />
          ) : ('')}
          { messageFailPassword ? (
            <Alert
              closable
              message='Contraseña incorrecta'
              type='warning'
              showIcon
              onClose={this.onClose}
            />
          ) : ('')}
          { messageInvalidPassword ? (
            <Alert
              closable
              message='Contraseña incorrecta, recuerde ingreser mas de 6 digitos (mayusculas y minusculas)'
              type='warning'
              showIcon
              onClose={this.onClose}
            />
          ) : ('')}
          { messageSuccess ? (
            <Alert
              closable
              message='Tu contraseña se ha cambiado exitosamente'
              type='success'
              showIcon
              onClose={this.onClose}
            />
          ) : ('')}
        </div>
        <Form layout={'vertical'} onSubmit={this.handleSubmit}>
          <Item
            label='Contraseña actual.'
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Contraseña actual.' }]
            })(
              <Input {...inputProps} type='password' />
            )}
          </Item>
          <Item
            label='Contraseña nueva.'
          >
            {getFieldDecorator('newPassword', {
              rules: [{ required: true, message: 'Contraseña actual.' }]
            })(
              <Input {...inputProps} type='password' />
            )}
          </Item>
          <Item
            label='Vuelve a escribir su contraseña nueva.'
          >
            {getFieldDecorator('newPasswordRepeat', {
              rules: [{ required: true, message: 'Contraseña actual.' }]
            })(
              <Input {...inputProps} type='password' />
            )}
          </Item>
          <Item>
            <Checkbox
              checked
            >
              Solicita que todos los dispositivos inicien sesión con la nueva contraseña
            </Checkbox>
          </Item>
          <Button htmlType='submit' type='primary'>Guardar</Button>
        </Form>
      </Wrapper>
    )
  }
}

const ChangePasswordForm = Form.create()(ChangePassword)

export default ChangePasswordForm
