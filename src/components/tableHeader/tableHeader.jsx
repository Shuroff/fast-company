import PropTypes from 'prop-types'
import { CaretDownFill, CaretUpFill } from 'react-bootstrap-icons'
const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc',
      })
    } else {
      onSort({ path: item, order: 'asc' })
    }
  }
  const renderCaret = (path, selectedSort) => {
    if (path === selectedSort.path) {
      return selectedSort.order === 'asc' ? <CaretUpFill /> : <CaretDownFill />
    }
    return null
  }
  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].path
                ? () => handleSort(columns[column].path)
                : undefined
            }
            {...{ role: columns[column].path && 'button' }}
            scope='col'
          >
            {columns[column].name}
            {renderCaret(columns[column].path, selectedSort)}
          </th>
        ))}
      </tr>
    </thead>
  )
}
TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
}
export default TableHeader
