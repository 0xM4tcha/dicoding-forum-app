import React from 'react';
import LoadingBar from 'react-redux-loading-bar';

function Header() {
  return (
    <header>
      <div className="top-bar">
        <h1>Dicoding Forum App</h1>
      </div>
      <div className="loading">
        <LoadingBar />
      </div>
    </header>
  );
}

export default Header;
