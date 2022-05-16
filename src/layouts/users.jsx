import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import UsersListPage from '../components/page/usersListPage'
import UserPage from '../components/page/userPage'
const Users = () => {
  const params = useParams()
  const id = params.id
  return <>{id ? <UserPage id={id} /> : <UsersListPage />}</>
}

export default Users
