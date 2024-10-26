import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import Profile from './Profile';
import NewPost from './Newpost';
import AllPosts from './Allposts';
import Chat from './Chat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/newpost" element={<NewPost />}/>
        <Route path="/allposts" element={<AllPosts />}/>
        <Route path="/Chat" element={<Chat />}/>
      </Routes>
    </Router>
  );
}

export default App;

