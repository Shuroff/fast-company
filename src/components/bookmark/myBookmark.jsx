import PropTypes from 'prop-types'
import { Bookmark, BookmarkFill } from 'react-bootstrap-icons'
import './myBookmark.css'
export const MyBookmark = ({ fill, toggleFill }) => {
  return fill ? (
    <BookmarkFill className='bookmark-fill' onClick={toggleFill} />
  ) : (
    <Bookmark className='bookmark' onClick={toggleFill} />
  )
}
MyBookmark.propTypes = {
  fill: PropTypes.bool.isRequired,
  toggleFill: PropTypes.func.isRequired,
}
export default MyBookmark
