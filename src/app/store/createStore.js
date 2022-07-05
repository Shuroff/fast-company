import { configureStore, combineReducers } from '@reduxjs/toolkit'
import professionsReducer from './professions'
import qualitiesReducer from './qualities'
import userReducer from './users'

const rootReducer = combineReducers({
  qualities: qualitiesReducer,
  professions: professionsReducer,
  users: userReducer,
})

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  })
}
