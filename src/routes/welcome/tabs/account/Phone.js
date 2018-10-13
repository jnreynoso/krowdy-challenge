import React from 'react'
import styled from 'styled-components'

import { Button } from 'antd'

const Wrapper = styled.div`
  padding-left: 24px;
`

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
const Phone = () => {
  return (
    <Wrapper>
      <Title>Aún no tienen ningun número de celular añadido a tu cuenta.</Title>
      <br />
      <br />
      <Description>Tu número de teléfono nos ayuda a mantener la seguridad de tu cuenta. También les ayuda a las personas que ya tienen tu número de teléfono a encontrarte y conectar contigo.</Description>
      <br />
      <br />
      <Button type='primary'>Añadir número</Button>
    </Wrapper>
  )
}

export default Phone
