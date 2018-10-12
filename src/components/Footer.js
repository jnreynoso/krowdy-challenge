import React from 'react'
import styled from 'styled-components'

import { Center } from 'components'

const Wrapper = styled.div`
  height: 29px;
  width: 149px;
  color: rgba(0,0,0,0.45);
  font-size: 12px;
  line-height: 29px;
  margin-top: 65px;
`

const Footer = () => {
  return (
    <Center>
      <Wrapper>
        <span>Krowdy Corporation © 2018</span>
      </Wrapper>
    </Center>
  )
}

export default Footer
