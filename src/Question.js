import { db } from './firebase';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';

async function postQuestion(userId, questionText) {
    try {
        await addDoc(collection(db, 'Questions'), {
            question: questionText,
            userId: userId,
            createdAt: new Date(),
        });
        console.log('質問が投稿されました');
    } catch (error) {
        console.error('エラー発生:', error);
    }
}

function Question({ userId }) {
  const [questionText, setQuestionText] = useState('');
  const [message, setMessage] = useState(''); // 成功メッセージの新しいステート

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postQuestion(userId, questionText);
    setQuestionText('');
    setMessage('質問が投稿されました'); // 成功メッセージを設定
    setTimeout(() => setMessage(''), 3000); // 3秒後にメッセージをクリア
  };

  return (
    <div>
      <h2>質問</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          placeholder="質問を入力"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          required
        />
        <button type="submit">投稿</button>
      </form>
      {message && <p>{message}</p>} {/* 成功メッセージを表示 */}
    </div>
  );
}

export default Question;