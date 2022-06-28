import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import professionService from '../services/profession.service'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useAuth } from './useAuth'
import { nanoid } from 'nanoid'
import commentService from '../services/comment.service'

const CommentsContext = createContext()

export const useComments = () => {
  return useContext(CommentsContext)
}

export const CommentsProvider = ({ children }) => {
  const { userId } = useParams()
  const { currentUser } = useAuth()
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    getComments()
  }, [])
  async function createComment(data) {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      created_at: Date.now(),
      userId: currentUser._id,
    }
    try {
      const { content } = await commentService.createComment(comment)
      console.log(content)
    } catch (error) {
      errorCatcher(error)
    }
    console.log(comment)
  }
  async function getComments() {
    try {
      const { content } = await commentService.getComments(userId)
      setComments(content)
      console.log('content', content)
    } catch (error) {
      errorCatcher(error)
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  function errorCatcher(error) {
    const { message } = error
    setIsLoading(false)
    setError(message)
  }
  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])
  return (
    <CommentsContext.Provider value={{ isLoading, comments, createComment }}>
      {children}
    </CommentsContext.Provider>
  )
}

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default CommentsProvider
