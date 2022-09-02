import PropTypes from 'prop-types';
import React from 'react';

export default class Inputs extends React.Component {
  render() {
    const { type, datatestid, onChange, name, value, placeholder } = this.props;
    return (
      <div>
        <input
          type={ type }
          data-testid={ datatestid }
          onChange={ onChange }
          name={ name }
          value={ value }
          placeholder={ placeholder }
        />
      </div>
    );
  }
}

Inputs.propTypes = {
  placeholder: PropTypes.string.isRequired,
  datatestid: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
