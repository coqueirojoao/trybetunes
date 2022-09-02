import React from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import symbol from '../images/symbol.svg';
import LoadingPage from '../Items/LoadingPage';
import { getUser } from '../services/userAPI';

export default class Header extends React.Component {
  state = {
    userName: '',
    isLoading: true,
  };

  componentDidMount() {
    this.fetchName();
  }

  fetchName = async () => {
    const request = await getUser();
    this.setState({
      userName: request.name,
      userImage: request.image,
      isLoading: false,
    });
  };

  render() {
    const { isLoading, userName, userImage } = this.state;
    return (
      <header>
        {isLoading ? (
          <LoadingPage />
        ) : (
          <div className="headerBoxDiv">
            <div className="titleHeaderBox">
              <img src={ symbol } alt="symbol" />
              <Link to="/" className="linkHeader">
                <h2>
                  Trybe
                  <span>Tunes</span>
                </h2>
              </Link>
            </div>
            <div className="navBoxDiv">
              <Link to="/search" className="navLinks">
                Buscar
              </Link>
              <Link to="/favorites" className="navLinks">
                Favoritos
              </Link>
              <Link
                to="/profile"
                className="
                navLinks"
              >
                Perfil
              </Link>
              <Link
                to="/profile"
                className="
                navLinks"
              >
                <h1>{userName}</h1>
              </Link>
              <Link
                to="/profile"
                className="
                navLinks"
              >
                <img
                  src={
                    userImage
                    || 'https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar-600x600.png'
                  }
                  alt="profileImg"
                  width={ 60 }
                />
              </Link>
            </div>
          </div>
        )}
      </header>
    );
  }
}
