import { db } from './firebase';
import { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

async function postQuestion(userId, questionText) {
    if (!userId) {
        console.warn("userId is undefined or null. Aborting postQuestion.");
        return; // userIdが無効な場合、処理を中断
    }

    try {
        console.log("Attempting to post a question with userId:", userId);
        await addDoc(collection(db, 'Questions'), {
            question: questionText,
            userId: userId,
            createdAt: new Date(),
        });
        console.log('質問が投稿されました');
    } catch (error) {
        console.error('エラー発生 during posting question:', error);
    }
}

function Question({ userId }) {
    const [questionText, setQuestionText] = useState('');
    const [message, setMessage] = useState('');
    const [pastQuestions, setPastQuestions] = useState([]);

    const fetchPastQuestions = async () => {
        if (!userId) {
            console.warn("Invalid userId:", userId);
            return;
        }
        try {
            const q = query(collection(db, 'Questions'), where('userId', '==', userId));
            const querySnapshot = await getDocs(q);
            const questions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPastQuestions(questions);
        } catch (error) {
            console.error('エラー発生 during fetching past questions:', error);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchPastQuestions();
        } else {
            console.warn("userId is not defined yet.");
        }
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            console.warn("userId is undefined or null. Aborting postQuestion.");
            return;
        }
        await postQuestion(userId, questionText);
        setQuestionText('');
        setMessage('質問が投稿されました');
        await fetchPastQuestions();
        setTimeout(() => setMessage(''), 3000);
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
            {message && <p>{message}</p>}
            <h3>過去の質問</h3>
            <ul>
                {pastQuestions.map(question => (
                    <li key={question.id}>{question.question}</li>
                ))}
            </ul>
        </div>
    );
}

export default Question;
