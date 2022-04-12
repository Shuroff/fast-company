import { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
import SearchStatus from '../searchStatus/searchStatus'
import User from '../user/user'
import Pagination from '../pagination/pagination'
import api from '../../api'
import { paginate } from '../../utils/paginate'
import GroupList from '../groupList/groupList'
const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const pageSize = 4
  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      setProfessions(data)
    })
  }, [])

  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
  }

  const handlePageChange = (event, pageIndex) => {
    event.preventDefault()
    setCurrentPage(pageIndex)
  }

  const handleDelete = (userId) => {
    setUsers((prevState) => {
      return prevState.filter((user) => user._id !== userId)
    })
  }

  const filteredUsers = selectedProf
    ? users.filter((user) => user.profession === selectedProf)
    : users

  const count = filteredUsers.length
  const userCrop = paginate(filteredUsers, currentPage, pageSize)

  const clearFilter = () => {
    setSelectedProf(null)
  }
  return (
    <div className='d-flex'>
      {professions && (
        <div className='d-flex flex-column flex-shrink-0 p-3'>
          <GroupList
            items={professions}
            onItemSelect={handleProfessionSelect}
            selectedItem={selectedProf}
          />
          <button className='btn btn-secondary mt-2' onClick={clearFilter}>
            Очистить
          </button>
        </div>
      )}
      <div className='d-flex flex-column'>
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
              {userCrop.map((user) => {
                return (
                  <User key={user._id} user={user} onDelete={handleDelete} />
                )
              })}
            </tbody>
          </table>
        )}
      </div>
      <div className='d-flex justify-content-center'>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default Users
