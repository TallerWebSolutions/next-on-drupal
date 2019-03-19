import React from 'react'
import styled from 'styled-components'

const Image = styled.img`
  height: 3em;
`

export default props => (
  <Image src='https://static.taller.work/logo.svg' { ...props } />
)
