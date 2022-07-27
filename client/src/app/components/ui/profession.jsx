import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import {
  getProfessionById,
  getProfessions,
  getProfessionsLoadingStatus,
} from '../../store/professions'
const Profession = ({ id }) => {
  const isLoading = useSelector(getProfessionsLoadingStatus())

  const prof = getProfessionById(id)
  if (!isLoading) {
    return <p>{prof.name}</p>
  } else {
    return 'loading...'
  }
}
Profession.propTypes = {
  id: PropTypes.string,
}
export default Profession
