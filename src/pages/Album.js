import React from 'react';
import '../styles/Album.css';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import LoadingPage from '../Items/LoadingPage';
import {
  addSong,
  getFavoriteSongs,
  removeSong,
} from '../services/favoriteSongsAPI';

export default class Album extends React.Component {
  state = {
    albumImg: '',
    artistName: '',
    albumName: '',
    favoritesSongsId: [],
    isLoading: true,
    tracks: [],
  };

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    this.fetchMusics(id);
  }

  fetchFavoriteMusics = async (id) => {
    this.setState(
      {
        isLoading: true,
      },
      async () => {
        const getMusic = await getMusics(id);
        const response = await addSong(getMusic[0]);
        if (response === 'OK') {
          this.setState({
            isLoading: false,
          });
        }
      },
    );
  };

  removeSongs = async (id) => {
    this.setState(
      {
        isLoading: true,
      },
      async () => {
        const getMusic = await getMusics(id);
        const remove = await removeSong(getMusic[0]);
        if (remove === 'OK') {
          this.setState({
            isLoading: false,
          });
        }
      },
    );
  };

  handleChange = ({ target }) => {
    if (target.checked) {
      return this.fetchFavoriteMusics(target.id);
    }
    return this.removeSongs(target.id);
  };

  fetchMusics = async (id) => {
    const request = await getMusics(id);
    const songList = await getFavoriteSongs();
    const albumName = request[0].collectionName;
    console.log(request);
    const albumImg = request[0].artworkUrl100;
    const { artistName } = request[0];
    const tracks = request.filter((_e, i) => i > 0);
    this.setState({
      favoritesSongsId: songList,
      isLoading: false,
      albumName,
      artistName,
      tracks,
      albumImg,
    });
  };

  render() {
    const {
      tracks,
      albumName,
      artistName,
      isLoading,
      favoritesSongsId,
      albumImg,
    } = this.state;
    console.log(tracks);
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <div className="albumTitleDiv">
            <h1>{albumName}</h1>
            <img src={ albumImg } alt={ albumName } />
            <h2>{artistName}</h2>
          </div>
          <div className="musicsDivBox">
            {tracks.map(
              ({
                trackName,
                previewUrl,
                trackId,
                trackNumber,
                artworkUrl100,
              }) => (
                <MusicCard
                  artworkUrl100={ artworkUrl100 }
                  trackName={ trackName }
                  previewUrl={ previewUrl }
                  key={ trackId }
                  trackId={ trackId }
                  trackNumber={ trackNumber }
                  onChange={ this.handleChange }
                  checked={ favoritesSongsId.some(
                    (e) => e.trackName === trackName || e.trackId === trackId,
                  ) }
                />
              ),
            )}
          </div>
        </div>
        {isLoading ? <LoadingPage /> : null}
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
