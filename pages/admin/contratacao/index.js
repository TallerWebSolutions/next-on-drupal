import { cloneElement } from 'react'
import { node } from 'prop-types'
import AdminPage from '@source/components/AdminPage'
import Link from '@source/components/Link'
import CandidatesList from '@@hiring/components/CandidatesList'
import { Card } from '@styleguide'

const CandidatesRow = ({ children, ...props }) => (
  <tr { ...props }>
    { children.map(child => {
      const {
        column,
        record: {
          candidate: { id }
        }
      } = child.props

      return !['avatar', 'name', 'email'].includes(column.key)
        ? child
        : cloneElement(child, {
          component: ({ children, ...props }) => (
            <td { ...props }>
              <Link href={ `/admin/contratacao/candidato?id=${id}` }>
                <a>{ children }</a>
              </Link>
            </td>
          )
        })
    }) }
  </tr>
)

CandidatesRow.propTypes = {
  children: node.isRequired
}

const Hiring = () => (
  <AdminPage>
    <Card
      title='Candidatos'
      bodyStyle={ { padding: 0, borderTop: '1px solid #e8e8e8' } }
    >
      <CandidatesList components={ { body: { row: CandidatesRow } } } />
    </Card>
  </AdminPage>
)

export default Hiring
