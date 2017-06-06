import React, { Component } from 'react';
import logo from './logo.svg';
import Schools from './Schools.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to your School Search</h2>
        </div>

        <Schools postalCode="48103" />
      </div>
    );
  }
}

export default App;
