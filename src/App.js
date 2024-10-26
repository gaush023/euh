import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import NewPost from './Newpost';
import AllPosts from './Allposts';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/newpost" element={<NewPost />}/>
        <Route path="/allposts" element={<AllPosts />}/>

      </Routes>
    </Router>
  );
}

export default App;

