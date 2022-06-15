import userApi from '../../api/fake.api/user.api'
import stampToDate from '../../utils/stampToDate'
import { useState, useEffect } from 'react'
const Comment = ({ comment }) => {
  const [name, setName] = useState('')
  useEffect(() => {
    userApi.getById(comment.userId).then(user => setName(user.name))
  }, [])
  console.log('name', name)
  return (
    <div className='bg-light card-body  mb-3'>
      <div className='row'>
        <div className='col'>
          <div className='d-flex flex-start '>
            <img
              src={`https://avatars.dicebear.com/api/avataaars/${(
                Math.random() + 1
              )
                .toString(36)
                .substring(7)}.svg`}
              className='rounded-circle shadow-1-strong me-3'
              alt='avatar'
              width='65'
              height='65'
            />
            <div className='flex-grow-1 flex-shrink-1'>
              <div className='mb-4'>
                <div className='d-flex justify-content-between align-items-center'>
                  <p className='mb-1 '>
                    {name || '...loading'}
                    <span className='small'>
                      {' '}
                      {stampToDate(Number(comment.created_at))}
                    </span>
                  </p>
                  <button className='btn btn-sm text-primary d-flex align-items-center'>
                    <i className='bi bi-x-lg'></i>
                  </button>
                </div>
                <p className='small mb-0'>{comment.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment
