import React from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'
import { useQuality } from '../../../hooks/useQuality'

const QualitiesList = ({ userQualities }) => {
  const { qualities, getQuality, isLoading } = useQuality()
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
