import { useState, useEffect } from 'react'
import api from '../../../api'

const AddComment = ({ onAddComment, pageId }) => {
  const [users, setUsers] = useState()
  const [data, setData] = useState({ userId: '0' })
  useEffect(() => {
    api.users.fetchAll().then(data => setUsers(data))
  }, [])
  const onChange = e => {
    setData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const handleAddComment = () => {
    onAddComment({ ...data, pageId: pageId })
    setData({ userId: '0' })
  }
  return (
    <>
      <select
        className='form-select'
        aria-label='Default select example'
        name='userId'
        onChange={onChange}
        value={data.userId}
      >
        <option value='0' disabled>
          Выберите пользователя
        </option>
        {users &&
          users.map(user => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
      </select>
      <label className='mb-2 mt-1' htmlFor='floatingTextarea2'>
        Сообщение
      </label>
      <textarea
        className='form-control'
        id='floatingTextarea2'
        value={data?.content || ''}
        name='content'
        onChange={onChange}
      ></textarea>
      <div className='d-flex flex-row-reverse mt-3'>
        <button
          className='btn btn-primary float-right'
          onClick={handleAddComment}
        >
          Опубликовать
        </button>
      </div>
    </>
  )
}

export default AddComment
