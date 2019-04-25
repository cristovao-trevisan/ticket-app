import PropTypes from 'prop-types'

export default {
  seat: PropTypes.number.isRequired,
  pricings: PropTypes.arrayOf(PropTypes.shape({
    seat: PropTypes.number.isRequired,
    pricing: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
}
