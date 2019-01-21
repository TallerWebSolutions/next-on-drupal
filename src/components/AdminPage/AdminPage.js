import { node, string } from 'prop-types'
import { Toggle } from 'react-powerplug'
import styled from 'styled-components'

import Page from '@source/components/Page'
import { BrandMark, Layout, Menu, Icon } from '@styleguide'

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

              <Menu theme='dark' mode='inline' defaultSelectedKeys={ ['1'] }>
                <Menu.Item key='1'>
                  <Icon type='user' />
                  <span>nav 1</span>
                </Menu.Item>

                <Menu.Item key='2'>
                  <Icon type='video-camera' />
                  <span>nav 2</span>
                </Menu.Item>

                <Menu.Item key='3'>
                  <Icon type='upload' />
                  <span>nav 3</span>
                </Menu.Item>
              </Menu>
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
