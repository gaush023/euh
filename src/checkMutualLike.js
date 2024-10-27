// checkMutualLike.js
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export async function checkMutualLike(fromUserId, toUserId) {
  try {
    const likesQuery = query(
      collection(db, 'Likes'),
      where('fromUserId', '==', fromUserId),
      where('toUserId', '==', toUserId)
    );

    const querySnapshot = await getDocs(likesQuery);
    return !querySnapshot.empty; // ドキュメントが存在すれば true を返す
  } catch (error) {
    console.error('「いいね」の確認エラー:', error);
    return false;
  }
}