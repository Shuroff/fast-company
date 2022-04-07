import Badge from '../badge/badge'
import PropTypes from 'prop-types'

const Qualitie = (props) => {
    return <Badge {...props} />
}
Qualitie.propTypes = {
    props: PropTypes.any.isRequired,
}
export default Qualitie
