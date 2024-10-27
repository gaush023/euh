// checkValuesMatch.js
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';

async function getAnswerForQuestion(userId, questionId) {
  const q = query(
    collection(db, 'ThreeChoiceAnswers'),
    where('userId', '==', userId),
    where('questionId', '==', questionId)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.empty ? null : querySnapshot.docs[0].data().answer;
}

export async function checkValuesMatch(userAId, userBId) {
  try {
    const questions = await getDocs(collection(db, 'ThreeChoiceQuestions'));
    for (const question of questions.docs) {
      const questionId = question.id;

      const answerA = await getAnswerForQuestion(userAId, questionId);
      const answerB = await getAnswerForQuestion(userBId, questionId);

      if (answerA !== answerB) return false; // 回答が一致しない場合は false を返す
    }
    return true; // 全ての質問で一致
  } catch (error) {
    console.error('価値観の一致確認エラー:', error);
    return false;
  }
}