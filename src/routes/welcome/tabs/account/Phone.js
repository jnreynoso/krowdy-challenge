import React, { Component } from 'react'
import { Row, Col, Button, Form, Input, Select } from 'antd'
import styled from 'styled-components'

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

class Phone extends Component {
  state = {
    showView: 'addNumber'
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

  render () {
    const { form: { getFieldDecorator } } = this.props
    const { showView } = this.state

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
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: 'Please input your phone number!' }]
              })(
                <WrapperPhone>
                  <Row>
                    <Row>
                      <Col span={12} {...colProps}>
                        <Input
                          style={{ width: '350px' }}
                          addonBefore={prefixSelector}
                        />
                      </Col>
                      <Col span={4} {...colProps}>
                        <Button
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
              )}
            </div>
          )
          break
      }

      return component
    }

    return (
      <Wrapper>
        {
          content()
        }
      </Wrapper>
    )
  }
}

const PhoneForm = Form.create()(Phone)

export default PhoneForm
