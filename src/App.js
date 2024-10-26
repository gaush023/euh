import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import Profile from './Profile';
import CombinedPosts from './CombinedPosts'; // これを保持
import Question from './Question'; // Questionコンポーネント
import QuestionDetails from './QuestionDetails'; // QuestionDetailsコンポーネント
import Answer from './Answer'; // Answerコンポーネント
import Osusume from './Osusume'; // Osusumeコンポーネント
import Chat from './Chat'; // Chatコンポーネント

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/combinedposts" element={<CombinedPosts />} /> {/* CombinedPosts も保持 */}
        <Route path="/questions" element={<Question />} />
        <Route path="/answer" element={<Answer />} />
        <Route path="/osusume" element={<Osusume />} />
        <Route path="/questiondetail" element={<QuestionDetails />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
