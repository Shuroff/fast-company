import { useState } from 'react'
// import PropTypes from 'prop-types'
import { SearchStatus } from '../searchStatus/searchStatus'
import { User } from '../user/user'
import Pagination from '../pagination/pagination'
import api from '../../api'
import { paginate } from '../../utils/paginate'
const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())
  const [currentPage, setCurrentPage] = useState(1)
  const count = users.length
  const pageSize = 4
  const handlePageChange = (event, pageIndex) => {
    event.preventDefault()
    setCurrentPage(pageIndex)
    // console.log(`page: ${pageIndex}`)
  }

  const handleDelete = userId => {
    setUsers(prevState => {
      return prevState.filter(user => user._id !== userId)
    })
  }

  const userCrop = paginate(users, currentPage, pageSize)
  console.log(userCrop)
  return (
    <>
      <SearchStatus numOfUsers={count} />
      {count > 0 && (
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
            {userCrop.map(user => {
              return <User key={user._id} user={user} onDelete={handleDelete} />
            })}
          </tbody>
        </table>
      )}
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  )
}

export default Users
