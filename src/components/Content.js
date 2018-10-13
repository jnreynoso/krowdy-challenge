import React from 'react'
import styled from 'styled-components'

import { Center } from 'components'

const Wrapper = styled.div`
  background-color: #FFFFFF;
  box-shadow: 0 2px 6px 0 rgba(0,0,0,0.08);
  min-height: 754px;
  height: auto;
  width: 1080px;
  margin-top: 8px;
`

const Content = props => {
  return (
    <Center>
      <Wrapper>
        {props.children}
      </Wrapper>
    </Center>
  )
}

export default Content
