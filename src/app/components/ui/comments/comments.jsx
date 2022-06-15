import Comment from '../comment'
const Comments = ({ comments }) => {
  return (
    <div className='card mb-3'>
      <div className='card-body '>
        <h2>Comments</h2>
        <hr />
        {comments.map((comment, i) => (
          <Comment key={Date.now() - i * 1000} comment={comment} />
        ))}
      </div>
    </div>
  )
}

export default Comments
