import React from 'react';
import ReactLoading from 'react-loading';
import '../styles/Loading.css';

export default class LoadingPage extends React.Component {
  render() {
    return (
      <div className="loadingBox">
        <ReactLoading type="spin" color="#6392da" width={ 50 } />
      </div>
    );
  }
}
