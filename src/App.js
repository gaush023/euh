import React from 'react';
import SignUp from './SignUp'; // ユーザー登録フォームをインポート

function App() {
  return (
    <div className="App">
      <h1>Welcome to the App</h1>
      <SignUp />
      <h2>To Do List</h2>
      <ul>
        <li><a href="login.html">Handlings with user info</a></li>
        <li><a href="daily.html">Daily report</a></li>
        <li><a href="chat.html">Chat</a></li>
        <li><a href="matching.html">Matching</a></li>
        <li><a href="setting.html">Setting</a></li>
        <li><a href="share.html">Share the emotion</a></li>
      </ul>
    </div>
  );
}

export default App;

