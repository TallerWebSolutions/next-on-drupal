import { node, string } from 'prop-types'
import { Toggle } from 'react-powerplug'
import styled from 'styled-components'

import Page from '@source/components/Page'
import AdminMenu from '@source/components/AdminMenu'
import { BrandMark, Layout } from '@styleguide'

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
  overflow: auto;
`

const StyledContentBox = styled.div`
  margin: 24px 16px;
`

// @TODO: control access to administrative pages in a centralized point?
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
              <AdminMenu />
            </Sider>
            <Layout>
              <StyledHeader>header</StyledHeader>
              <StyledContent>
                <StyledContentBox>{ children }</StyledContentBox>
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
