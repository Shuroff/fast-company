import PropTypes from 'prop-types'
import User from '../user/user'
const UsersTable = ({ users, handleDelete }) => {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th onClick={() => onSort()} scope='col'>
            Имя
          </th>
          <th onClick={() => onSort()} scope='col'>
            Качества
          </th>
          <th onClick={() => onSort()} scope='col'>
            Профессия
          </th>
          <th onClick={() => onSort()} scope='col'>
            Встретился, раз
          </th>
          <th onClick={() => onSort()} scope='col'>
            Оценка
          </th>
          <th onClick={() => onSort()} scope='col'>
            Избранное
          </th>
          <th onClick={() => onSort()} scope='col'></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return <User key={user._id} user={user} onDelete={handleDelete} />
        })}
      </tbody>
    </table>
  )
}
UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
}
export default UsersTable
