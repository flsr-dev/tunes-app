import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}

export default App;
