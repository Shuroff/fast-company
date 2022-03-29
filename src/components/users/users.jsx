import { useState } from 'react'
import { Badge } from '../badge/badge'
import api from '../../api'
const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = userId => {
    setUsers(prevState => {
      return prevState.filter(user => user._id !== userId)
    })
  }

  const renderPhrase = number => {
    return `${number} человек тусанет с тобой сегодня`
  }
  return users.length === 0 ? (
    <h3>
      <Badge color='danger' name='Никто с тобой не тусанет' />
    </h3>
  ) : (
    <>
      <h3>{<Badge color='primary' name={renderPhrase(users.length)} />}</h3>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>Имя</th>
            <th scope='col'>Качества</th>
            <th scope='col'>Профессия</th>
            <th scope='col'>Встретился, раз</th>
            <th scope='col'>Оценка</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user._id}>
                <th>{user.name}</th>
                <th>
                  {user.qualities.map(qual => {
                    return (
                      <Badge
                        key={user._id + qual.name}
                        name={qual.name}
                        color={qual.color}
                      />
                    )
                  })}
                </th>
                <th>{user.profession.name}</th>
                <th>{user.completedMeetings}</th>
                <th>{user.rate}</th>
                <th>
                  <button
                    type='button'
                    className='btn btn-danger'
                    onClick={handleDelete.bind(null, user._id)}
                  >
                    delete
                  </button>
                </th>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default Users
