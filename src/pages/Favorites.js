import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import LoadingPage from '../Items/LoadingPage';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Favorites extends React.Component {
  state = {
    isLoading: true,
    favoriteSongs: [],
  };

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  fetchFavoriteSongs = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favoriteSongs,
    });
  };

  handleChange = async (element) => {
    this.setState({
      isLoading: true,
    });
    await removeSong(element);
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favoriteSongs,
    });
  };

  render() {
    const { favoriteSongs, isLoading } = this.state;
    return (
      <div>
        <Header />
        <div className="favoritesBox">
          {favoriteSongs.map((e) => (
            <MusicCard
              artworkUrl100={ e.artworkUrl100 }
              trackName={ e.trackName }
              previewUrl={ e.previewUrl }
              key={ e.trackId }
              trackId={ +e.trackId }
              trackNumber={ e.trackNumber }
              onChange={ () => this.handleChange(e) }
              checked
            />
          ))}
          {isLoading ? <LoadingPage /> : null}
        </div>
      </div>
    );
  }
}
