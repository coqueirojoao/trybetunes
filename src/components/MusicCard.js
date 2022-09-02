import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';

export default class MusicCard extends React.Component {
  render() {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const { trackName,
      previewUrl,
      trackId,
      onChange,
      checked,
      artworkUrl100 } = this.props;
    return (
      <div className="mainCardBox">
        <div className="musicCardBox">
          <h3>{trackName}</h3>
          <img src={ artworkUrl100 } alt={ trackName } />
          <audio className="audioLabel" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <Checkbox
            { ...label }
            defaultChecked={ checked }
            color="secondary"
            sx={ { color: 'white' } }
            onChange={ onChange }
            id={ trackId }
          />
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  artworkUrl100: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};
