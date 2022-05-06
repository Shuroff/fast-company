import { useState, useEffect } from 'react'
import SearchStatus from '../searchStatus/searchStatus'
import Pagination from '../pagination/pagination'
import api from '../../api'
import { paginate } from '../../utils/paginate'
import GroupList from '../groupList/groupList'
import UsersTable from '../usersTable/usersTable'
import _ from 'lodash'
const Users = () => {
  const [users, setUsers] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' })
  const pageSize = 8
  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      setProfessions(data)
    })
    api.users.fetchAll().then((data) => {
      setUsers(data)
    })
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

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
  const handleSort = (item) => {
    setSortBy(item)
  }

  const filteredUsers = selectedProf
    ? users.filter(
        (user) =>
          JSON.stringify(user.profession) === JSON.stringify(selectedProf),
      )
    : users
  if (!filteredUsers) {
    return 'loading...'
  }

  const count = filteredUsers.length
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order])
  const userCrop = paginate(sortedUsers, currentPage, pageSize)
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
          <UsersTable
            users={userCrop}
            handleDelete={handleDelete}
            selectedSort={sortBy}
            onSort={handleSort}
          />
        )}
        <div className='d-flex justify-content-center'>
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Users
