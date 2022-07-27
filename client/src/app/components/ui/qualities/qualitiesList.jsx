import PropTypes from 'prop-types'
import Quality from './quality'
import {
  getQualities,
  getQualitiesLoadingStatus,
  loadQualitiesList,
} from '../../../store/qualities'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const QualitiesList = ({ userQualities }) => {
  const dispatch = useDispatch()
  const qualities = useSelector(getQualities())
  const isLoading = useSelector(getQualitiesLoadingStatus())

  useEffect(() => {
    dispatch(loadQualitiesList())
  }, [])

  const filteredQualities =
    !isLoading &&
    userQualities &&
    qualities.filter(q => userQualities.includes(q._id))
  return (
    <>
      {!isLoading
        ? filteredQualities.map(qual => <Quality key={qual._id} {...qual} />)
        : 'loading...'}
    </>
  )
}

QualitiesList.propTypes = {
  qualities: PropTypes.array,
}

export default QualitiesList
