// @flow
import React, { Component } from 'react';
import logo from './logo.svg';
import Schools from './Schools.js';
import './App.css';

class App extends Component {
  state = {
    postalCode: "48103",
  }

  render() {
    const {postalCode} = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to your School Search</h2>
        </div>

        <input
          value={postalCode}
          onChange={e => this.setState({postalCode: e.target.value})}
        />
        <Schools postalCode={postalCode} />
      </div>
    );
  }
}

export default App;
