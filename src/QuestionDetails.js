import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import Answer from './Answer';

function QuestionDetails() {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const fetchQuestionAndAnswers = async () => {
            try {
                console.log("Fetching question with ID:", id);
                
                // 特定のIDの質問を取得
                const questionDoc = await getDoc(doc(db, 'Questions', id));
                if (questionDoc.exists()) {
                    const questionData = questionDoc.data();
                    setQuestion(questionData);
                    console.log("Question found:", questionData);

                    // 質問に関連する回答を取得
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

        // 5秒後にデバッグメッセージを表示
        const timer = setTimeout(() => {
            if (!question) {
                console.warn("Debug: Question still loading after 5 seconds.");
            }
        }, 5000);

        return () => clearTimeout(timer); // Cleanup timer on component unmount
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

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