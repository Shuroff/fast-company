import { nanoid } from '@reduxjs/toolkit'
import { orderBy } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  createComment,
  removeComment,
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList,
} from '../../store/comments'
import { getCurrentUserId } from '../../store/users'
import CommentsList, { AddCommentForm } from '../common/comments'

const Comments = () => {
  const { userId } = useParams()
  const currentUserId = useSelector(getCurrentUserId())
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadCommentsList(userId))
  }, [userId])

  const isLoading = useSelector(getCommentsLoadingStatus())
  const comments = useSelector(getComments())
  const handleSubmit = data => {
    dispatch(
      createComment({
        ...data,
        pageId: userId,
        userId: currentUserId,
        // createdAt: Date.now().toString(),
      })
    )
  }
  const handleRemoveComment = id => {
    dispatch(removeComment({ id }))
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
