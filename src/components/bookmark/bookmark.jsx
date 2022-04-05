import { Bookmark, BookmarkFill } from 'react-bootstrap-icons'
import './bookmark.css'
export const MyBookmark = ({ fill, toggleFill }) => {
  return fill ? (
    <BookmarkFill className='bookmark-fill' onClick={toggleFill} />
  ) : (
    <Bookmark className='bookmark' onClick={toggleFill} />
  )
}
