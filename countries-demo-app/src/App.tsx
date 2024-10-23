import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid } from './grid-components/grid-container';

function App() {
  return (
    <div className="App">
      <div style={{height: '100vh'}}>
        <Grid />
      </div>
    </div>
  );
}

export default App;
