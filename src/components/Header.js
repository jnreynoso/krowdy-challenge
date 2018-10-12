import React from 'react'
import styled from 'styled-components'

import { Center } from 'components'
import { Row, Col } from 'antd'

const Wrapper = styled.div`
  height: 40px;
  width: 1440px;
  background-color: #FFFFFF;
  box-shadow: 0 1px 8px 0 rgba(0,21,41,0.12)
`

const Header = () => {
  return (
    <Center>
      <Wrapper>
        <span>Krowdy | Mario Canepa</span>
      </Wrapper>
    </Center>
  )
}

export default Header
