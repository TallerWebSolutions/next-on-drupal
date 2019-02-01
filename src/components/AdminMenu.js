import { arrayOf, string, shape } from 'prop-types'
import { Icon } from '@styleguide'
import Link from '@source/components/Link'

// @TODO: handle sub-menu items.
const mainMenu = [
  { title: 'Contratação', href: '/admin/contratacao', icon: 'user-add' },
  { title: 'Desempenho', href: '/admin/desempenho', icon: 'rise' },
  { title: 'Financeiro', href: '/admin/financeiro', icon: 'wallet' }
]

const AdminMenu = ({ items }) => (
  <ul className='ant-menu ant-menu-dark ant-menu-root ant-menu-inline'>
    { items.map(({ title, href, icon }) => (
      <Link key={ href } href={ href } activeClass='ant-menu-item-selected'>
        <li className='ant-menu-item'>
          { icon && <Icon type={ icon } /> }
          <span>{ title }</span>
        </li>
      </Link>
    )) }
  </ul>
)

AdminMenu.propTypes = {
  items: arrayOf(
    shape({
      title: string.isRequired,
      href: string.isRequired,
      icon: string
      // items (sub-items)
    })
  )
}

AdminMenu.defaultProps = {
  items: mainMenu
}

export default AdminMenu