import React from 'react';

function Home() {
  return (
    <div>
    <h1>Welcome to EUH JpHack</h1>
    <h2>Let's get started</h2>
      <ul>
        <li><a href="/login">ログイン</a></li>
        <li><a href="/signup">サインアップ</a></li>
        <li><a href="/dashboard">dashborad</a></li>
        <li><a href="/recommendations">おすすめ</a></li>
        <li><a href="/chat">トーク</a></li>
        <li><a href="/profile">プロフィ-ル</a></li>
        <li><a href="/combinedposts">つぶやき</a></li>
      </ul>
    </div>
  );
}

export default Home;
