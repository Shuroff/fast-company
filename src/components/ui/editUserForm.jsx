import TextField from '../common/form/textField'
import MultiSelectField from '../common/form/multiSelectField'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api'
import * as yup from 'yup'
const EditUserForm = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    profession: '',
    sex: 'male',
    qualities: [],
  })
  const [professions, setProfessions] = useState()
  const [qualities, setQualities] = useState()
  const [errors, setErrors] = useState({})
  const [isLoading, setLoading] = useState(true)
  const params = useParams()
  const id = params.id
  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      setProfessions(data)
    })
    api.qualities.fetchAll().then((data) => {
      setQualities(data)
    })
    api.users.getById(id).then((user) => {
      setData({
        name: user.name,
        email: user.email,
        profession: user.profession._id,
        qualities: user.qualities.map((qual) => ({
          value: qual._id,
          label: qual.name,
        })),
        sex: user.sex,
      })
      setLoading(false)
    })
  }, [])
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(data)
  }

  const validateSchema = yup.object().shape({
    email: yup
      .string()
      .required('Электронная почта обязательна для заполнения')
      .email('Email введён некорректно'),
    name: yup.string().required('Имя не должно быть пустым'),
  })

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
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
    return Object.keys(errors).length === 0
  }
  const isValid = Object.keys(errors).length === 0
  return (
    <>
      {!isLoading && professions ? (
        <div className=' container m-4'>
          <div className='row align-items-center'>
            <form
              className='p-4 mx-auto shadow col-sm-6'
              onSubmit={handleSubmit}
            >
              <TextField
                value={data.name}
                label='Имя'
                name='name'
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                value={data.email}
                label='Электронная почта'
                name='email'
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                label='Выберите свою профессию'
                value={data.profession}
                onChange={handleChange}
                defaultOption={'Choose...'}
                options={professions}
                name='profession'
              />
              <RadioField
                options={[
                  { name: 'Male', value: 'male' },
                  { name: 'Female', value: 'female' },
                  { name: 'Other', value: 'other' },
                ]}
                name='sex'
                onChange={handleChange}
                value={data.sex}
                label='Выберите ваш пол'
              />
              <MultiSelectField
                options={qualities}
                onChange={handleChange}
                name='qualities'
                label='Выберите ваши качества'
                defaultValue={data.qualities}
              />
              <div className='d-grid gap-2'>
                <button
                  className='btn btn-primary'
                  type='submit'
                  disabled={!isValid}
                >
                  Обновить
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        'Loading...'
      )}
    </>
  )
}

export default EditUserForm
