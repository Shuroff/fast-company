import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import userService from '../services/user.service'
import { toast } from 'react-toastify'
import { useAuth } from './useAuth'
const UserContext = createContext()

export const useUser = () => {
  return useContext(UserContext)
}

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const { currentUser } = useAuth()
  const [isLoading, setIsLoading] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    getUsers()
  }, [])
  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])
  async function getUsers() {
    try {
      const { content } = await userService.get()
      setUsers(content)
      setIsLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }
  useEffect(() => {
    if (!isLoading) {
      setUsers(prevState =>
        prevState.map(u => {
          if (u._id === currentUser._id) {
            return currentUser
          }
          return u
        })
      )
    }
  }, [currentUser])
  function errorCatcher(error) {
    const { message } = error
    setError(message)
    setIsLoading(false)
  }
  function getUserById(id) {
    return users.find(u => u._id === id)
  }
  function updateUsers(newUser) {
    console.log(newUser)
    setUsers(prevState => {
      return prevState.map(user => {
        if (user._id === newUser._id) {
          return { ...user, ...newUser }
        }
        return user
      })
    })
  }
  return (
    <UserContext.Provider
      value={{ users, getUserById, isLoading, updateUsers }}
    >
      {!isLoading ? children : 'loading...'}
    </UserContext.Provider>
  )
}
UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}
export default UserProvider
