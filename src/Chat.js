import React, { useState } from 'react';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // 送信したメッセージを保持する状態

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') { 
      setMessages([...messages, message]); // メッセージを配列に追加
      console.log('メッセージを送信:', message);
      setMessage(''); // 送信後に入力をクリア
    }
  };

  return (
    <div>
      <div id="room">
        {/* 送信したメッセージを表示 */}
        {messages.map((msg, index) => (
          <div key={index} style={styles.messageBubble}>
            {msg}
          </div>
        ))}
      </div>

      <div className="input-group chat-input">
        <input
          id="inputMessage"
          type="text"
          className="form-control"
          placeholder="メッセージを入力してください"
          value={message}
          onChange={handleInputChange}
          style={{ width: '200px', height: '40px' }} // 入力欄のスタイルを調整
        />
        <div className="input-group-append">
          <button
            id="sendBtn"
            className="btn btn-primary"
            type="button"
            onClick={handleSendMessage}
          >
            送信
          </button>
        </div>
      </div>
    </div>
  );
};

// メッセージバブルのスタイル
const styles = {
  messageBubble: {
    borderRadius: '15px', // 端を丸くする
    backgroundColor: '#f0f0f0', // 背景色
    padding: '10px', // パディング
    margin: '5px 0', // メッセージ間のマージン
    maxWidth: '300px', // バブルの最大幅
    wordWrap: 'break-word', // 単語の折り返し
  },
};

export default Chat;
