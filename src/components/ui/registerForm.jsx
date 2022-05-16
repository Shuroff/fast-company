import { useEffect, useState } from 'react'
import TextField from '../common/form/textField'
import SelectField from '../common/form/selectField'
import { validator } from '../../utils/validator'
import api from '../../api'
const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
  })
  const [professions, setProfessions] = useState()
  const [errors, setErrors] = useState({})

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      setProfessions(data)
    })
  }, [])

  const handleChange = ({ target }) => {
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
      />
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