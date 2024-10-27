// matchUsers.js
import { checkMutualLike } from './checkMutualLike';
import { checkValuesMatch } from './checkValuesMatch';
import { saveMatch } from './saveMatch';

export async function matchUsers(userAId, userBId) {
  try {
    // Step 1: 双方が「いいね」をしているか確認
    const likesAtoB = await checkMutualLike(userAId, userBId);
    const likesBtoA = await checkMutualLike(userBId, userAId);

    if (!likesAtoB || !likesBtoA) {
      console.log('双方のいいねがありません');
      return; // 双方が「いいね」をしていない場合、終了
    }

    // Step 2: 価値観の一致を確認
    const valuesMatch = await checkValuesMatch(userAId, userBId);
    if (!valuesMatch) {
      console.log('価値観が一致しません');
      return; // 価値観が一致しない場合、終了
    }

    // Step 3: マッチが成立した場合、マッチ情報を保存
    await saveMatch(userAId, userBId);
    console.log('マッチが確定しました');
  } catch (error) {
    console.error('マッチング処理エラー:', error);
  }
}
