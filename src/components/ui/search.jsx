const Search = ({ value, onChange, selectedProf, onSearch }) => {
  const changeHandler = ({ target }) => {
    if (selectedProf) {
      onSearch()
    }
    onChange(target.value)
  }
  return (
    <form className='d-flex'>
      <input
        className='form-control me-2'
        type='search'
        placeholder='Search'
        aria-label='Search'
        value={value}
        onChange={changeHandler}
      />
      <button className='btn btn-outline-success' type='submit'>
        Search
      </button>
    </form>
  )
}

export default Search
