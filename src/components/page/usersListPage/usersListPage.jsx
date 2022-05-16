import { useState, useEffect } from 'react'
import SearchStatus from '../../ui/searchStatus'
import Pagination from '../../common/pagination'
import api from '../../../api'
import { paginate } from '../../../utils/paginate'
import GroupList from '../../common/groupList'
import UsersTable from '../../ui/usersTable'
import Search from '../../ui/search'
import _ from 'lodash'
const UsersListPage = () => {
  const [users, setUsers] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [searchString, setSearchString] = useState('')
  const [flag, setFlag] = useState(false)
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
    if (flag) {
      setSearchString('')
    }
  }, [selectedProf])

  useEffect(() => {
    setFlag(false)
  }, [searchString])

  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
    setFlag(true)
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
  const foundedUsers = searchString
    ? filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(searchString.toLowerCase()),
      )
    : filteredUsers

  const handleToggleFill = (id) => {
    setUsers((prevState) => {
      return prevState.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark }
        }
        return user
      })
    })
  }
  const count = foundedUsers.length
  const sortedUsers = _.orderBy(foundedUsers, [sortBy.path], [sortBy.order])
  const userCrop = paginate(sortedUsers, currentPage, pageSize)
  const clearFilter = () => {
    setSelectedProf(null)
    setSearchString('')
  }
  const onSearch = () => setSelectedProf(null)
  return (
    <>
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
          <Search
            value={searchString}
            onChange={setSearchString}
            onSearch={onSearch}
            selectedProf={selectedProf}
          />
          {count > 0 && (
            <UsersTable
              toggleFill={handleToggleFill}
              users={userCrop}
              onDelete={handleDelete}
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
    </>
  )
}

export default UsersListPage
