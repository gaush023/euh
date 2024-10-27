// MatchedUsers.js
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { matchUsers } from './matchUsers'; // マッチングロジックをインポート

function MatchedUsers({ userId }) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      console.log(`Fetching matches for userId: ${userId}`);
      try {
        // 全ユーザーとマッチングを試みる
        const allUsersSnapshot = await getDocs(collection(db, 'users'));
        const allUsers = allUsersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // 他のユーザー全員とマッチングをチェック
        for (const otherUser of allUsers) {
          if (otherUser.id !== userId) { // 自分以外のユーザーとのマッチングを試行
            await matchUsers(userId, otherUser.id);
          }
        }

        // マッチが成立したユーザーを取得
        const q = query(collection(db, 'UserMatches'), where('userId', '==', userId));
        const matchSnapshot = await getDocs(q);
        
        if (matchSnapshot.empty) {
          console.log('No matches found for this user.');
        } else {
          console.log('Matches found:', matchSnapshot.size);
        }

        // マッチデータを配列に変換して状態に保存
        const matchData = matchSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Fetched match data:', matchData);

        setMatches(matchData);
      } catch (error) {
        console.error('マッチデータの取得エラー:', error);
      }
    };

    fetchMatches(); // ページにアクセスするたびにマッチングを実行
  }, [userId]);

  return (
    <div>
      <h2>マッチしたユーザー</h2>
      <ul>
        {matches.map(match => (
          <li key={match.id}>
            <p>マッチユーザーID: {match.matchedUserId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MatchedUsers;