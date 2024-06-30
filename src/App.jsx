import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Generals/Header';
import Navigation from './components/Generals/Navigation';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import DetailPage from './pages/DetailPage';
import NewThreadPage from './pages/NewThreadPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/leaderboards" element={<LeaderboardsPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/threads/:id" element={<DetailPage />} />
        <Route path="/new" element={<NewThreadPage />} />
      </Routes>
      <Navigation />
    </>
  );
}

export default App;
