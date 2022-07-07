import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comment.service'
const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    commentsRequested: state => {
      state.isLoading = true
    },
    commentsRecieved: (state, action) => {
      state.entities = action.payload.content
      state.isLoading = false
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
  },
})
const { reducer: commentsReducer, actions } = commentSlice
const { commentsRequested, commentsRecieved, commentsRequestFailed } = actions

export const loadCommentsList = userId => async dispatch => {
  dispatch(commentsRequested())
  try {
    const content = await commentService.getComments(userId)
    dispatch(commentsRecieved(content))
  } catch (error) {
    dispatch(commentsRequestFailed(error.message))
    console.log(error)
  }
}

export const getComments = () => state => state.comments.entities

export const getCommentById = id => state => {
  return state.comments.entities.find(prof => prof._id === id)
}

export const getCommentsLoadingStatus = () => state => state.comments.isLoading

export default commentsReducer
