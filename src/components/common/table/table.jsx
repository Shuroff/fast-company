import PropTypes from 'prop-types'
import TableHeader from './tableHeader'
import TableBody from './tableBody'
const Table = ({ onSort, selectedSort, columns, data, sortedBy, children }) => {
  return (
    <table className='table'>
      {children || (
        <>
          <TableHeader {...{ onSort, selectedSort, columns, sortedBy }} />
          <TableBody {...{ columns, data }} />
        </>
      )}
    </table>
  )
}
Table.propTypes = {
  onSort: PropTypes.func,
  selectedSort: PropTypes.object,
  data: PropTypes.array,
  columns: PropTypes.object,
}
export default Table
