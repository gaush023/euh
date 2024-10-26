import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Answer from './Answer';

function QuestionDetails() {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const fetchQuestionAndAnswers = async () => {
            try {
                console.log("Fetching question with ID:", id); // Debug log for ID
                const questionSnapshot = await getDocs(collection(db, 'Questions'));
                const questionData = questionSnapshot.docs.find(doc => doc.id === id)?.data();
                setQuestion(questionData);

                if (questionData) {
                    console.log("Question found:", questionData);
                    const answersQuery = query(collection(db, 'Answers'), where('questionId', '==', id));
                    const answersSnapshot = await getDocs(answersQuery);
                    setAnswers(answersSnapshot.docs.map(doc => doc.data()));
                } else {
                    console.warn("Question not found");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchQuestionAndAnswers();
    }, [id]);

    return (
        <div>
            {question ? (
                <>
                    <h2>{question.question}</h2>
                    <h3>Questions List</h3>
                    <ul>
                        {answers.map((answer, index) => (
                            <li key={index}>{answer.answer}</li>
                        ))}
                    </ul>
                    <Answer questionId={id} />
                </>
            ) : (
                <p>Loading question...</p>
            )}
        </div>
    );
}

export default QuestionDetails;