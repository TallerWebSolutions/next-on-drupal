import AdminPage from '@source/components/AdminPage'
import Link from 'next/link'

const Finances = () => (
  <AdminPage>
    financeiro
    <Link href='/admin/contratacao'>
      <a>ir para contratacao</a>
    </Link>
  </AdminPage>
)

export default Finances
