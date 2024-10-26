import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

function QuestionDetailAndAnswer() {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [answerText, setAnswerText] = useState('');

    useEffect(() => {
        const fetchQuestionAndAnswers = async () => {
            const questionSnapshot = await getDocs(collection(db, 'Questions'));
            setQuestion(questionSnapshot.docs.find(doc => doc.id === id)?.data());

            const answersQuery = query(collection(db, 'Answers'), where('questionId', '==', id));
            const answersSnapshot = await getDocs(answersQuery);
            setAnswers(answersSnapshot.docs.map(doc => doc.data()));
        };
        fetchQuestionAndAnswers();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'Answers'), {
                questionId: id,
                answer: answerText,
                createdAt: new Date(),
            });
            setAnswerText('');
            setAnswers([...answers, { answer: answerText, createdAt: new Date() }]);
        } catch (error) {
            console.error("エラー発生:", error);
        }
    };

    return (
        <div>
            {question && (
                <>
                    <h2>{question.question}</h2>
                    <h3>回答一覧:</h3>
                    <ul>
                        {answers.map((answer, index) => (
                            <li key={index}>{answer.answer}</li>
                        ))}
                    </ul>
                    <div>
                        <h3>回答を投稿する</h3>
                        <form onSubmit={handleSubmit}>
                            <textarea
                                placeholder="回答を入力"
                                value={answerText}
                                onChange={(e) => setAnswerText(e.target.value)}
                                required
                            />
                            <button type="submit">回答を投稿</button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}

export default QuestionDetailAndAnswer;