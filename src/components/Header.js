import React from 'react'
import styled from 'styled-components'

import { Center } from 'components'

import Logo from 'images/logo.png'

const Wrapper = styled.div`
  height: 40px;
  width: 100%;
  background-color: #FFFFFF;
  box-shadow: 0 1px 8px 0 rgba(0,21,41,0.12)
`

const WImage = styled.div`
  height: 31px;
  width: 61px;
  margin-left: 140px;
`

const Header = () => {
  return (
    <Center>
      <Wrapper>
        <WImage>
          <img alt='Logo' src={Logo} />
        </WImage>
      </Wrapper>
    </Center>
  )
}

export default Header
