import api from '../../api'
import { useEffect, useState } from 'react'
import QualitiesList from '../qualitiesList/qualitiesList'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
const UserPage = ({ id }) => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    api.users.getById(id).then((user) => {
      setUser(user)
    })
  }, [])
  const history = useHistory()
  const handleClick = () => {
    history.push('/users')
  }

  return (
    <>
      {user ? (
        <div>
          <h1>{user.name}</h1>
          <h2>Профессия: {user.profession.name}</h2>
          <QualitiesList qualities={user.qualities} />
          <p>completedMeetings: {user.completedMeetings}</p>
          <h2>Rate: {user.rate}</h2>
          <button onClick={handleClick}>Все Пользователи</button>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  )
}
UserPage.propTypes = {
  id: PropTypes.string.isRequired,
}
export default UserPage
