import PropTypes from 'prop-types';
import React from 'react';

export default class Button extends React.Component {
  render() {
    const { datatestid, children, disabled, onClick } = this.props;
    return (
      <button
        type="button"
        data-testid={ datatestid }
        disabled={ disabled }
        onClick={ onClick }
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  datatestid: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
