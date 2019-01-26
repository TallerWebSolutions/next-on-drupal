import { Icon } from '@styleguide'
import Link from '@source/components/Link'

// @TODO: handle sub-menu items.
const menu = [
  { title: 'Contratação', href: '/admin/contratacao', icon: 'user-add' },
  { title: 'Desempenho', href: '/admin/desempenho', icon: 'rise' },
  { title: 'Financeiro', href: '/admin/financeiro', icon: 'wallet' }
]

const AdminMenu = () => (
  <ul className='ant-menu ant-menu-dark ant-menu-root ant-menu-inline'>
    { menu.map(({ title, href, icon }) => (
      <Link href={ href } activeClass='ant-menu-item-selected'>
        <li className='ant-menu-item'>
          { icon && <Icon type={ icon } /> }
          <span>{ title }</span>
        </li>
      </Link>
    )) }
  </ul>
)

export default AdminMenu
