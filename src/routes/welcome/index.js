import React from 'react'
import { LayoutDesktop } from 'layouts'

import Header from './Header'
import Style from './Style'

const Welcome = () => {
  return (
    <Style>
      <Header />
    </Style>
  )
}

export default LayoutDesktop(Welcome)
