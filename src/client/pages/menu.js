import React from 'react'
import styled from 'styled-components'

import MenuContainer from '~drupal/modules/menu/containers/MenuContainer'

const DefinitionList = styled.dl`
  margin: 5em;
`

const MenuPage = () => (
  <div>
    <MenuContainer name='main' depth={ 2 }>
      { ({ menu, loading, error }) => {
        if (loading) return <div>loading...</div>

        return (
          <DefinitionList>
            <dt>loading</dt>
            <dd>
              <pre>{ JSON.stringify(loading, null, 2) }</pre>
            </dd>

            <dt>menu</dt>
            <dd>
              <pre>{ JSON.stringify(menu, null, 2) }</pre>
            </dd>

            <dt>error</dt>
            <dd>
              <pre>{ JSON.stringify(error, null, 2) }</pre>
            </dd>
          </DefinitionList>
        )
      } }
    </MenuContainer>
  </div>
)

export default MenuPage
