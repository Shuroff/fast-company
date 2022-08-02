import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  getIsLoggedIn,
  getUsersLoadingStatus,
  loadUsersList,
} from '../../../store/users'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { loadProfessionsList } from '../../../store/professions'
import { loadQualitiesList } from '../../../store/qualities'
const AppLoader = ({ children }) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(getIsLoggedIn())
  const userStatusLoading = useSelector(getUsersLoadingStatus())
  useEffect(() => {
    dispatch(loadProfessionsList())
    dispatch(loadQualitiesList())
    if (isLoggedIn) {
      dispatch(loadUsersList())
    }
  }, [isLoggedIn])
  if (userStatusLoading) return 'loading...'
  return children
}
AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}
export default AppLoader
