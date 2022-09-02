import React from 'react';
import '../styles/ProfileEdit.css';
import { Redirect } from 'react-router-dom';
import { Button } from '@mui/material';
import Header from '../components/Header';
import LoadingPage from '../Items/LoadingPage';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends React.Component {
  state = {
    isDisabled: true,
    isLoading: true,
    name: '',
    email: '',
    description: '',
    image: '',
    redirectTo: false,
  };

  componentDidMount() {
    this.fetchUser();
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
    this.verifyConditions();
  };

  handleClick = async () => {
    this.setState({
      isLoading: true,
    });
    const { name, email, image, description } = this.state;
    const obj = { name, email, image, description };
    await updateUser(obj);
    this.setState({
      isLoading: false,
      redirectTo: true,
    });
  };

  verifyConditions = () => {
    const { name, email, image, description } = this.state;
    const regEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (
      name.length > 1
            && regEx.test(email)
            && image.length > 1
            && description.length > 1
    ) {
      return this.setState({ isDisabled: false });
    }
    return this.setState({ isDisabled: true });
  };

  fetchUser = async () => {
    const userProfile = await getUser();
    const { name, email, image, description } = userProfile;
    this.setState(
      {
        name,
        email,
        image,
        description,
        isLoading: false,
      },
      () => this.verifyConditions(),
    );
  };

  render() {
    const {
      isLoading,
      isDisabled,
      name,
      email,
      image,
      description,
      redirectTo,
    } = this.state;
    return (
      <div>
        <Header />
        <div className="editInputBox">
          <h3>Edite seu nome:</h3>
          <input
            data-testid="edit-input-name"
            value={ name }
            name="name"
            onChange={ this.handleChange }
          />
          <h3>Edite seu email:</h3>
          <input
            data-testid="edit-input-email"
            value={ email }
            name="email"
            onChange={ this.handleChange }
          />
          <h3>Edite sua descrição:</h3>
          <input
            data-testid="edit-input-description"
            value={ description }
            name="description"
            onChange={ this.handleChange }
          />
          <h3>Edite sua imagem de perfil:</h3>
          <input
            data-testid="edit-input-image"
            value={ image }
            name="image"
            onChange={ this.handleChange }
          />
        </div>
        <div className="editButtonBox">
          <Button
            variant="contained"
            disableElevation
            color="primary"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Salvar!
          </Button>
        </div>
        {isLoading ? <LoadingPage /> : null}
        {redirectTo ? <Redirect to="/profile" /> : null}
      </div>
    );
  }
}
