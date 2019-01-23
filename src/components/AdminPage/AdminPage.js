import { node, string } from 'prop-types'
import { Toggle } from 'react-powerplug'
import styled from 'styled-components'

import Page from '@source/components/Page'
import Link from '@source/components/Link'
import { BrandMark, Layout, Icon } from '@styleguide'

const { Header, Sider, Content } = Layout

const StyledWrapper = styled.div`
  display: flex;
  height: 100vh;
`

const StyledBrandMark = styled(BrandMark)`
  display: block;
  height: 2.4rem;
  margin: 0.6rem auto;
`

const StyledHeader = styled(Header)`
  background: white;
`

const StyledContent = styled(Content)`
  margin: 24px 16px;
  padding: 24px;
  background: white;
`

const AdminPage = ({ children, title }) => (
  <Toggle initial={ false }>
    { ({ on: collapsed, toggle }) => (
      <Page>
        <StyledWrapper>
          <Layout className='ant-layout-has-sider'>
            <Sider
              collapsible
              breakpoint='lg'
              collapsed={ collapsed }
              onCollapse={ toggle }
            >
              <StyledBrandMark />

              <ul className='ant-menu ant-menu-dark ant-menu-root ant-menu-inline'>
                <Link href='/contratacao' activeClass='ant-menu-item-selected'>
                  <li className='ant-menu-item'>
                    <Icon type='user-add' />
                    <span>Contratação</span>
                  </li>
                </Link>

                <Link href='/desempenho' activeClass='ant-menu-item-selected'>
                  <li className='ant-menu-item'>
                    <Icon type='rise' />
                    <span>Desempenho</span>
                  </li>
                </Link>

                <Link href='/financeiro' activeClass='ant-menu-item-selected'>
                  <li className='ant-menu-item'>
                    <Icon type='wallet' />
                    <span>Financeiro</span>
                  </li>
                </Link>
              </ul>
            </Sider>
            <Layout>
              <StyledHeader>header</StyledHeader>
              <StyledContent
                style={ {
                  margin: '24px 16px',
                  padding: 24,
                  background: '#fff',
                  minHeight: 280
                } }
              >
                { children }
              </StyledContent>
            </Layout>
          </Layout>
        </StyledWrapper>
      </Page>
    ) }
  </Toggle>
)

AdminPage.propTypes = {
  children: node,
  title: string
}

AdminPage.defaultProps = {
  children: null,
  title: null
}

export default AdminPage
