import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
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
  const history = useHistory()
  const { professions, isLoading: professionLoading } = useProfessions()
  const { qualities, isLoading: qualitiesLoading } = useQuality()
  const [data, setData] = useState()
  const { getUserById, updateUsers } = useUser()
  const [isLoading, setIsLoading] = useState(true)
  const { updateUserData, currentUser } = useAuth()
  const [errors, setErrors] = useState({})
  const professionsList = professions.map(p => ({
    label: p.name,
    value: p._id,
  }))
  const qualitiesList = qualities.map(p => ({
    label: p.name,
    value: p._id,
  }))
  const handleSubmit = async e => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    try {
      console.log(data)
      const res = await updateUserData({
        ...data,
        qualities: data.qualities.map(q => q.value),
      })
      console.log(res)
      history.push(`/users/${currentUser._id}`)
    } catch (error) {
      console.log(error)
      toast(error)
    }
  }
  const transformData = data => {
    return data.map(qual => ({
      value: qual._id,
      label: qual.name,
      color: qual.color,
    }))
  }
  useEffect(() => {
    if (!professionLoading && !qualitiesLoading && currentUser && !data) {
      setData({
        ...currentUser,
      })
    }
  }, [professionLoading, qualitiesLoading, currentUser, data])

  useEffect(() => {
    if (data && isLoading) {
      setIsLoading(false)
      console.log(getQualities())
    }
  }, [data])
  const getQualities = () => {
    const filteredQualities = qualities.filter(qual =>
      data.qualities.includes(qual._id)
    )
    return transformData(filteredQualities)
  }
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
                label='Выберите ваш пол'
              />

              <MultiSelectField
                defaultValue={getQualities()}
                options={qualitiesList}
                onChange={handleChange}
                name='qualities'
                label='Выберите ваши качества'
              />
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
