import { useState, useEffect } from 'react'
import TextField from '../../components/textField/textField'
import { validator } from '../../utils/validator'
const Login = () => {
  const [data, setData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
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
    },
    password: { isRequired: { message: 'Пароль обязателен для заполнения' } },
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

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
      <button type='submit'>Submit</button>
    </form>
  )
}

export default Login
