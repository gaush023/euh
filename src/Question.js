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
  const [message, setMessage] = useState(''); // New state for the success message

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postQuestion(userId, questionText);
    setQuestionText('');
    setMessage('質問が投稿されました'); // Set success message
    setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
  };

  return (
    <div>
      <h2>Question🤩</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          placeholder="input your question"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          required
        />
        <button type="submit">post</button>
      </form>
      {message && <p>{message}</p>} {/* Display success message */}
    </div>
  );
}

export default Question;