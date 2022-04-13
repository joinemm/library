import logo from './logo.svg';
import React from 'react';
import './App.css';

function App() {
  console.log("Running react " + React.version);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

      </header>
    </div>
  );
}

export default App;
