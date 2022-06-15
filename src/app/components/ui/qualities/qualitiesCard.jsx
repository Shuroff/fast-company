const QualitiesCard = ({ qualities }) => {
  return (
    <div className='card mb-3'>
      <div className='card-body d-flex flex-column justify-content-center text-center'>
        <h5 className='card-title'>
          <span>Qualities</span>
        </h5>
        <p className='card-text'>
          {qualities.map(qual => (
            <span key={qual._id} className={`badge bg-${qual.color}`}>
              {qual.name}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}

export default QualitiesCard
