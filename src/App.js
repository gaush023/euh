import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { auth } from './firebase'; // Firebase認証インスタンス
import { onAuthStateChanged } from 'firebase/auth';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import Profile from './Profile';
import CombinedPosts from './CombinedPosts';
import Question from './Question';
import QuestionDetails from './QuestionDetails';
import Answer from './Answer';
import Osusume from './Osusume';
import Chat from './Chat';
 
 
 
function App() {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    // Firebase認証の状態を監視
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // ログインしている場合、userIdを設定
      } else {
        setUserId(null); // ログアウトしている場合、userIdをnullに
      }
      setLoading(false); // 認証チェックが終わったらローディングを終了
    });
 
    return () => unsubscribe(); // コンポーネントのアンマウント時に監視を解除
  }, []);
 
  if (loading) {
    return <p>Loading...</p>; // 認証状態が確認できるまでローディング表示
  }
 
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/combinedposts" element={<CombinedPosts />} />
      <Route path="/questions" element={<Question userId={userId} />} /> {/* userIdを渡す */}
      <Route path="/answer" element={<Answer userId={userId} />} />
      <Route path="/osusume" element={<Osusume />} />
      <Route path="/questiondetail" element={<QuestionDetails userId={userId} />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}
 
 
export default App;