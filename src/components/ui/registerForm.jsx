import { useEffect, useState } from 'react'
import TextField from '../common/form/textField'
import SelectField from '../common/form/selectField'
import { validator } from '../../utils/validator'
import RadioField from '../common/form/radioField'
import api from '../../api'
import MultiSelectField from '../common/form/multiSelectField'
import CheckBoxField from '../common/form/checkBoxField'
const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    profession: '',
    sex: 'male',
    qualities: [],
    licence: false,
  })
  const [qualities, setQualities] = useState({})
  const [professions, setProfessions] = useState()
  const [errors, setErrors] = useState({})

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      setProfessions(data)
    })
    api.qualities.fetchAll().then((data) => {
      setQualities(data)
    })
  }, [])

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    console.log(data)
  }
  const validatorConfig = {
    email: {
      isRequired: { message: 'Электронная почта обязательна для заполнения' },
      isEmail: {
        message: 'Email введён некорректно',
      },
    },
    password: {
      isRequired: { message: 'Пароль обязателен для заполнения' },
      isCapitalSymbol: {
        message: 'Пароль должен содержать хотя бы одну заглавную букву',
      },
      isContainDigit: {
        message: 'Пароль должен содержать хотя бы одно число',
      },
      min: {
        message: 'Пароль должен состоять минимум из 8 символов',
        value: 8,
      },
    },
    profession: {
      isRequired: {
        message: 'Обязательно выберите вашу профессию',
      },
    },
    licence: {
      isRequired: {
        message:
          'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения',
      },
    },
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  const isValid = Object.keys(errors).length === 0

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        value={data.email}
        name='email'
        onChange={handleChange}
        label='Электронная почта'
        error={errors.email}
      />
      <TextField
        value={data.password}
        type='password'
        name='password'
        onChange={handleChange}
        label='Пароль'
        error={errors.password}
      />
      <SelectField
        defaultOption='Choose...'
        options={professions}
        error={errors.profession}
        value={data.profession}
        onChange={handleChange}
        label='Выбери свою профессию'
        name='profession'
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
        options={qualities}
        onChange={handleChange}
        defaultValue={data.qualities}
        name='qualities'
        label='Выберите ваши качества'
      />
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name='licence'
        error={errors.licence}
      >
        Подтвердить <a>лицензионное соглашение</a>
      </CheckBoxField>
      <button
        className='btn btn-primary w-100 mx-auto'
        type='submit'
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  )
}

export default RegisterForm
