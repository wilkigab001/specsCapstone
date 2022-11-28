
import React from 'react';
import Header from './components/Header/Header.js'
import {Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Profile from './components/Profile'
import Login from './components/Login'
import NewPost from './components/newPost/newPost';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/form" element={<NewPost />} />
      </Routes>
    </div>
  );
}

export default App;
