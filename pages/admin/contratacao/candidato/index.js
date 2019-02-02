import { shape, string } from 'prop-types'

import AdminPage from '@source/components/AdminPage'
import Link from '@source/components/Link'
import { Alert } from '@styleguide'
// import CandidatesList from '@@hiring/components/CandidatesList'
// import { Card } from '@styleguide'

const Hiring = ({
  url: {
    query: { id }
  }
}) => (
  <AdminPage>
    { !id ? (
      <Alert
        message='Nenhum candidato selecionado'
        description={
          <span>
            Por favor, retorne ao{ ' ' }
            <Link href='/admin/contratacao'>
              <a>dashboard de contratação</a>
            </Link>
          </span>
        }
        type='error'
        showIcon
      />
    ) : (
      <div>Página do candidato</div>
    ) }
  </AdminPage>
)

Hiring.propTypes = {
  url: shape({
    query: shape({
      id: string.isRequired
    }).isRequired
  }).isRequired
}

export default Hiring
