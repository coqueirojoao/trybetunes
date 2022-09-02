import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createUser } from './services/userAPI';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import LoadingPage from './Items/LoadingPage';

class App extends React.Component {
  state = {
    nameValue: '',
    isLoading: '',
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  saveUserInfo = async () => {
    this.setState(
      {
        isLoading: 'loading',
      },
      async () => {
        const { nameValue } = this.state;
        const response = await createUser({ name: nameValue });
        if (response === 'OK') {
          this.setState({
            isLoading: 'loaded',
          });
        }
      },
    );
  };

  render() {
    const { nameValue, isLoading } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/loading" component={ LoadingPage } />
          {isLoading === 'loading' ? (
            <LoadingPage />
          ) : (
            <Route
              exact
              path="/"
              render={ (props) => (
                <Login
                  { ...props }
                  handleChange={ this.handleChange }
                  saveUserInfo={ this.saveUserInfo }
                  nameValue={ nameValue }
                  isLoading={ isLoading }
                />
              ) }
            />
          )}
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route exact path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
