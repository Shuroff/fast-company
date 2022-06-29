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

const EditUserPage = () => {
  const { userId } = useParams()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState({
    name: '',
    email: '',
    profession: '',
    sex: 'male',
    qualities: [],
  })
  const { professions } = useProfessions()
  const { qualities } = useQuality()
  const { getUserById } = useUser()
  console.log(professions)
  console.log(qualities)
  const [errors, setErrors] = useState({})

  const getProfessionById = id => professions.find(prof => prof._id === id)

  const getQualities = elements => {
    const qualitiesArray = []
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color,
          })
        }
      }
    }
    return qualitiesArray
  }
  const handleSubmit = e => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    const { profession, qualities } = data
      // api.users
      //   .update(userId, {
      //     ...data,
      //     profession: getProfessionById(profession),
      //     qualities: getQualities(qualities),
      //   })
      .then(data => history.push(`/users/${data._id}`))
    console.log({
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities),
    })
  }
  const transformData = data => {
    return data.map(qual => ({ label: qual.name, value: qual._id }))
  }
  const transformQualities = data => {
    return data.map(qual => ({
      value: qual._id,
      label: qual.name,
      color: qual.color,
    }))
  }
  console.log('transQual', transformQualities(qualities))
  useEffect(() => {
    const user = getUserById(userId)
    console.log('user', user)
    setData({
      name: user.name,
      email: user.email,
      profession: user.profession,
      sex: user.sex,
      qualities: user.qualities,
    })
    setIsLoading(false)
    // api.qualities.fetchAll().then(data => {
    //   const qualitiesList = Object.keys(data).map(optionName => ({
    //     value: data[optionName]._id,
    //     label: data[optionName].name,
    //     color: data[optionName].color,
    //   }))
    //   setQualities(qualitiesList)
    // })
  }, [])
  useEffect(() => {
    if (data._id) setIsLoading(false)
  }, [data])

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
              <MultiSelectField
                defaultValue={data.qualities}
                options={transformQualities(qualities)}
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
