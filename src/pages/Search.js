import React from 'react';
import '../styles/Search.css';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Header from '../components/Header';
import Inputs from '../Items/Inputs';
import LoadingPage from '../Items/LoadingPage';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends React.Component {
  state = {
    errorTag: '',
    artistValue: '',
    isLoading: '',
    albuns: [],
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    this.setState(
      {
        isLoading: 'loading',
      },
      async () => {
        const { artistValue } = this.state;
        const response = await searchAlbumsAPI(artistValue);
        if (response.length < 1) {
          return this.setState({
            artistName: artistValue,
            isLoading: 'loaded',
            artistValue: '',
            errorTag: 'Insira um nome válido.',
            albuns: [],
          });
        }
        return this.setState({
          errorTag: '',
          artistName: artistValue,
          artistValue: '',
          isLoading: 'loaded',
          albuns: [...response],
        });
      },
    );
  };

  render() {
    const { artistValue, isLoading, albuns, errorTag, artistName } = this.state;
    const MIN_LENGHT = 2;
    const condition = artistValue.length < MIN_LENGHT;
    return (
      <div data-testid="page-search">
        <Header />
        <div className="mainSearchDiv">
          <p>
            Faça sua
            {' '}
            <span>busca!</span>
          </p>
          <Inputs
            name="artistValue"
            value={ artistValue }
            type="text"
            datatestid="search-artist-input"
            onChange={ this.handleChange }
          />
          <Button
            variant="contained"
            disableElevation
            color="success"
            disabled={ condition }
            onClick={ this.handleClick }
          >
            Pesquisar
          </Button>
        </div>
        {isLoading === 'loading' && <LoadingPage />}
        {isLoading === 'loaded' && (
          <div className="searchResultDiv">
            <div className="searchTitleDiv">
              {errorTag === 'Insira um nome válido.' ? (
                <h1>{errorTag}</h1>
              ) : (
                <h1>
                  Resultado de álbuns de:
                  {' '}
                  <span>{artistName}</span>
                </h1>
              )}
            </div>
            <div className="searchAlbumsBox">
              {albuns.length < 1 ? (
                <p>Nenhum álbum foi encontrado</p>
              ) : (
                albuns.map((e) => (
                  <div key={ e.collectionId }>
                    <div className="searchAlbumsImg">
                      <img src={ e.artworkUrl100 } alt={ e.collectionName } />
                      <div className="searchAlbumContent">
                        <p>{`Artista: ${e.artistName}`}</p>
                        <p>{`Álbum: ${e.collectionName}`}</p>
                        <Link
                          to={ `/album/${e.collectionId}` }
                          className="albumLink"
                        >
                          Ir para a página do álbum
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
