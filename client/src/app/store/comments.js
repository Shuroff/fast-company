import { createAction, createSlice } from '@reduxjs/toolkit'
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
    commentCreateSuccessed: (state, action) => {
      state.entities.push(action.payload)
    },
    commentRemoveSuccessed: (state, action) => {
      state.entities = state.entities.filter(com => com._id !== action.payload)
    },
  },
})
const { reducer: commentsReducer, actions } = commentSlice
const {
  commentsRequested,
  commentsRecieved,
  commentsRequestFailed,
  commentCreateSuccessed,
  commentRemoveSuccessed,
} = actions

const commentCreateRequested = createAction('comments/commentCreateRequested')
const commentCreateFailed = createAction('comments/commentCreateFailed')
const commentRemoveRequested = createAction('comments/commentRemoveRequested')
const commentRemoveFailed = createAction('comments/commentRemoveFailed')

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

export const createComment = payload => async dispatch => {
  dispatch(commentCreateRequested())
  try {
    const { content } = await commentService.createComment(payload)
    dispatch(commentCreateSuccessed(content))
  } catch (error) {
    dispatch(commentCreateFailed(error.message))
  }
}
export const removeComment = payload => async dispatch => {
  dispatch(commentRemoveRequested())
  try {
    const { content } = await commentService.removeComment(payload)
    if (!content) {
      dispatch(commentRemoveSuccessed(payload))
    }
  } catch (error) {
    dispatch(commentRemoveFailed(error.message))
  }
}

export default commentsReducer
