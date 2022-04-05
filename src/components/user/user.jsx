import { Qualitie } from '../qualitie/qualitie'
import { MyBookmark } from '../bookmark/bookmark'
import { useState } from 'react'
export const User = ({ user, onDelete }) => {
  const [fill, setFill] = useState(false)
  const toggleFill = () => {
    console.log('hello')
    setFill(prevState => !prevState)
  }
  return (
    <tr>
      <th>{user.name}</th>
      <th>
        {user.qualities.map(qual => {
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
