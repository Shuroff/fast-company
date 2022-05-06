import PropTypes from 'prop-types'
import MyBookmark from '../bookmark/myBookmark'
import QualitiesList from '../qualitiesList/qualitiesList'
import Table from '../table/table'
const UsersTable = ({ users, selectedSort, onDelete, onSort, toggleFill }) => {
  const columns = {
    name: { path: 'name', name: 'Имя' },
    qualities: {
      name: 'Качества',
      component: (user) => <QualitiesList qualities={user.qualities} />,
    },
    profession: { path: 'profession.name', name: 'Профессия' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => {
        return (
          <MyBookmark
            fill={user.bookmark}
            id={user._id}
            toggleFill={toggleFill}
          />
        )
      },
    },
    delete: {
      component: (user) => (
        <button
          type='button'
          className='btn btn-danger'
          onClick={onDelete.bind(null, user._id)}
        >
          delete
        </button>
      ),
    },
  }
  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    ></Table>
  )
}
UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  toggleFill: PropTypes.func.isRequired,
}
export default UsersTable
