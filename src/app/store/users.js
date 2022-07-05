import { createAction, createSlice } from '@reduxjs/toolkit'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import userService from '../services/user.service'
import randomInt from '../utils/randomInt'

const userSlice = createSlice({
  name: 'users',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    auth: null,
    isLoggedIn: false,
  },
  reducers: {
    usersRequested: state => {
      state.isLoading = true
    },
    usersRecieved: (state, action) => {
      state.entities = action.payload.content
      state.lastFetch = Date.now()
      state.isLoading = false
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    authRequestSuccess: (state, action) => {
      state.auth = { ...action.payload, isLoggedIn: true }
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
} = actions

const authRequested = createAction('users/authRequested')
const userCreateRequested = createAction('users/userCreateRequested')
const createUserFailed = createAction('users/createUserFailed')
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

function createUser(payload) {
  return async function (dispatch) {
    dispatch(userCreateRequested())
    try {
      const { content } = await userService.create(payload)
      dispatch(userCreated(content))
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

export const getUserById = userId => state => {
  console.log(state)
  if (state.users.entities) {
    return state.users.entities.find(u => u._id === userId)
  }
}

export default userReducer
