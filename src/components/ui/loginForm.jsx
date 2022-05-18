import { useEffect, useState } from 'react'
import TextField from '../common/form/textField'
// import { validator } from '../../utils/validator'
import CheckBoxField from '../common/form/checkBoxField'
import * as yup from 'yup'
const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '', stayOn: false })
  const [errors, setErrors] = useState({})

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    console.log(data)
  }
  const validateSchema = yup.object().shape({
    password: yup
      .string()
      .required('Пароль обязателен для заполнения')
      .matches(
        /(?=.*[A-Z])/,
        'Пароль должен содержать хотя бы одну заглавную букву',
      )
      .matches(/(?=.*[0-9])/, 'Пароль должен содержать хотя бы одно число')
      .matches(
        /(?=.*[!@#$%^&*])/,
        'Пароль должен содержать хотя бы один из специальных символов !@#$%^&*',
      )
      .matches(/(?=.{8,})/, 'Пароль должен состоять минимум из 8 символов'),
    email: yup
      .string()
      .required('Электронная почта обязательна для заполнения')
      .email('Email введён некорректно'),
  })
  // const validatorConfig = {
  //   email: {
  //     isRequired: { message: 'Электронная почта обязательна для заполнения' },
  //     isEmail: {
  //       message: 'Email введён некорректно',
  //     },
  //   },
  //   password: {
  //     isRequired: { message: 'Пароль обязателен для заполнения' },
  //     isCapitalSymbol: {
  //       message: 'Пароль должен содержать хотя бы одну заглавную букву',
  //     },
  //     isContainDigit: {
  //       message: 'Пароль должен содержать хотя бы одно число',
  //     },
  //     min: {
  //       message: 'Пароль должен состоять минимум из 8 символов',
  //       value: 8,
  //     },
  //   },
  // }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    // const errors = validator(data, validatorConfig)
    validateSchema
      .validate(data)
      .then(() => {
        setErrors({})
      })
      .catch((err) => {
        setErrors({
          [err.path]: err.message,
        })
      })
    // setErrors(errors)
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
      <CheckBoxField value={data.stayOn} onChange={handleChange} name='stayOn'>
        Оставаться в системе
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

export default LoginForm
