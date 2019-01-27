import AdminPage from '@source/components/AdminPage'
import CandidatesList from '@@hiring/components/CandidatesList'
import { Card } from '@styleguide'

const Hiring = () => (
  <AdminPage>
    <Card
      title='Candidatos'
      bodyStyle={ { padding: 0, borderTop: '1px solid #e8e8e8' } }
    >
      <CandidatesList />
    </Card>
  </AdminPage>
)

export default Hiring
