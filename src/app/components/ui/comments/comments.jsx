import Comment from './comment'
const Comments = ({ comments, handleDelete }) => {
  return (
    <>
      {!!comments.length && (
        <div className='card mb-3'>
          <div className='card-body '>
            <h2>Comments</h2>
            <hr />
            {comments.map((comment, i) => (
              <Comment
                handleDelete={handleDelete}
                key={Date.now() - i * 1000}
                comment={comment}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Comments
