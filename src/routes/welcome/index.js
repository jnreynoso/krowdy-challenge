import React from 'react'
import { LayoutDesktop } from 'layouts'

import Tabs from './tabs'
import Header from './Header'
import Style from './Style'

const Welcome = () => {
  return (
    <Style>
      <Header />
      <Tabs />
    </Style>
  )
}

export default LayoutDesktop(Welcome)
