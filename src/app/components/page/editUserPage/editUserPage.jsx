import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { validator } from '../../../utils/validator'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import BackHistoryButton from '../../common/backButton'
import { useProfessions } from '../../../hooks/useProfession'
import { useQuality } from '../../../hooks/useQuality'
import { useUser } from '../../../hooks/useUsers'
import { toast } from 'react-toastify'
import { useAuth } from '../../../hooks/useAuth'

const EditUserPage = () => {
  const { userId } = useParams()
  const history = useHistory()
  const { professions } = useProfessions()
  const { qualities } = useQuality()
  const { getUserById, isLoading, updateUsers } = useUser()
  const [loadQual, setLoadQual] = useState(true)
  const { editUser, currentUser } = useAuth()
  const [errors, setErrors] = useState({})
  if (userId !== currentUser._id) {
    history.goBack()
  }
  const initialState = {
    name: '',
    email: '',
    profession: '',
    sex: 'male',
    qualities: [],
  }
  const [data, setData] = useState(initialState)
  const handleSubmit = async e => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    data._id = userId
    data.qualities = data.qualities.map(qual => qual.value)
    console.log(data)
    try {
      const res = await editUser({ userId, payload: data })
      console.log(res)
      updateUsers(data)
      history.goBack()
    } catch (error) {
      toast(error)
      console.log(error)
    }
  }
  const transformData = data => {
    return data.map(qual => ({ label: qual.name, value: qual._id }))
  }
  const getQualities = () => {
    const filteredQualities = qualities.filter(qual =>
      data.qualities.includes(qual._id)
    )
    return transformData(filteredQualities)
  }

  const transformQualities = data => {
    return data.map(qual => ({
      value: qual._id,
      label: qual.name,
      color: qual.color,
    }))
  }
  let userQualities = getQualities()
  useEffect(() => {
    const user = getUserById(userId)
    if (user) {
      setData({
        name: user.name,
        email: user.email,
        profession: user.profession,
        sex: user.sex,
        qualities: user.qualities || [],
      })
    }
    userQualities = getQualities()
  }, [isLoading])
  useEffect(() => {
    if (userQualities.length !== 0) {
      setLoadQual(false)
    }
  }, [userQualities])
  console.log('userQualities', userQualities)
  useEffect(() => {}, [data.qualities])
  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения',
      },
      isEmail: {
        message: 'Email введен некорректно',
      },
    },
    name: {
      isRequired: {
        message: 'Введите ваше имя',
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
                label='Имя'
                name='name'
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label='Электронная почта'
                name='email'
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                label='Выбери свою профессию'
                defaultOption='Choose...'
                options={transformData(professions)}
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
                label='Выберите ваш пол'
              />
              {!loadQual ? (
                <MultiSelectField
                  defaultValue={userQualities}
                  options={transformQualities(qualities)}
                  onChange={handleChange}
                  name='qualities'
                  label='Выберите ваши качества'
                />
              ) : (
                ''
              )}
              <button
                type='submit'
                disabled={!isValid}
                className='btn btn-primary w-100 mx-auto'
              >
                Обновить
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
