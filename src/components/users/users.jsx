import { useState } from 'react'
import { SearchStatus } from '../searchStatus/searchStatus'
import { User } from '../user/user'
import api from '../../api'
const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = userId => {
    setUsers(prevState => {
      return prevState.filter(user => user._id !== userId)
    })
  }
  return (
    <>
      <SearchStatus numOfUsers={users.length} />
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>Имя</th>
            <th scope='col'>Качества</th>
            <th scope='col'>Профессия</th>
            <th scope='col'>Встретился, раз</th>
            <th scope='col'>Оценка</th>
            <th scope='col'>Избранное</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return <User key={user._id} user={user} onDelete={handleDelete} />
          })}
        </tbody>
      </table>
    </>
  )
}

export default Users
