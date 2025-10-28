import PropTypes from "prop-types";

export const overlayPropTypes = {
  overlayRenderer: PropTypes.elementType,
  renderOverlay: PropTypes.func, // deprecated; prefers overlayRenderer
  config: PropTypes.object.isRequired,
  loading: PropTypes.bool,
};
