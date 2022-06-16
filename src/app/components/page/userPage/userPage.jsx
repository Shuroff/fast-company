import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from '../../../api'
import { useHistory, useParams } from 'react-router-dom'
import UserCard from '../../ui/userCard'
import QualitiesCard from '../../ui/qualities/qualitiesCard'
import MeetingsCard from '../../ui/meetingsCard'
import Comments from '../../ui/comments/comments'
import AddComment from '../../ui/comments/addComment'
const UserPage = ({ userId }) => {
  const history = useHistory()
  const [user, setUser] = useState()
  const [comments, setComments] = useState()
  useEffect(() => {
    api.users.getById(userId).then(data => setUser(data))
    api.comments.fetchCommentsForUser(userId).then(data => {
      setComments(data)
    })
  }, [])
  const handleClick = () => {
    history.push(history.location.pathname + '/edit')
  }
  const handleDelete = id => {
    api.comments.remove(id)
    setComments(prevState => prevState.filter(comment => comment._id !== id))
  }
  const onAddComment = data => {
    api.comments
      .add(data)
      .then(comment => setComments(prevState => [...prevState, comment]))
  }
  if (user) {
    return (
      <div className='container'>
        <div className='row gutters-sm'>
          <div className='col-md-4 mb-3'>
            <UserCard user={user} onClick={handleClick} />
            <QualitiesCard qualities={user.qualities} />
            <MeetingsCard completedMeetings={user.completedMeetings} />
          </div>

          <div className='col-md-8'>
            <div className='card mb-2'>
              {' '}
              <div className='card-body '>
                <h2>New comment</h2>
                <AddComment pageId={userId} onAddComment={onAddComment} />
              </div>
            </div>
            {comments ? (
              <Comments handleDelete={handleDelete} comments={comments} />
            ) : (
              '...loading'
            )}
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
