import { createAction, createSlice } from '@reduxjs/toolkit'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import userService from '../services/user.service'
import history from '../utils/history'
import randomInt from '../utils/randomInt'

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false,
    }

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: state => {
      state.isLoading = true
    },
    usersRecieved: (state, action) => {
      state.entities = action.payload.content
      state.dataLoaded = true
      state.isLoading = false
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload
      state.isLoggedIn = true
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = []
      }
      state.entities.push(action.payload)
    },
    userLoggedOut: state => {
      state.entities = null
      state.isLoggedIn = false
      state.auth = null
      state.dataLoaded = false
    },
    updateUserData: (state, action) => {
      console.log(action.payload)
    },
  },
})

const { reducer: userReducer, actions } = userSlice
const {
  usersRequested,
  usersRecieved,
  usersRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  userCreated,
  userLoggedOut,
  updateUserData,
} = actions

const authRequested = createAction('users/authRequested')
const userCreateRequested = createAction('users/userCreateRequested')
const createUserFailed = createAction('users/createUserFailed')

export const login =
  ({ payload, redirect }) =>
  async dispatch => {
    const { email, password } = payload
    dispatch(authRequested())
    try {
      const data = await authService.login({ email, password })
      dispatch(authRequestSuccess({ userId: data.localId }))
      localStorageService.setTokens(data)
      history.push(redirect)
    } catch (error) {
      dispatch(authRequestFailed(error.message))
    }
  }

export const signUp =
  ({ email, password, ...rest }) =>
  async dispatch => {
    dispatch(authRequested())
    try {
      const data = await authService.register({ email, password })
      localStorageService.setTokens(data)
      dispatch(authRequestSuccess({ userId: data.localId }))
      dispatch(
        createUser({
          _id: data.localId,
          email,
          rate: randomInt(1, 5),
          completedMeetings: randomInt(0, 200),
          image: `https://avatars.dicebear.com/api/avataaars/${(
            Math.random() + 1
          )
            .toString(36)
            .substring(7)}.svg`,
          ...rest,
        })
      )
    } catch (error) {
      console.log(error)
      dispatch(authRequestFailed(error.message))
    }
  }
export const logOut = () => dispatch => {
  localStorageService.removeAuthData()
  dispatch(userLoggedOut())
  history.push('/')
}
function createUser(payload) {
  return async function (dispatch) {
    dispatch(userCreateRequested())
    try {
      const { content } = await userService.create(payload)
      dispatch(userCreated(content))
      history.push('/users')
    } catch (error) {
      console.log(error)
      dispatch(createUserFailed(error.message))
    }
  }
}

export const loadUsersList = () => async dispatch => {
  dispatch(usersRequested())
  try {
    const content = await userService.get()
    dispatch(usersRecieved(content))
  } catch (error) {
    dispatch(usersRequestFailed(error.message))
  }
}
export const getUsers = () => state => state.users.entities
export const getCurrentUserData = () => state =>
  state.users.entities
    ? state.users.entities.find(u => u._id === state.users.auth.userId)
    : null

export const getUserById = userId => state => {
  if (state.users.entities) {
    return state.users.entities.find(u => u._id === userId)
  }
}

export const getIsLoggedIn = () => state => state.users.isLoggedIn
export const getDataStatus = () => state => state.users.dataLoaded
export const getCurrentUserId = () => state => state.users.auth.userId
export const getUsersLoadingStatus = () => state => state.users.isLoading
export const updateUser = payload => dispatch => {
  console.log(payload)
  console.log(dispatch)
}
export default userReducer
