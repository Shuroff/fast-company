import PropTypes from 'prop-types'
// import User from '../user/user'
import TableHeader from '../tableHeader/tableHeader'
import TableBody from '../tableBody/tableBody'
import MyBookmark from '../bookmark/myBookmark'
const UsersTable = ({
  users,
  selectedSort,
  handleDelete,
  onSort,
  toggleFill,
}) => {
  const columns = {
    name: { path: 'name', name: 'Имя' },
    qualities: { name: 'Качества' },
    profession: { path: 'profession.name', name: 'Профессия' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: <MyBookmark fill={fill} toggleFill={toggleFill} />,
    },
    delete: { component: 'delete' },
  }
  return (
    <table className='table'>
      <TableHeader {...{ onSort, selectedSort, columns }} />
      <TableBody {...{ columns, data: users }} />
      {/* <tbody>
        {users.map((user) => {
          return <User key={user._id} user={user} onDelete={handleDelete} />
        })}
      </tbody> */}
    </table>
  )
}
UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  toggleFill: PropTypes.func.isRequired,
}
export default UsersTable
