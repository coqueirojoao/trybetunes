import React from 'react';
import '../styles/Login.css';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import LoadingPage from '../Items/LoadingPage';

export default class Login extends React.Component {
  render() {
    const { handleChange, saveUserInfo, nameValue, isLoading } = this.props;
    return (
      <div className="mainLoginBox">
        <Form
          handleChange={ handleChange }
          saveUserInfo={ saveUserInfo }
          nameValue={ nameValue }
        />
        {isLoading === 'loading' && <LoadingPage />}
        {isLoading === 'loaded' && <Redirect to="/search" />}
      </div>
    );
  }
}

Login.propTypes = {
  handleChange: PropTypes.func.isRequired,
  nameValue: PropTypes.string.isRequired,
  saveUserInfo: PropTypes.func.isRequired,
  isLoading: PropTypes.string.isRequired,
};
