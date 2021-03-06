import React, { useEffect, useState } from 'react'
import { validator } from '../../../utils/validator'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import BackHistoryButton from '../../common/backButton'
import { useSelector } from 'react-redux'
import {
  getQualitiesLoadingStatus,
  getQualities,
} from '../../../store/qualities'
import {
  getProfessions,
  getProfessionsLoadingStatus,
} from '../../../store/professions'
import { getCurrentUserData, updateUser } from '../../../store/users'
import { useDispatch } from 'react-redux'

const EditUserPage = () => {
  const dispatch = useDispatch()
  const professions = useSelector(getProfessions())
  const professionsLoading = useSelector(getProfessionsLoadingStatus())
  const qualities = useSelector(getQualities())
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus())

  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const currentUser = useSelector(getCurrentUserData())
  const [errors, setErrors] = useState({})

  const professionsList =
    !professionsLoading &&
    professions.map(p => ({
      label: p.name,
      value: p._id,
    }))
  const qualitiesList = qualities.map(p => ({
    label: p.name,
    value: p._id,
  }))
  const handleSubmit = e => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return

    dispatch(
      updateUser({
        ...data,
        qualities: data.qualities.map(q => q.value || q),
      })
    )
  }
  const transformData = data => {
    return data.map(qual => ({
      value: qual._id,
      label: qual.name,
      color: qual.color,
    }))
  }
  useEffect(() => {
    if (!professionsLoading && !qualitiesLoading && currentUser && !data) {
      setData({
        ...currentUser,
      })
    }
  }, [professionsLoading, qualitiesLoading, currentUser, data])

  useEffect(() => {
    if (data && isLoading) {
      setIsLoading(false)
    }
  }, [data])
  const filterQualities = () => {
    const filteredQualities = qualities.filter(qual =>
      data?.qualities?.includes(qual._id)
    )
    return transformData(filteredQualities)
  }
  const validatorConfig = {
    email: {
      isRequired: {
        message: '?????????????????????? ?????????? ?????????????????????? ?????? ????????????????????',
      },
      isEmail: {
        message: 'Email ???????????? ??????????????????????',
      },
    },
    name: {
      isRequired: {
        message: '?????????????? ???????? ??????',
      },
    },
  }
  useEffect(() => {
    validate()
  }, [data])

  const handleChange = target => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value,
    }))
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  const isValid = Object.keys(errors).length === 0
  return (
    <div className='container mt-5'>
      <BackHistoryButton />
      <div className='row'>
        <div className='col-md-6 offset-md-3 shadow p-4'>
          {!isLoading && Object.keys(professions).length > 0 ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label='??????'
                name='name'
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label='?????????????????????? ??????????'
                name='email'
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                label='???????????? ???????? ??????????????????'
                defaultOption='Choose...'
                options={professionsList}
                name='profession'
                onChange={handleChange}
                value={data.profession}
                error={errors.profession}
              />
              <RadioField
                options={[
                  { name: 'Male', value: 'male' },
                  { name: 'Female', value: 'female' },
                  { name: 'Other', value: 'other' },
                ]}
                value={data.sex}
                name='sex'
                onChange={handleChange}
                label='???????????????? ?????? ??????'
              />

              <MultiSelectField
                defaultValue={filterQualities()}
                options={qualitiesList}
                onChange={handleChange}
                name='qualities'
                label='???????????????? ???????? ????????????????'
              />
              <button
                type='submit'
                disabled={!isValid}
                className='btn btn-primary w-100 mx-auto'
              >
                ????????????????
              </button>
            </form>
          ) : (
            'Loading...'
          )}
        </div>
      </div>
    </div>
  )
}

export default EditUserPage
