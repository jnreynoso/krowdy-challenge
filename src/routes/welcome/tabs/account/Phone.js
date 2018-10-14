import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import { Row, Col, Button, Form, List, Skeleton, Input, Select } from 'antd'
import styled from 'styled-components'

import { setPhones, getPhones } from 'utils'

const { Item } = List
const { Meta } = Item

const Wrapper = styled.div`
  padding-left: 24px;
`
const Option = Select.Option

const Title = styled.span`
  height: 16px;
  width: 382px;
  color: #000000;
  font-size: 14px;
  font-weight: bold;
  line-height: 16px;
`
const Description = styled.span`
  height: 32px;
  width: 568px;
  color: rgba(0,0,0,0.85);
  font-size: 14px;
  line-height: 16px;
`

const WrapperPhone = styled.div`
 padding: 5px
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
const WithoutBorder = styled.div`
  border-bottom: 0px;
`
const Items = (item, props) => {
  const actions = []

  if (item.principal) {
    actions.push(
      <span>
        Movil principal
      </span>
    )
  } else {
    actions.push(
      <Action>Seleccionar como principal</Action>
    )

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
            title={
              <div>
                <Title>{item.phone_number}</Title>
                {' '}
                {
                  !item.phone_number_verified ? (
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

class Phone extends Component {
  state = {
    phones: getPhones(),
    showView: 'formNumber',
    phone_number: ''
  }

  backAddNumber = () => {
    this.setState({
      showView: 'addNumber'
    })
  }

  addPhoneNumber = () => {
    this.setState({
      showView: 'formNumber'
    })
  }

  sendCode = async () => {
    const {
      form: {
        getFieldValue
      }
    } = this.props

    const number = getFieldValue('phone')
    const prefix = getFieldValue('prefix')

    const phone_number = `+${prefix}${number}` // eslint-disable-line

    const phones = getPhones()
    const matched = phones.find(e => e.phone_number === phone_number) // eslint-disable-line

    if (!matched) {
      const user = await Auth.currentAuthenticatedUser()
      await Auth.updateUserAttributes(user, {
        phone_number
      })

      const session = await Auth.currentSession()
      await user.refreshSession(session.refreshToken)

      phones.push({
        phone_number,
        phone_number_verified: false,
        principal: false
      })

      setPhones(phones)

      this.setState({
        phone_number,
        phones,
        showView: 'codeNumber'
      })
    }
  }

  validateCode = async () => {
    const {
      form: {
        getFieldValue
      }
    } = this.props

    const { phones, phone_number } = this.state // eslint-disable-line

    const code = getFieldValue('code')

    try {
      const result = await Auth.verifyCurrentUserAttributeSubmit(
        'phone_number',
        code
      )

      if (result === 'SUCCESS') {
        const matched = phones.find(e => e.principal)
        const filtered = phones.filter(
          e => !e.principal && e.phone_number !== phone_number // eslint-disable-line
        )

        matched.principal = false

        filtered.push({
          phone_number,
          phone_number_verified: true,
          principal: true
        })

        filtered.push(
          matched
        )

        setPhones(filtered)
        this.setState({
          phones: filtered
        })
      }

      console.log(result)
    } catch (e) {
      console.log(e)
    }
  }

  cancelCode = () => {
    this.setState({
      showView: 'formNumber'
    })
  }

  render () {
    const { form: { getFieldDecorator } } = this.props
    const { showView, phones } = this.state

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '51'
    })(
      <Select style={{ width: 70 }}>
        <Option value='51'>+51</Option>
        <Option value='86'>+86</Option>
        <Option value='87'>+87</Option>
      </Select>
    )

    const colProps = {
      style: {
        marginRight: '5px',
        marginBottom: '5px'
      }
    }

    const content = () => {
      let component = {}

      switch (showView) {
        case 'addNumber':
          component = (
            <div>
              <Title>Aún no tienen ningun número de celular añadido a tu cuenta.</Title>
              <br />
              <br />
              <Description>Tu número de teléfono nos ayuda a mantener la seguridad de tu cuenta. También les ayuda a las personas que ya tienen tu número de teléfono a encontrarte y conectar contigo.</Description>
              <br />
              <br />
              <Button onClick={this.addPhoneNumber}type='primary'>Añadir número</Button>
            </div>
          )
          break
        case 'formNumber':
          component = (
            <div>
              <WrapperPhone>
                <Row>
                  <Row>
                    <Col span={12} {...colProps}>
                      {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!' }]
                      })(
                        <Input
                          style={{ width: '350px' }}
                          addonBefore={prefixSelector}
                        />
                      )}
                    </Col>
                    <Col span={4} {...colProps}>
                      <Button
                        onClick={this.sendCode}
                        style={{ backgroundColor: '#108EE9' }}
                        type='primary'
                      >
                        Enviar código
                      </Button>
                    </Col>
                    <Col span={6} {...colProps}>
                      <Button
                        onClick={this.backAddNumber}
                        style={{ backgroundColor: '#108EE9' }}
                        type='primary'
                      >
                        Cancelar
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    Enviaremos un código a este número; lo necesitarás en el último paso.
                  </Row>
                </Row>
              </WrapperPhone>
            </div>
          )
          break
        case 'codeNumber':
          component = (
            <div>
              <Row>
                <Row style={{ paddingBottom: '10px' }}>
                  <Col span={18}>
                    Tu número de teléfono nos ayuda a mantener la seguridad de tu cuenta.
                    Introduce el código de verificación que acabamos de enviar al número *** *** ***.
                  </Col>
                </Row>
                <Row>
                  <Col span={7}>
                    {getFieldDecorator('code', {
                      rules: [{ required: true, message: 'Inserte Codigo' }]
                    })(
                      <Input style={{ width: '200px' }} />
                    )}
                  </Col>
                  <Col span={3}>
                    <Button
                      onClick={this.validateCode}
                      style={{
                        backgroundColor: '#108EE9'
                      }}
                      type='primary'
                    >
                      Validar
                    </Button>
                  </Col>
                  <Col span={6}>
                    <Button onClick={this.cancelCode}>Cancelar</Button>
                  </Col>
                </Row>
              </Row>
            </div>
          )
          break
        default:
          break
      }

      return component
    }

    return (
      <Wrapper>
        <div>
          <div>
            <List
              itemLayout='horizontal'
              dataSource={phones}
              renderItem={item => Items(item)}
            />
          </div>
          <div>
            {
              content()
            }
          </div>
        </div>
      </Wrapper>
    )
  }
}

const PhoneForm = Form.create()(Phone)

export default PhoneForm
