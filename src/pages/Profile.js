import React from 'react';
import '../styles/Profile.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import LoadingPage from '../Items/LoadingPage';
import { getUser } from '../services/userAPI';

export default class Profile extends React.Component {
  state = {
    isLoading: true,
    userProfile: [],
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const userProfile = await getUser();
    this.setState({
      isLoading: false,
      userProfile,
    });
  };

  render() {
    const { isLoading, userProfile } = this.state;
    const { name, email, description, image } = userProfile;
    return (
      <div>
        <Header />
        <div className="mainProfileBox">
          <div className="backgroundProfileBox">
            <h3>Nome:</h3>
            <p>{name}</p>
            <h3>Email:</h3>
            <p>{email || 'exemplo@trybe.com'}</p>
            <h3>Descrição:</h3>
            <p>{description || 'Edite sua descrição'}</p>
            <h3>Imagem de perfil</h3>
            <img
              src={
                image
                || 'https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar-600x600.png'
              }
              alt={ name }
            />
            <Link to="/profile/edit" className="editProfileLink">
              Editar perfil
            </Link>
            {isLoading ? <LoadingPage /> : null}
          </div>
        </div>
      </div>
    );
  }
}
