import { createSlice } from '@reduxjs/toolkit'
import professionService from '../services/profession.service'
import isOutdated from '../utils/isOutdated'
const professionSlice = createSlice({
  name: 'professions',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    professionsRequested: state => {
      state.isLoading = true
    },
    professionsRecieved: (state, action) => {
      state.entities = action.payload.content
      state.lastFetch = Date.now()
      state.isLoading = false
    },
    professionsRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
  },
})
const { reducer: professionsReducer, actions } = professionSlice
const { professionsRequested, professionsRecieved, professionsRequestFailed } =
  actions

export const loadProfessionsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().professions
  if (isOutdated(lastFetch)) {
    dispatch(professionsRequested())
    try {
      const content = await professionService.get()
      dispatch(professionsRecieved(content))
    } catch (error) {
      dispatch(professionsRequestFailed(error.message))
      console.log(error)
    }
  }
}

export const getProfessions = () => state => state.professions.entities

export const getProfessionById = id => state => {
  return state.professions.entities.find(prof => prof._id === id)
}

export const getProfessionsLoadingStatus = () => state =>
  state.professions.isLoading

export default professionsReducer
