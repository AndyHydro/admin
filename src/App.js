import React, { Component } from 'react';
import Web3Provider from 'web3-react'
import Admin from './AdminComponent';
import './App.css';

class App extends Component {
  render() {
    return (
      <Web3Provider>
        <div className="App">
          <Admin>
          </Admin>
        </div>
      </Web3Provider>
    );
  }
}

export default App;
