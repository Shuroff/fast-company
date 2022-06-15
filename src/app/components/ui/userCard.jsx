import { CaretDownFill, CaretUp } from 'react-bootstrap-icons'

const UserCard = ({ user }) => {
  return (
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
            <p className='text-secondary mb-1'>{user.profession.name}</p>
            <div className='text-muted'>
              <CaretDownFill color='#0d6efd' />
              <CaretUp />
              <span className='ms-2'>{user.rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard