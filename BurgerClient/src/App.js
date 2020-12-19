import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Header from './components/header/Header';
import MainPages from './components/pages/Pages'
import {DataProvider} from './GS';

function App() {
  return (
    <div className="section-1">
      <div className="App">
      <DataProvider>
        <Router>
          <Header />
          <MainPages />
        </Router>
      </DataProvider>
      </div>
    </div>
  );
}

export default App;
