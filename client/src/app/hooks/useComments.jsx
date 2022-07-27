import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { nanoid } from 'nanoid'
import commentService from '../services/comment.service'
import { useSelector } from 'react-redux'
import { getCurrentUserId } from '../store/users'

const CommentsContext = createContext()

export const useComments = () => {
  return useContext(CommentsContext)
}

export const CommentsProvider = ({ children }) => {
  const { userId } = useParams()
  const currentUserId = useSelector(getCurrentUserId())
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    getComments()
  }, [userId])
  async function createComment(data) {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      created_at: Date.now(),
      userId: currentUserId,
    }
    try {
      const { content } = await commentService.createComment(comment)
      setComments(prevState => [...prevState, content])
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
    console.log(error)
  }
  async function removeComment(id) {
    try {
      const { content } = await commentService.removeComment(id)
      if (content === null) {
        setComments(prevState => prevState.filter(com => com._id !== id))
      }
    } catch (error) {
      errorCatcher(error)
    }
  }
  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])
  return (
    <CommentsContext.Provider
      value={{ isLoading, comments, createComment, removeComment }}
    >
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