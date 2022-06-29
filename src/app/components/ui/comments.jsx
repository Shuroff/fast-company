import { orderBy } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useComments } from '../../hooks/useComments'
import CommentsList, { AddCommentForm } from '../common/comments'

const Comments = () => {
  const { isLoading, comments, createComment, removeComment } = useComments()
  const handleSubmit = data => {
    createComment(data)
  }
  const handleRemoveComment = id => {
    removeComment(id)
  }
  const sortedComments = orderBy(comments, ['created_at'], ['desc'])
  return (
    <>
      <div className='card mb-2'>
        {' '}
        <div className='card-body '>
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className='card mb-3'>
          <div className='card-body '>
            <h2>Comments</h2>
            <hr />
            {!isLoading ? (
              <CommentsList
                comments={sortedComments}
                onRemove={handleRemoveComment}
              />
            ) : (
              'Loading comments'
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Comments
