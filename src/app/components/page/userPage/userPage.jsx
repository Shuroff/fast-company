import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from '../../../api'
import { useHistory, useParams } from 'react-router-dom'
import { CaretDownFill, CaretUp } from 'react-bootstrap-icons'
const UserPage = ({ userId }) => {
  const history = useHistory()
  // console.log(userId)
  const [user, setUser] = useState()
  const [comments, setComments] = useState()
  useEffect(() => {
    api.users.getById(userId).then(data => setUser(data))
    api.comments.fetchCommentsForUser(userId).then(data => setComments(data)) // загрузить комменты правильно
  }, [])
  const handleClick = () => {
    history.push(history.location.pathname + '/edit')
  }
  if (user) {
    console.log(comments)
    return (
      <div className='container'>
        <div className='row gutters-sm'>
          <div className='col-md-4 mb-3'>
            <div className='card mb-3'>
              <div className='card-body'>
                <button className='position-absolute top-0 end-0 btn btn-light btn-sm'>
                  <i className='bi bi-gear'></i>
                </button>
                <div className='d-flex flex-column align-items-center text-center position-relative'>
                  <img
                    src={`https://avatars.dicebear.com/api/avataaars/${(
                      Math.random() + 1
                    )
                      .toString(36)
                      .substring(7)}.svg`}
                    className='rounded-circle shadow-1-strong me-3'
                    alt='avatar'
                    width='150'
                    height='150'
                  />
                  <div className='mt-3'>
                    <h4>{user.name}</h4>
                    <p className='text-secondary mb-1'>
                      {user.profession.name}
                    </p>
                    <div className='text-muted'>
                      <CaretDownFill color='#0d6efd' />
                      <CaretUp />
                      <span className='ms-2'>{user.rate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card mb-3'>
              <div className='card-body d-flex flex-column justify-content-center text-center'>
                <h5 className='card-title'>
                  <span>Qualities</span>
                </h5>
                <p className='card-text'>
                  {user.qualities.map(qual => (
                    <span key={qual._id} className={`badge bg-${qual.color}`}>
                      {qual.name}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <div className='card mb-3'>
              <div className='card-body d-flex flex-column justify-content-center text-center'>
                <h5 className='card-title'>
                  <span>Completed meetings</span>
                </h5>

                <h1 className='display-1'>{user.completedMeetings}</h1>
              </div>
            </div>
          </div>

          <div className='col-md-8'>
            <div class='card mb-2'>
              {' '}
              <div class='card-body '>//add comment</div>
            </div>
            <div class='card mb-3'>
              <div class='card-body '>
                <h2>Comments</h2>
                <hr />
                //comments
              </div>
            </div>

            <div class='bg-light card-body  mb-3'>
              <div class='row'>
                <div class='col'>
                  <div class='d-flex flex-start '>
                    <img
                      src='https://avatars.dicebear.com/api/avataaars/qweqwdas'
                      class='rounded-circle shadow-1-strong me-3'
                      alt='avatar'
                      width='65'
                      height='65'
                    />
                    <div class='flex-grow-1 flex-shrink-1'>
                      <div class='mb-4'>
                        <div class='d-flex justify-content-between align-items-center'>
                          <p class='mb-1 '>
                            //User Name
                            <span class='small'>//Published Time</span>
                          </p>
                          <button class='btn btn-sm text-primary d-flex align-items-center'>
                            <i class='bi bi-x-lg'></i>
                          </button>
                        </div>
                        <p class='small mb-0'>//Comment content</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return <h1>Loading</h1>
  }
}

UserPage.propTypes = {
  userId: PropTypes.string.isRequired,
}

export default UserPage
