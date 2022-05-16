import PropTypes from 'prop-types'

const Badge = ({ color, name }) => {
    const classes = `m-1 badge bg-${color}`
    return <span className={classes}>{name}</span>
}

Badge.propTypes = {
    color: PropTypes.string,
    name: PropTypes.string,
}
export default Badge
