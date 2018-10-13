import React from 'react'
import styled from 'styled-components'

import { Button, Checkbox, Form, Input } from 'antd'

const { Item } = Form

const Wrapper = styled.div`
  padding-left: 24px;
`

const ChangePassword = () => {
  const inputProps = {
    style: {
      width: 300
    }
  }

  return (
    <Wrapper>
      <Form layout={'vertical'}>
        <Item
          label='Contraseña actual.'
        >
          <Input {...inputProps} />
        </Item>
        <Item
          label='Contraseña nueva.'
        >
          <Input {...inputProps} />
        </Item>
        <Item
          label='Vuelve a escribir su contraseña nueva.'
        >
          <Input {...inputProps} />
        </Item>
        <Item>
          <Checkbox
            checked
          >
            Solicita que todos los dispositivos inicien sesión con la nueva contraseña
          </Checkbox>
        </Item>
        <Button type='primary'>Guardar</Button>
      </Form>
    </Wrapper>
  )
}

export default ChangePassword
