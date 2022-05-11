import { useState, useEffect } from 'react'
import TextField from '../../components/textField/textField'
const Login = () => {
  const [data, setData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState()
  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    console.log(data)
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = {}
    for (const fieldName in data) {
      if (data[fieldName].trim() === '') {
        errors[fieldName] = `${fieldName} обязательно дял заполнения`
      }
    }
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
      />
      <TextField
        value={data.password}
        type='password'
        name='password'
        onChange={handleChange}
        label='Пароль'
      />
      <button type='submit'>Submit</button>
    </form>
  )
}

export default Login
