import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import UsersList from '../../components/usersList/usersList'
import UserPage from '../../components/userPage/userPage'
const Users = () => {
  const params = useParams()
  const id = params.id
  return <>{id ? <UserPage id={id} /> : <UsersList />}</>
}

export default Users
