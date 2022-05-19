import TextField from '../common/form/textField'
import MultiSelectField from '../common/form/multiSelectField'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api'
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
      console.log('user', user)
      setData({
        name: user.name,
        email: user.email,
        profession: user.profession,
        qualities: user.qualities,
        sex: user.sex,
      })
    })
  }, [])
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }
  return (
    <>
      {data.name ? (
        <div className=' container m-4'>
          <div className='row align-items-center'>
            <form className='p-4 mx-auto shadow col-sm-6'>
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
                <button className='btn btn-primary' type='button'>
                  Обновить
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        'loading...'
      )}
    </>
  )
}

export default EditUserForm
