import Qualitie from '../qualitie/qualitie'
import { MyBookmark } from '../bookmark/myBookmark'
import { useState } from 'react'
import PropTypes from 'prop-types'

const User = ({ user, onDelete }) => {
  const [fill, setFill] = useState(false)
  const toggleFill = () => {
    setFill((prevState) => !prevState)
  }
  return (
    <tr>
      <th>{user.name}</th>
      <th>
        {user.qualities.map((qual) => {
          return <Qualitie {...qual} key={user._id + qual.name} />
        })}
      </th>
      <th>{user.profession.name}</th>
      <th>{user.completedMeetings}</th>
      <th>{user.rate}</th>
      <th>
        <MyBookmark fill={fill} toggleFill={toggleFill} />
      </th>
      <th>
        <button
          type='button'
          className='btn btn-danger'
          onClick={onDelete.bind(null, user._id)}
        >
          delete
        </button>
      </th>
    </tr>
  )
}
User.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profession: PropTypes.objectOf(PropTypes.string.isRequired),
    qualities: PropTypes.arrayOf(PropTypes.object),
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
  }),
}
export default User
