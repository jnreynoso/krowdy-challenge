import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'

import { Center } from 'components'
import styled from 'styled-components'

const FormItem = Form.Item
const Wrapper = styled.div`
  background-color: #FAFAFA;
  height: 100vh;
`
const Box = styled.div`
  margin-top: 20px;
  background-color: #FFFFFF;
  max-width: 350px;
  padding: 20px;
  box-shadow: 0 2px 6px 0 rgba(0,0,0,0.08);
`

class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form

    return (
      <Wrapper>
        <Center>
          <Box>
            <Center style={{ marginBottom: '20px' }}>
              <img src='https://accounts.krowdy.com/images/logo_krowdy.svg' alt='Logo' />
            </Center>
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: 'Please input your username!' }]
                })(
                  <Input
                    prefix={
                      <Icon
                        type='user'
                        style={{ color: 'rgba(0,0,0,.25)' }}
                      />
                    }
                    placeholder='Username'
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }]
                })(
                  <Input
                    prefix={
                      <Icon
                        type='lock'
                        style={{
                          color: 'rgba(0,0,0,.25)'
                        }}
                      />
                    }
                    type='password'
                    placeholder='Password'
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true
                })(
                  <Checkbox>Remember me</Checkbox>
                )}
                <a style={{ float: 'right' }} href=''>Forgot password</a>
                <Button
                  type='primary'
                  htmlType='submit'
                  style={{
                    width: '100%'
                  }}
                >
                  Log in
                </Button>
                Or <a href=''>register now!</a>
              </FormItem>
            </Form>
          </Box>
        </Center>
      </Wrapper>
    )
  }
}

const LoginForm = Form.create()(Login)

export default LoginForm
