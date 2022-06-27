import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import userService from '../services/user.service'
import { toast } from 'react-toastify'
import { setTokens } from '../services/localStorage.service'
const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
  },
})
const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({})
  const [error, setError] = useState(null)

  async function signUp({ email, password, ...rest }) {
    const url = 'accounts:signUp'
    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true,
      })
      setTokens(data)
      await createUser({ _id: data.localId, email, ...rest })
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error
      console.log({ code, message })
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObject = {
            email: 'Пользователь с таким Email уже существует',
          }
          throw errorObject
        }
      }
      throw new Error()
    }
  }
  async function logIn({ email, password }) {
    const url = `accounts:signInWithPassword`
    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true,
      })
      setTokens(data)
      console.log(data)
    } catch (error) {
      const { code, message } = error.response.data.error
      if (code === 400) {
        switch (message) {
          case 'INVALID_PASSWORD':
            throw new Error('Email или пароль введены некорректно')
          default:
            throw new Error('Слишком много попыток входа.Попробуйте позднее')
        }
      }
    }
  }
  async function createUser(data) {
    try {
      const { content } = userService.create(data)
      setCurrentUser(content)
    } catch (error) {
      errorCatcher(error)
    }
  }
  function errorCatcher(error) {
    const { message } = error
    setError(message)
  }
  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])
  return (
    <AuthContext.Provider value={{ signUp, currentUser, logIn }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}
export default AuthProvider
