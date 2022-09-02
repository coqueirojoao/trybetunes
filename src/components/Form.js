import PropTypes from 'prop-types';
import React from 'react';
import '../styles/Form.css';
import { Button } from '@mui/material';
import Inputs from '../Items/Inputs';
import mp4 from '../images/mp4.svg';

export default class Form extends React.Component {
  render() {
    const { handleChange, saveUserInfo, nameValue } = this.props;
    const MIN_LENGHT = 3;
    const condition = nameValue.length < MIN_LENGHT;
    return (
      <div className="mainFormBox">
        <div className="titleDiv">
          <h2>
            Trybe
            <span>Tunes</span>
          </h2>
          <img src={ mp4 } alt="mp4 img" className="mp4Svg" />
        </div>
        <Inputs
          name="nameValue"
          value={ nameValue }
          type="text"
          datatestid="login-name-input"
          onChange={ handleChange }
          placeholder="Insira seu nome"
        />
        <div className="buttonDivForm">
          <Button
            variant="contained"
            disableElevation
            onClick={ saveUserInfo }
            disabled={ condition }
            color="primary"
          >
            Entrar
          </Button>
        </div>
      </div>
    );
  }
}

Form.propTypes = {
  handleChange: PropTypes.func.isRequired,
  nameValue: PropTypes.string.isRequired,
  saveUserInfo: PropTypes.func.isRequired,
};
