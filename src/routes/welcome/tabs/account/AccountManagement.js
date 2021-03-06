import React from 'react'
import {
  Alert,
  Button,
  Input,
  Radio
} from 'antd'
import styled from 'styled-components'

const { TextArea } = Input
const { Group } = Radio

const Wrapper = styled.div`
  padding-left: 24px;
`
const Title = styled.div`
  height: 29px;
  color: rgba(0,0,0,0.85);
  font-size: 20px;
  line-height: 29px;
`
const Description = styled.div`
  height: 42px;
  color: rgba(0,0,0,0.85);
  font-size: 14px;
  line-height: 21px;
  margin: 15px 0;
`
const WRadio = styled.div`
  margin: 15px 0;
`

const AccountManagement = () => {
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px'
  }

  return (
    <Wrapper>
      <div>
        <Title><b>Walter</b>, lamentamos que te vayas.</Title>
        <Description>Nos gustaria saber el motivo por el cual quieres cerrar tu cuenta, no olvides que perderás tus teams, jobs, candidatos y contactos.</Description>
        <Alert
          message='Dinos el motivo. Nos ayudaría a mejorar el servicio.'
          type='error'
          showIcon
        />
      </div>
      <WRadio>
        <Group>
          <Radio style={radioStyle} value={1}>Tengo dos cuentas.</Radio>
          <Radio style={radioStyle} value={2}>Recibo demasiados mensajes de correo electrónico.</Radio>
          <Radio style={radioStyle} value={3}>No estoy obteniendo ningún beneficio por ser miembro.</Radio>
          <Radio style={radioStyle} value={3}>No estoy obteniendo ningún beneficio por ser miembro.</Radio>
          <Radio style={radioStyle} value={3}>Me preocupa la privacidad.</Radio>
          <Radio style={radioStyle} value={3}>Me contactan de manera no deseada.</Radio>
          <Radio style={radioStyle} value={3}>Otro.</Radio>
        </Group>
        <TextArea rows={4} />
      </WRadio>
      <div>
        <Button type='primary'>Siguiente</Button>
        &nbsp;
        <Button>Cancelar</Button>
      </div>
    </Wrapper>
  )
}

export default AccountManagement
