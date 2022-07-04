import React from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'
import { useSelector } from 'react-redux'
import {
  getQualities,
  getQualitiesLoadingStatus,
} from '../../../store/qualities'

const QualitiesList = ({ userQualities }) => {
  const qualities = useSelector(getQualities())
  const isLoading = useSelector(getQualitiesLoadingStatus())
  const filteredQualities = qualities.filter(q => userQualities.includes(q._id))
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
